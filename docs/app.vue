<script setup lang="ts">
const route = useRoute()
const isDocumentation = computed(() => route.fullPath.includes('/docs'))
</script>

<template>
  <NuxtLayout :name="isDocumentation ? 'documentation' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>
