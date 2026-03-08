<script setup lang="ts">
import ExampleInputs from './examples/ExampleInputs.vue'
import ExampleModals from './examples/ExampleModals.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleModals />
      <ExamplePopouts />
      <ExampleInputs />
    </div>
  </main>
</template>
