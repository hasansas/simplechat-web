import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3355,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${process.env.APP_NAME}`,
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Round' },]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-country-code.js',
    '~/plugins/vue-directive.js',
    '~/plugins/vue-json-excel'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // axios
  axios: {
    baseURL: process.env.API_URL,
    redirectError: {
      401: '/login',
      404: '/notfound'
    }
  },

  /*
  ** moment
  */
  moment: {
    defaultLocale: 'id',
    locales: ['id']
  },
}
