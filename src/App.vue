<script setup lang="ts">
import ExampleTables from './examples/ExampleTables.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleTables />
  </main>
</template>
