<script setup lang="ts">
import ExampleCards from './examples/ExampleCards.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleCards />
    </div>
  </main>
</template>
