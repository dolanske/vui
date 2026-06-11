<script setup lang="ts">
import { computed } from 'vue'
import './stepper.scss'

interface Props {
  variant?: 'dots'
  steps: number
}

const {
  variant = 'dots',
  steps,
} = defineProps<Props>()

const active = defineModel<number>({ default: 0 })

const activeItemIndex = computed(() => {
  return active.value < 0 ? 0 : active.value >= steps ? steps - 1 : active.value
})
</script>

<template>
  <div class="vui-stepper" :class="[`vui-stepper-${variant}`]">
    <div v-for="key in steps" :key class="vui-stepper-item" :class="{ active: activeItemIndex === key - 1 }" />
  </div>
</template>
