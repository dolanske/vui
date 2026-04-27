<script setup lang="ts">
import { Toasts } from '@dolanske/vui'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const siteName = runtimeConfig.public.siteName || 'VUI'
const siteDescription = runtimeConfig.public.siteDescription || 'Homegrown Vue component library and design system documentation.'
const siteUrl = runtimeConfig.public.siteUrl || 'https://dolanske.github.io/vui/'
const appBaseUrl = runtimeConfig.app.baseURL || '/'

function toTitleCase(segment: string) {
  return segment
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const routeLabel = computed(() => {
  if (route.path === '/')
    return 'Docs'

  const cleanedPath = route.path
    .replace(/^\//, '')
    .replace(/^docs\/?/, '')
    .replace(/\/$/, '')

  if (!cleanedPath)
    return 'Docs'

  return cleanedPath
    .split('/')
    .map(toTitleCase)
    .join(' / ')
})

const pageTitle = computed(() => {
  if (route.path === '/')
    return 'Home'

  return routeLabel.value
})

const pageDescription = computed(() => {
  if (route.path === '/')
    return siteDescription

  return `${routeLabel.value} documentation for ${siteName}.`
})

const canonicalUrl = computed(() => {
  const normalizedPath = route.path.replace(/^\/+/, '')
  const joinedPath = `${appBaseUrl.replace(/\/$/, '')}/${normalizedPath}`.replace(/\/+/g, '/')
  return new URL(joinedPath, siteUrl).toString()
})

const socialImageUrl = computed(() => new URL('og.jpg', siteUrl).toString())

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogType: 'website',
  ogSiteName: siteName,
  ogTitle: () => `${pageTitle.value} | ${siteName}`,
  ogDescription: () => pageDescription.value,
  ogUrl: () => canonicalUrl.value,
  ogImage: () => socialImageUrl.value,
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${pageTitle.value} | ${siteName}`,
  twitterDescription: () => pageDescription.value,
  twitterImage: () => socialImageUrl.value,
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => canonicalUrl.value,
    },
  ],
})

const isDocumentation = computed(() => route.fullPath.includes('/docs'))
</script>

<template>
  <NuxtLayout :name="isDocumentation ? 'documentation' : 'default'">
    <NuxtPage />
  </NuxtLayout>
  <NuxtLoadingIndicator />
  <Toasts />
</template>
