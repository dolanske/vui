<script setup lang="ts">
const slug = useRoute().params.slug
const { data } = await useAsyncData(`library-${slug}`, () => {
  return queryCollection('docs').path(`/docs/library/${slug}`).first()
})
</script>

<template>
  <ContentRenderer :value="data!" />
</template>
