<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import { isNil } from '../../shared/helpers'
import { Size } from '../../shared/types'
import Spinner from '../Spinner/Spinner.vue'
import './button.scss'

export type Variants = 'fill' | 'danger' | 'success' | 'link' | 'accent' | 'gray'

interface Props {
  // Provide URL to turn button into anchor
  href?: string
  target?: string

  // State props
  loading?: boolean

  size?: Sizes
  expand?: boolean
  square?: boolean
  // icon?: string

  variant?: Variants
  outline?: boolean
  // dashed?: boolean
  // outlineDashed?: boolean
  disabled?: boolean
  plain?: boolean
}

const {
  loading,
  disabled,
  expand,
  size = 'm',
  variant = 'gray',
  href,
  target = '_blank',
  // dashed,
} = defineProps<Props>()

const height = computed(() => {
  switch (size) {
    case Size.s: return '28px'
    case Size.l: return '42px'
    case Size.m:
    default: return 'var(--interactive-el-height)'
  }
})

const padding = computed(() => {
  switch (size) {
    case Size.s: return '4px'
    case Size.l: return '18px'
    case Size.m:
    default: return '8px'
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="vui-button"
    :class="[{ loading, expand, disabled, plain, square, outline }, `vui-button-variant-${variant}`, `vui-button-size-${size}`]"
    :disabled
    role="button"
    :style="{
      '--button-height': height,
      '--button-padding': padding,
    }"
    v-bind="{
      ...(target && { target }),
      ...(href && { href }),
    }"
  >
    <Spinner v-if="!isNil(loading)" size="s" />
    <div class="vui-button-slot">
      <div v-if="$slots.start" class="vui-button-slot-start">
        <slot name="start" />
      </div>
      <slot />
      <div v-if="$slots.end" class="vui-button-slot-end">
        <slot name="end" />
      </div>
    </div>
  </component>
</template>
