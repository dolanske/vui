<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import { Size } from '../../shared/types'
import './badge.scss'

interface Props {
  variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'info' | 'accent'
  outline?: boolean
  filled?: boolean
  size?: Sizes
  circle?: boolean
}

const {
  variant = 'neutral',
  outline,
  filled,
  size = 'm',
  circle,
} = defineProps<Props>()

const s = computed(() => {
  switch (size) {
    case Size.s: return '18px'
    case Size.l: return '36px'
    case Size.m:
    default: return '26px'
  }
})

const fs = computed(() => {
  switch (size) {
    case Size.s: return 'var(--font-size-xxs)'
    case Size.l: return 'var(--font-size-m)'
    case Size.m:
    default: return 'var(--font-size-s)'
  }
})

const pi = computed(() => {
  if (circle) {
    return size === Size.l ? 'var(--space-xs)' : 'var(--space-xxs)'
  }

  switch (size) {
    case Size.s: return 'var(--space-xs)'
    case Size.l: return 'var(--space-m)'
    case Size.m:
    default: return 'var(--space-s)'
  }
})
</script>

<template>
  <div
    class="vui-badge"
    :class="[{ outline, filled, circle }, `vui-badge-variant-${variant}`, `vui-badge-size-${size}`]"
    :style="{
      '--vui-badge-height': s,
      '--vui-badge-font-size': fs,
      '--vui-badge-padding-inline': pi,
    }"
  >
    <slot />
  </div>
</template>
