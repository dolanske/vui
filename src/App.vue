<script setup lang="ts">
import ExampleModals from './examples/ExampleModals.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleModals />
  </main>
</template>
