<script setup lang="ts">
import ExampleCarousels from './examples/ExampleCarousels.vue'
import ExampleOverflows from './examples/ExampleOverflows.vue'
import ExampleSheets from './examples/ExampleSheets.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleCarousels />
    <ExampleOverflows />
    <ExampleSheets />
  </main>
</template>
