<script setup lang='ts'>
import { onBeforeUnmount, onMounted } from 'vue'

interface Props {
  /**
   * Will randomly increment but never actually reach the end
   */
  fake?: boolean

  /**
   * Show the progress number as perceetnage
   */
  label?: boolean
  /**
   *
   */
  labelPosition?: 'left' | 'right' | 'center'
}

const {
  fake,
  label,
  labelPosition = 'center',
} = defineProps<Props>()
const progress = defineModel<number>()

let interval

onMounted(() => {
  if (fake) {
    interval = setInterval(() => {
      if (Math.random() > 0.5) {}
    }, 1000)
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="vui-progress-bar">
    <div class="vui-progress-indicator" />
  </div>
</template>
