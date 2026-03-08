<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLayer } from '../../shared/layerManager'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const { layerIndex, openLayer, closeLayer } = useLayer()

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
  <div class="vui-backdrop" :style="{ '--layer-z': layerIndex }" @click.self="emits('close')">
    <slot />
  </div>
</template>
