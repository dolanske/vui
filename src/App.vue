<script setup lang="ts">
import ExampleAccordions from './examples/ExampleAccordions.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleAccordions />
    </div>
  </main>
</template>
