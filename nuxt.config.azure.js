// const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin")
// const CKEditorStyles = require("@ckeditor/ckeditor5-dev-utils").styles

module.exports = {
  ssr: false,
  target: 'static',
  generate: {
    fallback: true,
    exclude: [
      /^\/profile\/[0-9]+$/,
      /^\/page\/.+$/,
      /^\/p\/.+$/,
      /^\/p\/[0-9]+$/,
    ],
    // exclude: [
    //   /^\/a\/cms\/menucreate+$/
    // ],
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "ACE",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: "Deloitte Rewards - SPA App"
      },
      {
        name: "msapplication-TileColor",
        content: "#000000"
      },
      {
        name: "msapplication-TileImage",
        content: "/ms-icon-144x144.png"
      },
      {
        name: "theme-color",
        content: "#000000"
      },
    ],
    link: [
      { rel: "manifest", href: "/manifest.json" },

      { rel: "icon", type: "image/png", href: "/favicon-16x16.png", sizes: '16x16' },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: '32x32' },
      { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: '96x96' },

      { rel: "icon", type: "image/png", href: "/android-icon-192x192.png", sizes: '192x192' },

      { rel: "apple-touch-icon", href: "/apple-icon-57x57.png", sizes: '57x57' },
      { rel: "apple-touch-icon", href: "/apple-icon-60x60.png", sizes: '60x60' },
      { rel: "apple-touch-icon", href: "/apple-icon-72x72.png", sizes: '72x72' },
      { rel: "apple-touch-icon", href: "/apple-icon-76x76.png", sizes: '76x76' },
      { rel: "apple-touch-icon", href: "/apple-icon-114x114.png", sizes: '114x114' },
      { rel: "apple-touch-icon", href: "/apple-icon-120x120.png", sizes: '120x120' },
      { rel: "apple-touch-icon", href: "/apple-icon-144x144.png", sizes: '144x144' },
      { rel: "apple-touch-icon", href: "/apple-icon-152x152.png", sizes: '152x152' },
      { rel: "apple-touch-icon", href: "/apple-icon-180x180.png", sizes: '180x180' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["normalize.css", "~/assets/scss/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    { src: "~/plugins/helpers", ssr: false },
    { src: "~/plugins/masonry", ssr: false },
    // Currently disabled to save total compile size.
    // { src: '~/plugins/vuelidate', ssr: false },
    { src: "~/plugins/vuetify-confirm", ssr: false },
    // { src: '~/plugins/rich-editor', ssr: false }
    // { src: '~/plugins/rich-editor', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    [
      "@nuxtjs/dotenv", {
        filename: '.env.azure'
    }],
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
    "@nuxtjs/toast",
    "@nuxtjs/moment",
  ],

  // ...
  // modules: ['@tui-nuxt/editor'],
  // tui: {
  //   editor: {}
  // },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   if (process.env.NODE_ENV !== "production") {
    //     // config.devtool = "#source-map";
    //   }
    // },
    // plugins: [
    //   // CKEditor needs its own plugin to be built using webpack.
    //   new CKEditorWebpackPlugin({
    //     // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
    //     language: "en"
    //   })
    // ],
    // Various modules in the CKEditor source code import .css files.
    // These files must be transpiled using PostCSS in order to load properly.
    // postcss: CKEditorStyles.getPostCssConfig({
    //   themeImporter: {
    //     // themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
    //   },
    //   minify: true
    // }),
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   const filesRuleIndex = config.module.rules.findIndex(item => {
    //     return `${item.test}` == "/\\.(png|jpe?g|gif|svg|webp)$/i"
    //   })
    //   if (filesRuleIndex !== -1) {
    //     config.module.rules[filesRuleIndex].test = /\.(png|jpe?g|gif|webp)$/
    //     const svgRule = config.module.rules[filesRuleIndex]
    //     svgRule.test = /\.svg/
    //     svgRule.exclude = svgRule.exclude || []
    //     svgRule.exclude.push(__dirname + "/node_modules/@ckeditor")
    //     config.module.rules.push(svgRule)
    //   }
    //   // Vue CLI would normally use its own loader to load .svg files. The icons used by
    //   // CKEditor should be loaded using raw-loader instead.
    //   config.module.rules.push({
    //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    //     use: ["raw-loader"]
    //   })
    // }

    // plugins: [
    //   // CKEditor needs its own plugin to be built using webpack.
    //   new CKEditorWebpackPlugin({
    //     // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
    //     language: "en"
    //   })
    // ],
    // Various modules in the CKEditor source code import .css files.
    // These files must be transpiled using PostCSS in order to load properly.
    // postcss: CKEditorStyles.getPostCssConfig({
    //   themeImporter: {
    //     // themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
    //   },
    //   minify: true
    // }),
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   const filesRuleIndex = config.module.rules.findIndex(item => {
    //     return `${item.test}` == "/\\.(png|jpe?g|gif|svg|webp)$/i"
    //   })
    //   if (filesRuleIndex !== -1) {
    //     config.module.rules[filesRuleIndex].test = /\.(png|jpe?g|gif|webp)$/
    //     const svgRule = config.module.rules[filesRuleIndex]
    //     svgRule.test = /\.svg/
    //     svgRule.exclude = svgRule.exclude || []
    //     svgRule.exclude.push(__dirname + "/node_modules/@ckeditor")
    //     config.module.rules.push(svgRule)
    //   }
    //   // Vue CLI would normally use its own loader to load .svg files. The icons used by
    //   // CKEditor should be loaded using raw-loader instead.
    //   config.module.rules.push({
    //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    //     use: ["raw-loader"]
    //   })
    // }
  },

  vue: {
    config: {
      // Force Vue devtools to show on production build. Only set to `true` on development
      // devtools: true,
    }
  },

  // Vuetify plugin
  // Reference: https://github.com/nuxt-community/modules/tree/master/packages/vuetify
  vuetify: {
    materialIcons: false,
    treeShake: true,
    css: true,
  },

  // Vue-toasted plugin
  // Reference: https://github.com/nuxt-community/modules/tree/master/packages/toast
  toast: {
    position: "top-right",
    duration: 3000,
  },

  // Vue router
  router: {

    middleware: 'https-check',
    routes: [
      {
        path: 'a/cms/menuedit/:id',
        props: true
      },
      {
        path: 'a/cms/faqedit/:id',
        props: true
      },
      {
        path: 'a/cms/faqcategoriesedit/:id',
        props: true
      },
      {
        path: 'a/cms/faqfileedit/:id',
        props: true
      },
    ],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: 'page/*',
        component: resolve(__dirname, 'pages/page.vue')
      })
    }
  },
};
