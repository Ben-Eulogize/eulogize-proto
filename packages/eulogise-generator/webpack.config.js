const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const slsw = require('serverless-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: '**',
        to: 'src/routes/assets',
        context: 'src/helpers/assets',
      },
    ],
  }),
  new webpack.DefinePlugin({
    'process.env.FLUENTFFMPEG_COV': false,
  }),
  // IgnorePlugin prevents the generation of modules for import or require calls matching the regular expressions or filter functions:
  /*
  new webpack.IgnorePlugin({
    resourceRegExp: /sparticuz/,
  }),
*/
  new ForkTsCheckerWebpackPlugin(),
]

const isDev = slsw.lib.webpack.isLocal

const exp = {
  entry: slsw.lib.entries,
  target: 'node',
  plugins,
  mode: isDev ? 'development' : 'production',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    // Instruct Webpack to use the `ts-loader` for any TypeScript files, else it
    // won't know what to do with them.
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          path.resolve(__dirname, '.webpack'),
          path.resolve(__dirname, '.serverless'),
          path.resolve(__dirname, '.dynamodb'),
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '../../node_modules'),
          path.resolve(__dirname, 'test'),
          path.resolve(__dirname, 'seed'),
          /node_modules/,
        ],
        // And here we have options for ts-loader
        // https://www.npmjs.com/package/ts-loader#options
        options: {
          // Disable type checking, this will lead to improved build times
          transpileOnly: true,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        include: path.resolve(__dirname, '../eulogise-client-components/dist'), // Directory for component SVGs
      },
    ],
  },
  optimization: {
    // minimize: false,
    minimizer: [new TerserPlugin()],
  },
  cache: {
    type: 'filesystem',
    name: isDev ? 'dev' : 'prod',
    buildDependencies: {
      loaders: ['ts-loader'],
    },
  },

  // we use webpack-node-externals to excludes all node deps.
  // You can manually set the externals too.
  externals: [
    'hummus',
    'fluent-ffmpeg',
    'image-to-base64',
    'puppeteer-core',
    '@sparticuz/chromium',
    'sharp',
    '@aws-sdk/client-cloudfront',
    '@aws-sdk/client-lambda',
    '@aws-sdk/client-s3',
    '@aws-sdk/client-ses',
    nodeExternals({
      allowlist: [/^@eulogise/],
    }),
  ],
  externalsPresets: {
    node: true,
  },
}

module.exports = exp
