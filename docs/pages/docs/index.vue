<script setup lang="ts">
const { data: page } = await useAsyncData('my-markdown-page', () =>
  queryCollection('docs').path('/docs/guide').first())
</script>

<template>
  <ContentRenderer :value="page!" />
</template>
