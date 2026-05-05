<script setup lang="ts">
import ExampleBadges from './examples/ExampleBadges.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleBadges />
  </main>
</template>
