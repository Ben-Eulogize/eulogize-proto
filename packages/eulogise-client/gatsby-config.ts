const path = require('path')

const envName = process.env.ENV
const envPath = path.resolve(__dirname, 'environments', `.env.${envName}`)

require('dotenv').config({
  path: envPath,
})

console.log(`Environment: ${process.env.ENV}`)
console.log(`GATSBY_APP_ENDPOINT: ${process.env.GATSBY_APP_ENDPOINT}`)
console.log(`GATSBY_AWS_S3_BUCKET: ${process.env.GATSBY_AWS_S3_BUCKET}`)
console.log(`GATSBY_AWS_S3_URL: ${process.env.GATSBY_AWS_S3_URL}`)
console.log(`GATSBY_FILESTACK_CDN: ${process.env.GATSBY_FILESTACK_CDN}`)
console.log(`GATSBY_FILESTACK_API_KEY: ${process.env.GATSBY_FILESTACK_API_KEY}`)
console.log(`GATSBY_EULOGISE_API_URL: ${process.env.GATSBY_EULOGISE_API_URL}`)
console.log(`GATSBY_USE_MOCK: ${process.env.GATSBY_USE_MOCK}`)
console.log(`GATSBY_USE_DEVELOPMENT: ${process.env.GATSBY_USE_DEVELOPMENT}`)
console.log(
  `GATSBY_BRAINFISH_WIDGET_KEY: ${process.env.GATSBY_BRAINFISH_WIDGET_KEY}`,
)
console.log(
  `GATSBY_GOOGLE_TAG_MANAGER_ID: ${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}`,
)
console.log(`GATSBY_BUGSNAG_ENABLED: ${process.env.GATSBY_BUGSNAG_ENABLED}`)
console.log(
  `GATSBY_BUGSNAG_RELEASE_STAGE: ${process.env.GATSBY_BUGSNAG_RELEASE_STAGE}`,
)
console.log(`GATSBY_BUGSNAG_API_KEY: ${process.env.GATSBY_BUGSNAG_API_KEY}`)

module.exports = {
  siteMetadata: {
    siteUrl: 'https://app.eulogisememorials.com/',
    title: 'Eulogize',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-remove-console',
      options: {
        exclude: ['error', 'warn'],
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          modifyVars: {
            // antd theme variables
            'primary-color': '#9e21bd',
            'link-color': '#9e21bd',
          },
          javascriptEnabled: true,
        },
      },
    },
    process.env.GATSBY_GOOGLE_TAG_MANAGER_ID && {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GATSBY_GOOGLE_TAG_MANAGER_ID,
        includeInDevelopment: false,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include:
            /IconAsset\/icons|DividerAsset\/dividers|BorderAsset\/graphics/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/ui/assets/logo.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/ui/assets/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [
          `/admin/genericCardProducts/*`,
          `/admin/slideshows/*`,
          `/admin/slideshows-preview/*`,
          `/admin/booklets/*`,
          `/admin/sidedCards/*`,
          '/admin/bookmarks/*',
          '/admin/thankYouCards/*',
          '/admin/tvWelcomeScreens/*',
          '/admin/slideshowTitleSlides/*',
          '/admin/photobooks/*',
          `/eulogizeAdmin/edit/edit-client/*`,
          `/admin/bookletBackgroundImages/*`,
          `/eulogizeAdmin/edit/editGenericCardProductType/*`,
          '/preview/cardProducts/*',
          '/shares/*',
          '/shareDownload/*',
          '/home/*',
          '/embedded/slideshows/*',
          '/embedded/cardProducts/*',
          '/embedded/whitebar/*',
        ],
      },
    },
    process.env.GATSBY_FRESH_CHAT_ID && {
      resolve: `gatsby-plugin-freshchat`,
      options: {
        token: '5b71e948-af8a-46cf-a723-51b090c5db06',
        host: 'https://wchat.freshchat.com',
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://static.filestackapi.com/transforms-ui/3.0.0/transforms.umd.min.js',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.GATSBY_APP_ENDPOINT,
        policy: [{ userAgent: '*', disallow: '/' }],
      },
    },
  ].filter((plugin) => plugin),
}
