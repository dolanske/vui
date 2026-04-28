<script setup lang="ts">
import ExampleDropdowns from './examples/ExampleDropdowns.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleDropdowns />
    </div>
  </main>
</template>
