// import fs from 'node:fs'
// import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/vui/',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: [
    '~/assets/index.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern"
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
  // nitro: {
  //   prerender: {
  //     routes: prerenderRoutes(),
  //     failOnError: false,
  //     crawlLinks: true,
  //   },
  // },
  fonts: {
    provider: 'google',
    families: [
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800, 900] },
      { name: 'Geist Mono', weights: [400, 600] },
    ],
  },
  modules: [
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/fonts',
    './modules/vui-global-register',
  ],
})

// function prerenderRoutes() {
//   const contentDir = path.resolve(__dirname, 'content') // adjust if needed
//   const files = fs.readdirSync(contentDir)

//   return files
//     .filter(f => f.endsWith('.md'))
//     .map(f => `/${f.replace(/\.md$/, '')}`)
// }
