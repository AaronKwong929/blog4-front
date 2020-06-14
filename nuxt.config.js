export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    env: {
        baseUrl: process.env.BASE_URL,
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
    plugins: ['@/plugins/element-ui'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [],
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
        port: 8000,
        host: '0.0.0.0'
    }
};
