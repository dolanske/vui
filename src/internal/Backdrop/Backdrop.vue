<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useLayer } from '../../shared/layerManager'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const { layerIndex, openLayer, closeLayer } = useLayer()

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
  if (e.key === 'Escape') {
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
  <div class="vui-backdrop" :style="{ '--layer-z': layerIndex }" @mousedown="handleMouseDown" @click="handleClick">
    <slot />
  </div>
</template>
