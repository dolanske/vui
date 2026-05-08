<script setup lang="ts">
import ExampleResizeable from './examples/ExampleResizeable.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <ExampleResizeable />
  </main>
</template>
