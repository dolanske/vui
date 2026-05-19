<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { isTopLayer, useLayer } from '../../shared/layerManager'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const { layerIndex, layerPostition, openLayer, closeLayer } = useLayer()

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

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isTopLayer(layerIndex.value)) {
    emits('close')
  }
}

onMounted(() => {
  openLayer()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  closeLayer()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="vui-backdrop"
    :class="{ child: layerPostition > 0 }"
    :style="{
      '--layer-z': layerIndex,
      '--layer-position': layerPostition,
    }"
    @mousedown="handleMouseDown"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
