<script setup lang="ts">
import { ThemeSample } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <ThemeSample />
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
