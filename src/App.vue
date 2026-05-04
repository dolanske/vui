<script setup lang="ts">
import ExampleIndicators from './examples/ExampleIndicators.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleIndicators />
  </main>
</template>
