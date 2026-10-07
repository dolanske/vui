<script setup lang="ts">
import { ref } from 'vue'
import { useLayer } from '../../lib/layerManager'
import { useScrollLock } from '../../lib/scrollLock'
import './backdrop.scss'

const { leaving = false } = defineProps<{
  /**
   * Fades the backdrop out while the content plays its leave transition
   */
  leaving?: boolean
}>()

const emits = defineEmits<{
  close: []
}>()

const { layerIndex, layerPostition, openLayer } = useLayer({
  // Only reached when this is the top-most dismissable layer. While the
  // content is leaving, Escape belongs to whatever is underneath.
  onEscape: () => {
    if (leaving)
      return false
    emits('close')
  },
})

// Claimed during setup (instead of on mount), so that children mounting
// before the backdrop, such as an initially open popout, end up above it
openLayer()
useScrollLock(true)

defineExpose({
  layerIndex,
})

// Track whether the mousedown originated on the backdrop itself,
// so that dragging from inside content onto the backdrop doesn't
// accidentally close it.
const mouseDownOnBackdrop = ref(false)

function handleMouseDown(e: MouseEvent) {
  mouseDownOnBackdrop.value = e.target === e.currentTarget
}

function handleClick(e: MouseEvent) {
  if (e.target === e.currentTarget && mouseDownOnBackdrop.value) {
    emits('close')
  }

  mouseDownOnBackdrop.value = false
}
</script>

<template>
  <div
    class="vui-backdrop"
    :class="{ child: layerPostition > 0, leaving }"
    :style="{
      '--layer-z': layerIndex,
      '--layer-position': layerPostition,
    }"
    :data-vui-layer="layerIndex"
    @mousedown="handleMouseDown"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
