<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Switch from './components/Switch/Switch.vue'
import ExampleContextMenus from './examples/ExampleContextMenus.vue'

import ExampleCopyClipboard from './examples/ExampleCopyClipboard.vue'
import ExampleDropdowns from './examples/ExampleDropdowns.vue'
import ExampleInputs from './examples/ExampleInputs.vue'
import ExampleMenubar from './examples/ExampleMenubar.vue'
import ExampleModals from './examples/ExampleModals.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'
import ExampleTooltips from './examples/ExampleTooltips.vue'
import { setColorTheme } from './shared/theme'

const isLight = ref(false)
watchEffect(() => {
  setColorTheme(isLight.value ? 'light' : 'dark')
})
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <Switch v-model="isLight" class="mb-xxl" label="Light theme" />
    <ExampleDropdowns />
    <ExampleTooltips />
    <ExamplePopouts />
    <ExampleContextMenus />
    <ExampleMenubar />
    <ExampleInputs />
    <ExampleCopyClipboard />
    <ExampleModals />
  </main>
</template>
