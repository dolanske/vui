<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Histogram from './components/Charts/Histogram.vue'
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

const data = ref([10, 20, 30, 15, 25])
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

    <Histogram
      :data
      @click="console.log('clicked full')"
      @cell-click="(index) => console.log('clicked index ', index)"
    >
      <template #tooltip="{ value }">
        <p>Count: {{ value }}</p>
      </template>
    </Histogram>
  </main>
</template>
