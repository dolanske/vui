<script setup lang="ts">
// import ExamplePopouts from './examples/ExamplePopouts.vue'
// import ExampleTooltips from './examples/ExampleTooltips.vue'
import ExampleCalendars from './examples/ExampleCalendars.vue'
import ExampleCheckboxes from './examples/ExampleCheckboxes.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <ExampleCalendars />
      <ExampleCheckboxes />
    </div>
  </main>
</template>
