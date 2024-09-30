<script setup lang="ts">
import { Teleport } from 'vue'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div class="vui-backdrop" @click.self="emits('close')">
      <slot />
    </div>
  </Teleport>
</template>
