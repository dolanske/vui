<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Switch from './components/Switch/Switch.vue'
import ExampleAlerts from './examples/ExampleAlerts.vue'
import ExampleBadges from './examples/ExampleBadges.vue'
import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

const isLight = ref(true)
watchEffect(() => {
  setColorTheme(isLight.value ? 'light' : 'dark')
})
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <Switch v-model="isLight" label="Light theme" />
    <ExampleBadges />
    <ExampleAlerts />
    <ExampleButtons />
  </main>
</template>
