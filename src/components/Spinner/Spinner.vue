<script setup lang="ts">
import { computed } from 'vue'
import './spinner.scss'

interface Props {
  size?: 's' | 'm' | 'l'
}

const {
  size = 's',
} = defineProps<Props>()

const actualSize = computed(() => {
  if (size === 's')
    return '16px'
  else if (size === 'm')
    return '26px'
  else return '38px'
})

const actualBorderWidth = computed(() => {
  if (size === 's')
    return '3px'
  else if (size === 'm')
    return '4px'
  else return '5px'
})
</script>

<template>
  <div :class="{ size }" class="vui-spinner" />
</template>

<style lang="scss">
.vui-spinner {
  width: v-bind(actualSize);
  height: v-bind(actualSize);
  border-width: v-bind(actualBorderWidth);
}
</style>
