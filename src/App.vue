<script setup lang="ts">
import ExampleCommands from './examples/ExampleCommands.vue'
import ExampleModals from './examples/ExampleModals.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleModals />
      <ExampleCommands />
    </div>
  </main>
</template>
