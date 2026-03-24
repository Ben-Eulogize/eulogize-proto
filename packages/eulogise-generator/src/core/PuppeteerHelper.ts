// import * as puppeteer from "puppeteer-core"
// import launchChrome from "@serverless-chrome/lambda"

import { GENERATOR_CONFIG } from '../config'
import { ensureDirSync } from 'fs-extra'

const puppeteer = require('puppeteer-core')
import ffmpeg from 'fluent-ffmpeg'
import { FrameHelper } from './FrameHelper'
import fs from 'fs'
import { MM_TO_PAGE_SIZE_SCALE } from '@eulogise/core'
import { AWSSESHelper } from '../helpers/AWSSESHelper'
import { InternalFontHelper, FontHelper } from '@eulogise/helpers'
import { Browser, ScreenshotOptions } from 'puppeteer-core'
import type { Page } from 'puppeteer-core'
import { GeneratorImageHelper } from '../helpers/GeneratorImageHelper'

export class PuppeteerHelper {
  protected static getFontStyle(fontPath?: string) {
    if (fontPath) {
      return `<style>${InternalFontHelper.getSupportedFontsCss(
        fontPath,
      )}</style>`
    }
    // use google font if filepath is not provided
    return `<link
  href="${FontHelper.getCardProductFontHref()}"
  rel="stylesheet"
>`
  }

  /*
  private static async createChrome(timeout: number): Promise<Browser> {
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {
        console.log('Timeout waiting for create chrome')
        reject(new Error('Timeout waiting for create chrome'))
      }, timeout)

      try {
        console.log('Creating chrome')
        const chrome = await this.getChrome()
        console.log('Created chrome. Clear timeout')
        clearTimeout(timer)
        console.log('Chrome created successfully. Timeout cleared')
        resolve(chrome)
      } catch (error) {
        console.log('Error creating new chrome', error)
        clearTimeout(timer)
        reject(error)
      }
    })
  }
*/

  private static async createNewPageWithTimeout(
    browser: Browser,
    timeout: number,
  ): Promise<Page> {
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {
        console.log('Timeout waiting for new page')
        reject(new Error('Timeout waiting for new page'))
      }, timeout)

      try {
        console.log('Creating new page')
        const page = await browser.newPage()
        console.log('Created new page. Clear timeout')
        clearTimeout(timer)
        console.log('Page created successfully. Timeout cleared')
        resolve(page)
      } catch (error) {
        console.log('Error creating new page', error)
        clearTimeout(timer)
        reject(error)
      }
    })
  }

  protected static async generateScreenshot({
    caseId,
    viewport,
    fileName,
    html,
    style,
    type = 'jpg',
    deviceScaleFactor = 1, // for jpg/png only
    cacheId,
    noOfPages,
  }: {
    caseId: string
    viewport: { width: number; height: number }
    fileName: string
    style: string
    html: string
    type?: 'jpg' | 'pdf' | 'png'
    deviceScaleFactor?: number
    cacheId?: string
    noOfPages?: number
  }): Promise<{ filePath: string; htmlFilePath: string }> {
    let indexPath: string = ''
    try {
      console.log('start getting chrome')
      const chrome = await this.getChrome()
      console.log('finish getting chrome')
      const page = await this.createNewPageWithTimeout(chrome, 500)
      console.log('getPage completed')

      // Listen to browser console logs
      page.on('console', (msg) => {
        const type = msg.type()
        const text = msg.text()
        console.log(`[Browser ${type}]:`, text)
      })

      /*
      page.setDefaultTimeout(120000)
      console.log('complete: set page timeout')
*/
      const path = FrameHelper.getFramesPath(caseId)
      console.log('get frame path', path)

      ensureDirSync(path)

      // const fontPreloadLinks = this.getFontPreloadLinks()
      // console.log('fontPreloadLinks', fontPreloadLinks)
      /*
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  ${fontPreloadLinks}
      */
      const fontStyle = this.getFontStyle(GENERATOR_CONFIG.FONTS_PATH)
      const newHtmlString = await GeneratorImageHelper.prepareImages(
        html,
        cacheId,
      )
      console.log('GENERATOR_CONFIG.FONTS_PATH', GENERATOR_CONFIG.FONTS_PATH)
      // console.log('newHtmlString', newHtmlString)
      const entireHtml = `
        <html>
          <head>
            ${fontStyle}
            <meta charSet="utf-8"/>
            <meta http-equiv="x-ua-compatible" content="ie=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            ${style}
          </head>
          <body>${newHtmlString}</body>
        </html>
      `
      // const entireHtml = fs.readFileSync(`${__dirname}/entireHtml.html`)
      indexPath = `${FrameHelper.getTmpDir()}/index-${
        fileName.split('.')[0]
      }.html`

      /*
      console.log('sending html file to Eric')
      await AWSSESHelper.sendWithAttachments({
        subject: `PDF Generator (Case Id: ${caseId})`,
        to: 'kakchan@gmail.com',
        body: `File Name: ${fileName}\nViewport: ${JSON.stringify(
          viewport,
        )}\nDevice Scale Factor: ${deviceScaleFactor}`,
        attachmentPaths: [indexPath],
      })
*/
      // generate this string from google font
      console.log('indexPath', indexPath)
      /*
      await AWSSESHelper.sendWithAttachments({
        subject: `PDF Generator (Case Id: ${caseId})`,
        body: `File Name: ${fileName}\nViewport: ${JSON.stringify(
          viewport,
        )}\nDevice Scale Factor: ${deviceScaleFactor}`,
        attachmentPaths: [indexPath],
      })
*/
      fs.writeFileSync(indexPath, entireHtml)
      console.log('finish writing html file', indexPath)
      const fileProtocolPath = `file://${indexPath}`
      console.log('fileProtocolPath', fileProtocolPath)
      await page.goto(fileProtocolPath, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
      })
      console.log('open page done', indexPath)

      // Wait for all images to be fully loaded AND decoded
      console.log('waiting for all images to load and decode')
      try {
        // Step 1: Wait for all images to have complete=true and valid dimensions
        await page.waitForFunction(
          () => {
            const images = Array.from(document.querySelectorAll('img'))
            if (images.length === 0) return true

            return images.every(
              (img) =>
                img.complete && img.naturalWidth > 0 && img.naturalHeight > 0,
            )
          },
          { timeout: 5000, polling: 100 },
        )
        console.log('all images complete with valid dimensions')

        // Step 2: Force decode all images to ensure they're rasterized in memory
        // Using string to avoid Terser mangling variable names
        const decodeResult = await page.evaluate(`(async function() {
          var images = Array.from(document.querySelectorAll('img'));
          var results = [];
          for (var i = 0; i < images.length; i++) {
            var img = images[i];
            try {
              if (typeof img.decode === 'function') {
                await img.decode();
                results.push('decoded: ' + img.src.substring(0, 50) + ' (' + img.naturalWidth + 'x' + img.naturalHeight + ')');
              } else {
                results.push('no decode method: ' + img.src.substring(0, 50) + ' (' + img.naturalWidth + 'x' + img.naturalHeight + ')');
              }
            } catch (err) {
              var errorMsg = err instanceof Error ? err.message : String(err);
              results.push('decode error: ' + img.src.substring(0, 50) + ' - ' + errorMsg);
            }
          }
          return results;
        })()`)
        console.log('Image decode results:', decodeResult)

        // Debug: Log computed styles of images to detect size issues
        // Using string to avoid Terser mangling variable names
        const imageStylesDebug = await page.evaluate(`(function() {
          var images = Array.from(document.querySelectorAll('img'));
          return images.map(function(img) {
            var computed = window.getComputedStyle(img);
            var rect = img.getBoundingClientRect();
            return {
              src: img.src.substring(img.src.lastIndexOf('/') + 1, img.src.lastIndexOf('/') + 30),
              naturalSize: img.naturalWidth + 'x' + img.naturalHeight,
              computedSize: computed.width + 'x' + computed.height,
              boundingRect: Math.round(rect.width) + 'x' + Math.round(rect.height),
              transform: computed.transform,
              scale: computed.transform.includes('matrix') ? computed.transform : 'none'
            };
          });
        })()`)
        console.log(
          'Image styles debug:',
          JSON.stringify(imageStylesDebug, null, 2),
        )

        console.log('all images loaded and decoded successfully')
      } catch (outerError) {
        const errorMessage =
          outerError instanceof Error ? outerError.message : String(outerError)
        console.warn(
          'Image loading/decoding issue, proceeding with caution:',
          errorMessage,
        )
      }

      const filePath = `${path}/${fileName}`
      if (type === 'jpg' || type === 'png') {
        const isTransparent = type === 'png'
        if (isTransparent) {
          await page.evaluate(
            () => (document.body.style.background = 'transparent'),
          )
        }

        console.log('setting view port', { viewport, deviceScaleFactor })
        await page.setViewport({
          width: Math.round(viewport.width),
          height: Math.round(viewport.height),
          deviceScaleFactor,
        })

        console.log('taking screenshot', indexPath)
        const screenshotOptions: ScreenshotOptions = {
          path: filePath,
          type:
            isTransparent || GENERATOR_CONFIG.PUPPETEER_FILE_FORMAT === 'png'
              ? 'png'
              : 'jpeg',
          clip: {
            x: 0,
            y: 0,
            ...viewport,
          },
          ...(isTransparent ? { omitBackground: true } : {}),
        }
        console.log('taking screenshot options', screenshotOptions)
        await page.screenshot(screenshotOptions as any)
        console.log('finish taking screenshot', indexPath)
      } else if (type === 'pdf') {
        const config = {
          displayHeaderFooter: false,
          path: filePath,
          printBackground: true,
          timeout: 60000, // 60 seconds
          deviceScaleFactor: 1,
        }

        const height = await page.evaluate(
          () => document.documentElement.offsetHeight,
        )
        const pages =
          noOfPages ??
          Math.round(height / (viewport.height * MM_TO_PAGE_SIZE_SCALE))
        console.log('pages', { height, viewportHeight: viewport.height }, pages)
        await page.pdf({
          ...config,
          width: `${viewport.width}mm`,
          height: `${viewport.height}mm`,
          pageRanges: `1-${pages}`,
        })
      }
      console.log('closing chrome', indexPath)
      await Promise.race([page.close(), page.close(), page.close()])
      console.log('page closed', indexPath)
      await Promise.race([chrome.close(), chrome.close(), chrome.close()])
      console.log('chrome closed', indexPath)
      console.log('generated filePath', filePath)
      return { filePath, htmlFilePath: indexPath }
    } catch (error) {
      if (indexPath) {
        const email = 'kakchan@gmail.com'
        console.log('indexPath found. Sending email to ' + email)
        await AWSSESHelper.sendWithAttachments({
          subject: `PDF Generator (Case Id: ${caseId})`,
          to: 'kakchan@gmail.com',
          body: `File Name: ${fileName}\nViewport: ${JSON.stringify(
            viewport,
          )}\nDevice Scale Factor: ${deviceScaleFactor}\n
          Error: ${JSON.stringify(error)}`,
          attachmentPaths: [indexPath],
        })
      } else {
        console.log('No indexPath found. Not sending email')
      }
      throw new Error(error)
    }
  }

  protected static async getChrome() {
    ffmpeg.setFfmpegPath(GENERATOR_CONFIG.FFMPEG_PATH!)
    const chromium = require('@sparticuz/chromium')
    try {
      // Optional: If you'd like to use the new headless mode. "shell" is the default.
      // NOTE: Because we build the shell binary, this option does not work.
      //       However, this option will stay so when we migrate to full chromium it will work.
      chromium.setHeadlessMode = true

      // Optional: If you'd like to disable webgl, true is the default.
      chromium.setGraphicsMode = false

      // Optional: Load any fonts you need. Open Sans is included by default in AWS Lambda instances
      // await chromium.font(
      //  "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
      // );

      // const executablePath = await chromium.executablePath
      // const executablePath = '/tmp/chromium'
      const executablePath = process.env.CHROME_EXECUTION_PATH
        ? process.env.CHROME_EXECUTION_PATH
        : await chromium.executablePath()
      // GENERATORLOCAL
      /*const executablePath =
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' */
      console.log('executablePath', executablePath)
      return await puppeteer.launch({
        pipe: true,
        timeout: 500,
        // args: chromium.args,
        args: [
          ...chromium.args,
          '--disable-features=VizDisplayCompositor,AudioServiceOutOfProcess',
          '--single-process',
          '--no-sandbox',
          '--disable-gpu',
          '--headless',
          '--disable-setuid-sandbox',
          '--hide-scrollbars',
          '--disable-web-security',
          '--disable-gpu-compositing',
          '--disable-software-rasterizer',
          '--font-render-hinting=none',

          '--autoplay-policy=user-gesture-required',
          '--disable-background-networking',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-breakpad',
          '--disable-client-side-phishing-detection',
          '--disable-component-update',
          '--disable-default-apps',
          '--disable-dev-shm-usage',
          '--disable-domain-reliability',
          '--disable-hang-monitor',
          '--disable-ipc-flooding-protection',
          '--disable-notifications',
          '--disable-offer-store-unmasked-wallet-cards',
          '--disable-popup-blocking',
          '--disable-print-preview',
          '--disable-prompt-on-repost',
          '--disable-renderer-backgrounding',
          '--disable-speech-api',
          '--disable-sync',
          '--ignore-gpu-blacklist',
          '--metrics-recording-only',
          '--mute-audio',
          '--no-default-browser-check',
          '--no-first-run',
          '--no-pings',
          '--no-zygote',
          '--password-store=basic',
          '--use-gl=swiftshader',
          '--use-mock-keychain',
          '--allow-insecure-localhost',
          '--ignore-certificate-errors',
          '--disable-accelerated-2d-canvas',
        ],
        defaultViewport: {
          ...chromium.defaultViewport,
          width: 1280,
          height: 1, // let the body component to workout the height
          deviceScaleFactor: 2,
        },
        executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      })
    } catch (error) {
      console.log('getChrome error', error)
      throw error
    }
  }
}
