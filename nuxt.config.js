export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        nodeEnv: process.env.NODE_ENV
    },
    head: {
        title: `Aaron's Blog4`,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, user-scalable=no'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '@/static/index.scss',
        '@/static/atom-one-dark.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui'
        // { src: '@/plugins/axios.js', ssr: true }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/dotenv-module
        // '@nuxtjs/dotenv',
        // '@nuxtjs/axios',
        // '@nuxtjs/proxy'
    ],
    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    server: {
        port: 8080,
        host: 'localhost'
    }
    // axios: {
    //     // proxy: true,
    //     // prefix: 'http://127.0.0.1:3000',
    //     // baseURL : 'http://127.0.0.1:3000'
    // },
    // proxy: {
    //     // '/api': {
    //     //   target: 'http://127.0.0.1:3000',
    //     //   changeOrigin: true,
    //     //   pathRewrite: {
    //     //     '^/api': ''
    //     //   }
    //     // }
    // }
};
