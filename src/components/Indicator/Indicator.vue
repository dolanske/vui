<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'

// Simple indicator dot which can be attached to a button, badge, DropdownItem, Avatar

interface Props {
  variant?: 'alert' | 'online' | 'offline' | 'away'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  size?: Sizes
  outline?: boolean
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
      return 'var(--color-text-warning)'
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
    :class="`vui-position-${props.position}`"
    :style="{
      '--vui-indicator-color': color,
      '--vui-indicator-size': size,
    }"
  />
</template>
