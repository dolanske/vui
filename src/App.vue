<script setup lang="ts">
import ExampleTables from './examples/ExampleTables.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleTables />
    </div>
  </main>
</template>
