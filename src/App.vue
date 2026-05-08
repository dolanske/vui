<script setup lang="ts">
import ExampleCarousels from './examples/ExampleCarousels.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleCarousels />
  </main>
</template>
