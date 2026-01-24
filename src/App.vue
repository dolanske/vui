<script setup lang="ts">
import ExampleBreadcrumbs from './examples/ExampleBreadcrumbs.vue'
import ExampleCommands from './examples/ExampleCommands.vue'
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
      <ExampleBreadcrumbs />
      <ExampleCommands />
    </div>
  </main>
</template>
