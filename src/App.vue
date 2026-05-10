<script setup lang="ts">
import ExampleAlerts from './examples/ExampleAlerts.vue'
import ExampleBadges from './examples/ExampleBadges.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import ExamplePalette from './examples/ExamplePalette.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExamplePalette />
    <ExampleButtons />
    <ExampleBadges />
    <ExampleAlerts />
  </main>
</template>
