<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Switch from './components/Switch/Switch.vue'
import ExampleAspectRatios from './examples/ExampleAspectRatios.vue'
import ExampleContextMenus from './examples/ExampleContextMenus.vue'
import { setColorTheme } from './shared/theme'

const isLight = ref(false)
watchEffect(() => {
  setColorTheme(isLight.value ? 'light' : 'dark')
})
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <Switch v-model="isLight" class="mb-xxl" label="Light theme" />
    <ExampleContextMenus />
    <ExampleAspectRatios />
  </main>
</template>
