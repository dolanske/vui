<script setup lang="ts">
import ExampleInputs from './examples/ExampleInputs.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleInputs />
    </div>
  </main>
</template>
