<script setup lang="ts">
const slug = useRoute().params.slug
const { data } = await useAsyncData(`components-${slug}`, () => {
  return queryCollection('docs').path(`/docs/guide`).first()
})
</script>

<template>
  <ContentRenderer :value="data!" />
</template>
