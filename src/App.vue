<script setup lang="ts">
import ExampleModals from './examples/ExampleModals.vue'
import ExampleSheets from './examples/ExampleSheets.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleModals />
      <ExampleSheets />
    </div>
  </main>
</template>
