<script setup lang="ts">
import ExampleCommands from './examples/ExampleCommands.vue'

// import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleCommands />
      <!-- <ExampleTooltips />
      <ExamplePopouts />
      <ExampleDropdowns /> -->
    </div>
  </main>
</template>
