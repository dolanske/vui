<script setup lang="ts">
import { Teleport, useAttrs } from 'vue'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="vui-backdrop" @click.self="emits('close')">
    <slot />
  </div>
</template>
