<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { computed } from 'vue'
import { Size } from '../../shared/types'
import Spinner from '../Spinner/Spinner.vue'
import './button.scss'

type Variants = 'default' | 'danger'

interface Props {
  // Provide URL to turn button into anchor
  // href?: string
  // target?: string
  loading?: boolean
  expand?: boolean
  square?: boolean
  disabled?: boolean
  size?: Sizes
  // textAlign?: 'left' | 'right' | 'center'
  variant?: Variants
}

const {
  loading,
  disabled,
  expand,
  size = 'm',
  variant = 'default'
} = defineProps<Props>()

const actualHeight = computed(() => {
  switch (size) {
    case Size.s: return '24px'
    case Size.l: return '40px'
    case Size.m:
    default: return '32px'
  }
})

const actualPadding = computed(() => {
  switch (size) {
    case Size.s: return '5px'
    case Size.l: return '16px'
    case Size.m:
    default: return '8px'
  }
})
</script>

<template>
  <!-- <a v-if="href" :href :target v-bind="sharedBind">
    <slot />
  </a> -->

  <button
    class="vui-button"
    :class="[{ loading, expand, disabled }, `vui-button-variation-${variant}`]"
    :disabled
  >
    <Spinner size="s" />
    <div class="vui-button-slot">
      <div class="vui-button-slot-start">
        <slot name="start" />
      </div>
      <slot />
      <div class="vui-button-slot-end">
        <slot name="end" />
      </div>
    </div>
  </button>
</template>

<style scoped>
.vui-button {
  --button-height: v-bind(actualHeight);
  --button-padding: v-bind(actualPadding);
}
</style>
