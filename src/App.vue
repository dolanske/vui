<script setup lang="ts">
import ExampleCheckboxes from './examples/ExampleCheckboxes.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('light')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleCheckboxes />
    </div>
  </main>
</template>
