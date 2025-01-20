import faLanguage from "./translate/fa.json";
import configInf from "./configs.js";

const isProduct = process.env.NODE_ENV === 'production';

const srcs = [
  { src: '/js/app_static.js', body: false, defer: false },
  { src: '/js/app_static_body.js', body: true, defer: false}
]

if(isProduct){
  // srcs.push({ src: 'https://www.clarity.ms/tag/oserhzvbre', body: false, async: true});
}

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "connect",
    htmlAttrs: {
      lang: "fa",
    },
    meta: [
      { charset: "utf-8" },

      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    /*link: [
      { rel: "icon", type: "image/x-icon", href: "https://www.zarinpal.com/icons/favicon.ico" },
      { rel: "shortcut icon", type: "image/x-icon", href: "https://www.zarinpal.com/icons/favicon.ico" },
      { rel: "mask-icon", type: "image/png", href: "https://www.zarinpal.com/icons/safari-pinned-tab.svg" },
      { rel: "apple-touch-icon", type: "image/png",sizes:"180x180", href: "https://www.zarinpal.com/icons/apple-touch-icon.png" },
    ],*/
    link: [

    ],

    script: srcs
  },
  router: {
    base: '/',
    // base: '/',
    middleware : 'permissions'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/zpl.js",
    "~/plugins/zplUi.js",
    "~plugins/core-components",
    "~/plugins/validation/vee-validate.js",
    "~plugins/filters/filters"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxt-hero-icons/outline/nuxt",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxt/typescript-build",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/apollo",
    "@nuxtjs/i18n",
  ],
  i18n: {
    locales: ["fa"],
    defaultLocale: "fa",
    vueI18n: {
      fallbackLocale: "fa",
      messages: {
        fa: faLanguage,
      },
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "/api/v4/graphql/",
        // httpLinkOptions: {
        //   headers:{
        //
        //   }
        // }
      },
      authClient: {
        httpEndpoint: "/api/v4/graphql/",
      //   httpLinkOptions: {
      //     headers:{
      //
      //   }
      // }
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: configInf.proxy,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },

  privateRuntimeConfig:{
    NODE_ENV: process.env.NODE_ENV
  },

  publicRuntimeConfig:{
    NODE_ENV: process.env.NODE_ENV
  },

  server:configInf.server
};
