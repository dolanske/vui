<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { IconUser } from '@iconify-prerendered/vue-ph'
import { computed, ref } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import { Size } from '../../shared/types'
import './avatar.scss'

interface Props {
  size?: Sizes | number
  url?: string
  fallback?: string
  icon?: string
  alt?: string
  radius?: Sizes | 'xs' | number
}

const {
  size = Size.m,
  url,
  fallback,
  alt = 'avatar',
  radius = 999,
} = defineProps<Props>()

const showFallback = ref(false)

const aR = computed(() => {
  if (typeof radius === 'number')
    return radius

  return `var(--border-radius-${radius})`
})
</script>

<template>
  <div
    class="vui-avatar"
    :class="[`vui-avatar-size-${typeof size === 'number' ? 'l' : size}`]"
    :style="{
      ...(typeof size === 'number' && {
        '--avatar-size': formatUnitValue(size),
      }),
      borderRadius: aR,
    }"
  >
    <span v-if="$slots.default">
      <slot />
    </span>
    <img
      v-else-if="url && !showFallback"
      :alt
      :src="url"
      @error="showFallback = true"
    >
    <strong v-else>
      <template v-if="showFallback">
        {{ fallback }}
      </template>
      <slot v-else name="icon">
        <IconUser />
      </slot>
    </strong>
  </div>
</template>
