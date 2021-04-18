export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "mcsoc-chatbox-demo",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  /*
   ** Runtime Config
   */

  publicRuntimeConfig: {
    axios: {
      baseURL: "https://mcsoc-chatbox-demo.herokuapp.com/api"
      // baseURL: "http://localhost:3000/api"
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/firebase"
  ],

  firebase: {
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      apiKey: "AIzaSyAJ6-CG-M3QnQ1APNGW44_SW5m1_WdjCF8",
      authDomain: "mcsoc-chatbox-demo.firebaseapp.com",
      databaseURL: "https://mcsoc-chatbox-demo-default-rtdb.firebaseio.com",
      projectId: "mcsoc-chatbox-demo",
      storageBucket: "mcsoc-chatbox-demo.appspot.com",
      messagingSenderId: "327732226760",
      appId: "1:327732226760:web:72fb3dcee14b3f6b7893fd"
    },
    services: {
      auth: true,
      firestore: true,
      functions: true,
      storage: true,
      database: true,
      messaging: true,
      performance: true,
      analytics: true,
      remoteConfig: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: [{ path: "/api", handler: "~/api/index.js" }],
  auth: {
    redirect: {
      login: "/login"
    },
    strategies: {
      local: {
        token: {
          property: "token"
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user"
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/auth/signIn", method: "post" },
          logout: { url: "/auth/signOut", method: "post" },
          user: { url: "/auth/user", method: "get" }
        }
      }
    }
  }
};
