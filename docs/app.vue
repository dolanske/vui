<script setup lang="ts">
import { Toasts } from '@dolanske/vui'

const route = useRoute()
const isDocumentation = computed(() => route.fullPath.includes('/docs'))
</script>

<template>
  <NuxtLayout :name="isDocumentation ? 'documentation' : 'default'">
    <NuxtPage />
  </NuxtLayout>
  <NuxtLoadingIndicator />
  <Toasts />
</template>
