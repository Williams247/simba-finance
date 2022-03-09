export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Simba',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/bootstrap/bootstrap.css',
    '~assets/scss/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/is-json', ssr: false },
    { src: '~plugins/axios', ssr: false },
    { src: '~plugins/bootstrap.bundle.min', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          type: '',
        },
        user: {
          property: '',
        },
        endpoints: {
          login: {
            url: `/auth/login`,
            method: 'post',
          },
          logout: false,
          user: {
            url: `/customer/profile`,
            method: 'get',
          },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: null,
    },
  },

  toast: {
    position: 'top-center',
    duration: 3000,
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
