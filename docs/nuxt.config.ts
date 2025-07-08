import { glob } from 'node:fs'
import { basename, resolve } from 'node:path'

async function prerenderRoutes() {
  const contentDir = resolve('content') // Adjust if your content is elsewhere, e.g., 'posts'

  // Use glob to find all markdown files (or whatever extensions you use)
  const files = await new Promise<string[]>((resolve, reject) => {
    glob('**/*.{md,yml,csv,json}', { cwd: contentDir }, (err, files) => {
      if (err)
        return reject(err)
      resolve(files)
    })
  })

  // Map file paths to Nuxt content paths (e.g., 'my-post.md' -> '/my-post')
  const contentPaths = files.map((file) => {
    let path = file
      .replace(/\.(md|yml|csv|json)$/, '') // Remove file extension
      .replace(/\\/g, '/') // Normalize slashes for Windows compatibility

    // If your content files are in subdirectories, you might need to handle 'index' files
    // For example, 'blog/my-post/index.md' -> '/blog/my-post'
    if (basename(path) === 'index') {
      path = path.substring(0, path.lastIndexOf('/'))
    }

    return `/${path}` // Add leading slash
  })

  // Add any other specific routes you want to guarantee prerendering
  return ['/', ...contentPaths]
}

const routes = await prerenderRoutes()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@nuxt/image',
    './modules/vui-global-register',
  ],
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes,
    },
  },
})

// function prerenderRoutes() {
//   const contentDir = path.resolve(__dirname, 'content') // adjust if needed
//   const files = fs.readdirSync(contentDir)

//   return files
//     .filter(f => f.endsWith('.md'))
//     .map(f => `/${f.replace(/\.md$/, '')}`)
// }
