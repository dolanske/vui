<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Marquee from './components/Marquee/Marquee.vue'
import Switch from './components/Switch/Switch.vue'
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
  <main vaul-drawer-wrapper class="container-l py-xxxl">
    <Switch v-model="isLight" class="mb-xxl" label="Light theme" />
    <Marquee direction="left" :speed="70">
      <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
        Scrolling Left - Fast and Seamless -
      </span>
    </Marquee>

    <Marquee direction="right" :speed="40">
      <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
        Scrolling Right - Smooth and Infinite -
      </span>
    </Marquee>

    <Marquee direction="left" :speed="30" stagger>
      <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
        Slow Left Scroll - Staggered -
      </span>
    </Marquee>
  </main>
</template>
