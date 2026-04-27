import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsContentRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), 'content/docs')

function collectMarkdownRoutes(directory: string, rootDirectory = directory): string[] {
  const entries = readdirSync(directory, { withFileTypes: true })

  return entries.flatMap((entry) => {
    const absolutePath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      return collectMarkdownRoutes(absolutePath, rootDirectory)
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      return []
    }

    const relativePath = absolutePath
      .slice(rootDirectory.length + 1)
      .replaceAll('\\', '/')

    const normalizedPath = relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')

    // Root markdown pages are rendered by /docs/index.vue.
    if (!normalizedPath.includes('/')) {
      return ['/docs']
    }

    const routePath = `/docs/${normalizedPath}`

    return [routePath.replace(/\/+/g, '/').replace(/\/$/, '') || '/docs']
  })
}

const prerenderRoutes = Array.from(new Set([
  '/docs',
  '/docs/components',
  '/docs/framework',
  '/docs/projects',
  '/docs/tokens',
  ...collectMarkdownRoutes(docsContentRoot),
]))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  icon: {
    provider: 'none',
    mode: 'svg',
    clientBundle: {
      icons: [
        'ph:arrow-down',
        'ph:arrow-left',
        'ph:arrow-right',
        'ph:arrow-up',
        'ph:arrow-up-right',
        'ph:arrows-out-cardinal',
        'ph:arrows-out-line-horizontal',
        'ph:arrows-out-line-vertical',
        'ph:bell',
        'ph:brackets-curly',
        'ph:caret-down',
        'ph:caret-up',
        'ph:check-square-fill',
        'ph:command',
        'ph:copy',
        'ph:dots-three-outline-fill',
        'ph:file-css',
        'ph:github-logo',
        'ph:house',
        'ph:info',
        'ph:link',
        'ph:list',
        'ph:sign-out',
        'ph:magnifying-glass',
        'ph:moon',
        'ph:person',
        'ph:phone',
        'ph:plus',
        'ph:rectangle-dashed',
        'ph:shapes',
        'ph:sidebar-simple',
        'ph:square',
        'ph:sun',
        'ph:target',
        'ph:text-a-underline',
        'ph:text-b-bold',
        'ph:text-bold',
        'ph:text-italic',
        'ph:toggle-left',
        'ph:toggle-right-fill',
        'ph:trash',
        'ph:upload',
        'ph:user',
        'ph:x',
        'ph:compass',
      ],
      scan: true,
      sizeLimitKb: 256,
    },
    serverBundle: {
      collections: ['ph'],
    },
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
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         api
  //         api: 'modern-compiler',
  //       },
  //     },
  //   },
  // },
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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes,
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
