<script setup lang="ts">
import ExampleModals from './examples/ExampleModals.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'
import ExampleTables from './examples/ExampleTables.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleModals />
      <ExamplePopouts />
      <ExampleTables />
    </div>
  </main>
</template>
