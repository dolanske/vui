<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Switch from './components/Switch/Switch.vue'

import ExampleEmojis from './examples/ExampleEmojis.vue'
import { setColorTheme } from './lib/theme.ts'

const isLight = ref(false)
watchEffect(() => {
  setColorTheme(isLight.value ? 'light' : 'dark')
})

// const views = reactive([
//   { tabs: [{ path: 'Home' }, { path: 'Settings' }] },
//   [
//     { tabs: [{ path: '#fishstick' }, { path: '#hivecom' }] },
//     [
//       { tabs: [{ path: '#osu' }] },
//     ],
//   ],
// ])
</script>

<template>
  <main vaul-drawer-wrapper class="container-m py-xxxl">
    <Switch v-model="isLight" class="mb-xxl" label="Light theme" />
    <!--
    <ResizableView v-model="views">
      <template #tab="{ tab }">
        <span>Hihih {{ tab.path }}</span>
      </template>
    </ResizableView>

    <pre class="mt-l">
      {{ views }}
    </pre> -->
    <ExampleEmojis />
  </main>
</template>
