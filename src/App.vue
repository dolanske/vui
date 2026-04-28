<script setup lang="ts">
import ExampleDrawers from './examples/ExampleDrawers.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleDrawers />
    </div>
  </main>
</template>
