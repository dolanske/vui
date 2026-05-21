<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Color from './components/Input/Color.vue'
// import ResizableView from './components/ResizableView/ResizableView.vue'
import Switch from './components/Switch/Switch.vue'
import { setColorTheme } from './shared/theme'

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

const color = ref()
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

    <Color v-model.rgb="color" />

    {{ color }}
  </main>
</template>
