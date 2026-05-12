<script setup lang="ts">
import ExampleBadges from './examples/ExampleBadges.vue'
import ExampleCarousels from './examples/ExampleCarousels.vue'
import ExampleCommands from './examples/ExampleCommands.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleBadges />
    <ExampleCommands />
    <ExampleCarousels />
  </main>
</template>
