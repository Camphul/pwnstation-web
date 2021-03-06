// eslint-disable-next-line nuxt/no-cjs-in-config
import colors from 'vuetify/es5/util/colors'
// eslint-disable-next-line no-unused-vars
import consola from 'consola'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - PwnStation',
    title: 'PwnStation',
    htmlAttrs: {
      lang: process.env.LOCALE
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  dev: process.env.NODE_ENV !== 'production',
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/fonts.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/socket-client-plugin.js', mode: 'client'},
    {src: '~/plugins/page-title-plugin.js', mode: 'client'},
    {src: '~/plugins/notification-plugin.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '~/modules/ws',
  ],

  publicRuntimeConfig: {
    CPU_ARCH: process.env.NODE_ENV === 'production' ? process.env.CPU_ARCH_RPI : process.env.CPU_ARCH_X86,
    LOCALE: process.env.LOCALE | 'en',
    WS_URL: process.env.NODE_ENV === 'production' ?  process.env.WS_URL_PROD : process.env.WS_URL_DEV,
    SHUTDOWN_COMMAND: process.env.NODE_ENV === 'production' ? process.env.SHUTDOWN_COMMAND_RPI : process.env.SHUTDOWN_COMMAND_X86,
    REBOOT_COMMAND: process.env.NODE_ENV === 'production' ? process.env.REBOOT_COMMAND_RPI : process.env.REBOOT_COMMAND_X86,
    CWD_DIR: process.env.NODE_ENV === 'production' ? process.env.CWD_DIR_PROD : process.env.CWD_DIR_DEV
  },
  privateRuntimeConfig: {
    SERVER_PORT: process.env.SERVER_PORT | 3000,
    SERVER_HOST: process.env.SERVER_HOST | '0',
    WS_CORS_HOSTNAMES: process.env.WS_CORS_HOSTNAMES | 'ws://pwn.station',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      if (!isDev) {
        config.module.rules.push({
          test: /\.js$/,
          loader: 'thread-loader',
          options: {
            workers: 4,
            workerParallelJobs: 50,
            workerNodeArgs: ['--max-old-space-size=2048'],
          }
        })
        if (isClient) {
          config.optimization.splitChunks.maxSize = 512000
        }
      }
    },
    extractCSS: {
      ignoreOrder: true
    },
    minimize: true,
  }
}
