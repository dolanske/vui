import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsContentRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), 'content/docs')
const appBaseUrl = '/vui/'

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
  runtimeConfig: {
    public: {
      siteName: 'VUI',
      siteDescription: 'Homegrown Vue component library and design system documentation.',
      siteUrl: 'https://dolanske.github.io/vui/',
    },
  },
  app: {
    baseURL: appBaseUrl,
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'VUI Docs',
      titleTemplate: '%s | VUI',
      meta: [
        { name: 'description', content: 'Homegrown Vue component library and design system documentation.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'application-name', content: 'VUI Docs' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'VUI' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${appBaseUrl}favicon.ico` },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${appBaseUrl}favicon-32x32.png` },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${appBaseUrl}favicon-16x16.png` },
        { rel: 'apple-touch-icon', sizes: '180x180', href: `${appBaseUrl}apple-touch-icon.png` },
        { rel: 'manifest', href: `${appBaseUrl}site.webmanifest` },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: [
    '@dolanske/vui/style',
    '~/assets/index.scss',
  ],
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
