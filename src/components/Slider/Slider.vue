<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
import './slider.scss'

// TODO: change line to be a div
// TODO:
const handle = useTemplateRef('handleRef')

const isDragging = ref(false)
const startX = ref(0)
const position = ref(0)

// We started dragging. Save the starting mouse position
useEventListener(window, 'mousedown', ({ target, clientX }) => {
  if (target === handle.value) {
    console.log(`Start drag at ${clientX}`)
    startX.value = clientX
    isDragging.value = true
  }
})

useEventListener(window, 'mouseup', () => {
  isDragging.value = false
})

useEventListener(window, 'mousemove', ({ clientX }) => {
  if (startX.value !== 0) {
    // TODO: this hs9ould be the line, not hte handle
    const sliderWidth = handle.value?.getBoundingClientRect().width ?? 0

    position.value = Math.min(Math.max(clientX - startX.value, 0), sliderWidth)

    console.log(`Dragging at ${position.value}`)
  }
})
</script>

<template>
  <div class="vui-slider" draggable="false">
    <div
      ref="handleRef"
      class="vui-slider-handle"
      draggable
      :style="{ left: `${position}px` }"
    />
  </div>
</template>
