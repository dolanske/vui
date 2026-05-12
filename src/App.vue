<script setup lang="ts">
import ExampleAlerts from './examples/ExampleAlerts.vue'
import ExampleBadges from './examples/ExampleBadges.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleBadges />
    <ExampleAlerts />
    <ExampleButtons />
  </main>
</template>
