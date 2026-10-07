<script setup lang="ts">
import type { Sizes } from '../../lib/types'
import { computed } from 'vue'
import './indicator.scss'

interface Props {
  variant?: 'alert' | 'online' | 'offline' | 'away'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  size?: Sizes
  outline?: boolean
  ripple?: boolean
  /**
   * Text announced to screen readers, e.g. "Online". The dot itself only
   * conveys the status through color.
   */
  label?: string
}

const props = defineProps<Props>()

const color = computed(() => {
  switch (props.variant) {
    case 'alert':
      return 'var(--color-text-red)'
    case 'online':
      return 'var(--color-text-green)'
    case 'offline':
      return 'var(--color-text-lighter)'
    case 'away':
      return 'var(--color-text-yellow)'
    default:
      return 'var(--color-text-lighter)'
  }
})

const size = computed(() => {
  switch (props.size) {
    case 's':
      return '8px'
    case 'l':
      return '16px'
    case 'm':
    default:
      return '12px'
  }
})
</script>

<template>
  <div
    class="vui-indicator"
    :class="[props.position ? `position-${props.position}` : undefined, { outline: props.outline, ripple: props.ripple }]"
    :style="{
      '--vui-indicator-color': color,
      '--vui-indicator-size': size,
    }"
  >
    <slot />
    <span v-if="props.label" class="visually-hidden">{{ props.label }}</span>
  </div>
</template>
