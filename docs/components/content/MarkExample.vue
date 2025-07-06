<script setup lang="ts">
</script>

<template>
  <DocsExample>
    <template #component>
      <p>
        This is regular text with <mark>highlighted content</mark> that stands out from the rest.
      </p>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
