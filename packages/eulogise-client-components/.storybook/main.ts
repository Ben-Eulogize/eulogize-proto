// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import type { StorybookConfig } from '@storybook/react-webpack5'
import webpack from 'webpack'
import { existsSync } from 'fs'
import { dirname, join, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const staticDirs: StorybookConfig['staticDirs'] = ['../src/assets', '../public']

const fontsDir = resolve(__dirname, '../src/fonts')
if (existsSync(fontsDir)) {
  staticDirs.push({ from: fontsDir, to: '/fonts' })
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    'storybook/viewport',
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  staticDirs,

  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),

  webpackFinal: async (baseConfig) => {
    const updatedConfig = { ...baseConfig }
    updatedConfig.module = updatedConfig.module || {}
    updatedConfig.module.rules = updatedConfig.module.rules || []

    const tsRule = updatedConfig.module.rules.find(
      (rule) => rule?.test && rule.test.toString().includes('tsx?'),
    )

    if (tsRule) {
      tsRule.exclude = /node_modules\/(?!@eulogise)/
    }

    updatedConfig.module.rules = updatedConfig.module.rules.map((rule) => {
      if (rule && Array.isArray((rule as { use?: unknown }).use)) {
        const useLoaders = (
          rule as { use: Array<{ loader?: string; options?: any }> }
        ).use
        const babelLoaderIndex = useLoaders.findIndex(
          (use) => use.loader && use.loader.includes('babel-loader'),
        )

        if (babelLoaderIndex !== -1) {
          const babelLoader = useLoaders[babelLoaderIndex]
          babelLoader.options = babelLoader.options || {}
          babelLoader.options.presets = babelLoader.options.presets || []

          const hasReactPreset = babelLoader.options.presets.some(
            (preset: any) =>
              Array.isArray(preset)
                ? preset[0]?.includes('@babel/preset-react')
                : typeof preset === 'string' &&
                  preset.includes('@babel/preset-react'),
          )

          if (!hasReactPreset) {
            babelLoader.options.presets.push([
              require.resolve('@babel/preset-react'),
              {
                runtime: 'automatic',
                importSource: 'react',
              },
            ])
          }

          const hasTsPreset = babelLoader.options.presets.some((preset: any) =>
            Array.isArray(preset)
              ? preset[0]?.includes('typescript')
              : typeof preset === 'string' && preset.includes('typescript'),
          )

          if (!hasTsPreset) {
            babelLoader.options.presets.push(
              require.resolve('@babel/preset-typescript'),
            )
          }
        }
      }

      return rule
    })

    const rules = updatedConfig.module.rules

    const matchRule = (rule: any, resource: string): any | null => {
      if (!rule || typeof rule !== 'object') {
        return null
      }

      if (rule.test instanceof RegExp && rule.test.test(resource)) {
        return rule
      }

      if (
        rule.resourceQuery instanceof RegExp &&
        rule.resourceQuery.test(resource)
      ) {
        return rule
      }

      if (Array.isArray(rule.oneOf)) {
        for (const inner of rule.oneOf) {
          const result = matchRule(inner, resource)
          if (result) {
            return result
          }
        }
      }

      return null
    }

    const ruleUsesLoader = (rule: any, loaderSubstring: string): boolean => {
      if (!rule || typeof rule !== 'object') {
        return false
      }

      if (
        typeof rule.loader === 'string' &&
        rule.loader.includes(loaderSubstring)
      ) {
        return true
      }

      if (Array.isArray(rule.use)) {
        if (
          rule.use.some(
            (use) =>
              use &&
              typeof use === 'object' &&
              typeof use.loader === 'string' &&
              use.loader.includes(loaderSubstring),
          )
        ) {
          return true
        }
      }

      if (Array.isArray(rule.oneOf)) {
        return rule.oneOf.some((innerRule) =>
          ruleUsesLoader(innerRule, loaderSubstring),
        )
      }

      return false
    }

    const storyMdxHandled = rules
      .map((rule) => matchRule(rule, 'example.stories.mdx'))
      .filter(Boolean)
      .some((rule) => ruleUsesLoader(rule, '@storybook/addon-docs/mdx-loader'))

    if (!storyMdxHandled) {
      rules.push({
        test: /\.stories\.mdx$/,
        use: [
          {
            loader: require.resolve('@storybook/addon-docs/mdx-loader'),
            options: {
              providerImportSource: '@storybook/addon-docs/mdx-react-shim',
            },
          },
        ],
      })
    }

    const hasSassRule = rules.some(
      (rule) =>
        rule?.test instanceof RegExp &&
        (rule.test.test('test.scss') || rule.test.test('test.sass')),
    )

    if (!hasSassRule) {
      rules.push({
        test: /\.s[ac]ss$/i,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              implementation: require('sass'),
            },
          },
        ],
        sideEffects: true,
      })
    }

    const hasFontRule = rules.some(
      (rule) =>
        rule?.test instanceof RegExp &&
        (rule.test.test('test.woff') || rule.test.test('test.woff2')),
    )

    if (!hasFontRule) {
      rules.push({
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]',
        },
      })
    }

    updatedConfig.resolve = updatedConfig.resolve || {}
    updatedConfig.resolve.fallback = {
      ...updatedConfig.resolve.fallback,
      process: require.resolve('process/browser'),
    }

    updatedConfig.plugins = updatedConfig.plugins || []
    const hasProcessProvide = updatedConfig.plugins.some(
      (plugin) =>
        plugin &&
        typeof plugin === 'object' &&
        'constructor' in plugin &&
        // @ts-expect-error runtime check
        plugin.constructor &&
        plugin.constructor.name === 'ProvidePlugin' &&
        // @ts-expect-error private property we can inspect
        plugin.definitions &&
        // @ts-expect-error
        plugin.definitions.process,
    )

    if (!hasProcessProvide) {
      updatedConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
      )
    }

    return updatedConfig
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}
