<script setup lang="ts">
const slug = useRoute().params.slug
const { data } = await useAsyncData(`components-${slug}`, () => {
  return queryCollection('docs').path(`/docs/components/${slug}`).first()
})
</script>

<template>
  <ContentRenderer :value="data!" />
</template>
