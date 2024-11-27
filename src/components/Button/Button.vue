<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { Size } from '../../shared/types'
import Spinner from '../Spinner/Spinner.vue'
import './button.scss'

export type Variants = 'default' | 'danger' | 'success' | 'link' | 'blue' | 'accent'

interface Props {
  // Provide URL to turn button into anchor
  // href?: string
  // target?: string
  loading?: boolean
  expand?: boolean
  square?: boolean
  dashed?: boolean
  disabled?: boolean
  size?: Sizes
  /**
   * Sets the hover styling property
   */
  active?: boolean
  /**
   * No styling applied to the button unless hovered
   */
  plain?: boolean
  variant?: Variants
  /**
   * The children will be set to an icon and the icon will become a square
   */
  icon?: string
}

const {
  loading,
  disabled,
  expand,
  size = 'm',
  variant = 'default',
  icon,
  dashed,
} = defineProps<Props>()

const height = computed(() => {
  switch (size) {
    case Size.s: return '24px'
    case Size.l: return '40px'
    case Size.m:
    default: return '34px'
  }
})

const padding = computed(() => {
  switch (size) {
    case Size.s: return '5px'
    case Size.l: return '16px'
    case Size.m:
    default: return '8px'
  }
})
</script>

<template>
  <button
    class="vui-button"
    :class="[{ loading, expand, disabled, plain, active, icon, square, dashed }, `vui-button-variant-${variant}`]"
    :disabled
    :style="{
      '--button-height': height,
      '--button-padding': padding,
    }"
  >
    <Spinner size="s" />
    <div class="vui-button-slot">
      <div class="vui-button-slot-start">
        <slot name="start" />
      </div>
      <Icon v-if="icon" :icon="icon" />
      <slot v-else />
      <div class="vui-button-slot-end">
        <slot name="end" />
      </div>
    </div>
  </button>
</template>
