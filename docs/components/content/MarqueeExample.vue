<script setup lang="ts">
import { Flex, Marquee } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <Flex column gap="m">
        <Marquee direction="left" :speed="70">
          <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
            Scrolling Left — Fast and Seamless —
          </span>
        </Marquee>

        <Marquee direction="right" :speed="40">
          <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
            Scrolling Right — Smooth and Infinite —
          </span>
        </Marquee>

        <Marquee direction="left" :speed="20">
          <span style="font-size: 65px; line-height: 65px; font-weight: 700; white-space: nowrap; padding-right: 2rem;">
            Slow Left Scroll — Relaxed Pace — Easy Reading —
          </span>
        </Marquee>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
