<script setup lang="ts">
// TODO: I guess i will not be able to do this with the current setup. Try to make top-level page not markdown instead
const { data: page } = await useAsyncData('my-markdown-page', () =>
  queryCollection('docs').path('/docs/guide.md').first())
</script>

<template>
  <ContentRenderer :value="page!" />
</template>
