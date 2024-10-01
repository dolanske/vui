<script setup lang="ts">
import { onMounted } from 'vue'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      emits('close')
    }
  })
})
</script>

<template>
  <div class="vui-backdrop" @click.self="emits('close')">
    <slot />
  </div>
</template>
