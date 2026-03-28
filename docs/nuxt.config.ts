// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  icon: {
    serverBundle: false,
  },
  ssr: true,
  app: {
    baseURL: '/vui/',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: [
    '@dolanske/vui/style',
    '~/assets/index.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
            default: 'vitesse-dark',
          },
        },
      },
    },
  },
  routeRules: {
    '/**': { prerender: true },
  },
  fonts: {
    provider: 'google',
    families: [
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Geist Mono', weights: [400] },
    ],
  },
  modules: [
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    './modules/vui-global-register',
  ],
})
