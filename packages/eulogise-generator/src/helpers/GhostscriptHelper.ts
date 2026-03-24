import { execFileSync, execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'path'
import { GENERATOR_CONFIG } from '../config'

export class GhostscriptHelper {
  public static convertPdfToPrintableFormat({
    inputFilePath,
  }: {
    inputFilePath: string
  }): { inputFilePath: string; outputFilePath: string } {
    console.log(
      'GENERATOR_CONFIG.GHOSTSCRIPT_PATH',
      GENERATOR_CONFIG.GHOSTSCRIPT_PATH,
    )
    // get the file name and path without the extension from the inputFilePath
    const outputFilePath = `${inputFilePath.split('.')[0]}-converted.pdf`
    console.log('inputFilePath', inputFilePath)
    console.log('outputFilePath', outputFilePath)

    // Path to sRGB.icc profile in Lambda environment
    const sRGBProfilePath = path.join(
      __dirname,
      'assets',
      'sRGB_Color_Space_Profile.icm',
    )
    const postscriptProfilePath = path.join(__dirname, 'assets', 'PDFA_def.ps')
    console.log('sRGBProfilePath', sRGBProfilePath)
    console.log('postscriptProfilePath', postscriptProfilePath)

    // Debug: Check if files exist
    console.log('Checking files...')
    console.log('ICC profile exists:', fs.existsSync(sRGBProfilePath))
    console.log('PDFA_def.ps exists:', fs.existsSync(postscriptProfilePath))
    console.log('Input PDF exists:', fs.existsSync(inputFilePath))

    // Debug: Check Ghostscript setup
    console.log(
      'GS Version:',
      execSync(`${GENERATOR_CONFIG.GHOSTSCRIPT_PATH} --version`).toString(),
    )

    // Use execFileSync with array of arguments
    const args = [
      `-dNOPAUSE`,
      `-dBATCH`,
      `-dNOSAFER`,
      `-sDEVICE=pdfwrite`,
      `-dPDFA=1`,
      `-dPDFACompatibilityPolicy=1`,
      `-sColorConversionStrategy=RGB`,
      `-sProcessColorModel=DeviceRGB`,
      `-dCompatibilityLevel=1.4`,
      `-dPDFSETTINGS=/prepress`,
      `-dEmbedAllFonts=true`,
      `-dSubsetFonts=true`,
      `-dFlattenAllPages=true`,
      `-sOutputFile=${outputFilePath}`,
      `-c`,
      `[ /Title (Document Title) /Author (Author Name) /Subject (Document Subject) /Creator (Creator Application) /Producer (Producer Application) /DOCINFO pdfmark`,
      `-c`,
      `/ICCProfile (${sRGBProfilePath}) def`,
      `-c`,
      `[/_objdef {icc_PDFA} /type /stream /OBJ pdfmark`,
      `-c`,
      `[{icc_PDFA} << /N 3 >> /PUT pdfmark`,
      `-c`,
      `[{icc_PDFA} ICCProfile (r) file /PUT pdfmark`,
      `-c`,
      `[/_objdef {OutputIntent_PDFA} /type /dict /OBJ pdfmark`,
      `-c`,
      `[{OutputIntent_PDFA} << /Type /OutputIntent /S /GTS_PDFA1 /DestOutputProfile {icc_PDFA} /OutputConditionIdentifier (sRGB IEC61966-2.1) /Info (sRGB IEC61966-2.1) >> /PUT pdfmark`,
      `-c`,
      `[{Catalog} <</OutputIntents [ {OutputIntent_PDFA} ]>> /PUT pdfmark`,
      `-f`,
      inputFilePath,
    ]

    const result = execFileSync(GENERATOR_CONFIG.GHOSTSCRIPT_PATH, args)

    console.log('Ghostscript conversion result:', result.toString())
    return { inputFilePath, outputFilePath }
  }
}
