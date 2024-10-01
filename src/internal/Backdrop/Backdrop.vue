<script setup lang="ts">
import { Teleport, useAttrs } from 'vue'
import './backdrop.scss'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const attrs = useAttrs()
</script>

<template>
  <Teleport to="body">
    <div class="vui-backdrop" v-bind="attrs" @click.self="emits('close')">
      <slot />
    </div>
  </Teleport>
</template>
