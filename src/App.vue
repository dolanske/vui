<script setup lang="ts">
import ExampleBreadcrumbs from './examples/ExampleBreadcrumbs.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleBreadcrumbs />
      <ExampleButtons />
    </div>
  </main>
</template>
