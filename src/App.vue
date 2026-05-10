<script setup lang="ts">
import ExampleCopyClipboard from './examples/ExampleCopyClipboard.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleCopyClipboard />
    <ExamplePopouts />
  </main>
</template>
