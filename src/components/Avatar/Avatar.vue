<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { IconUser } from '@iconify-prerendered/vue-ph'
import { computed, ref } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import './avatar.scss'

interface Props {
  size?: Sizes | number
  url?: string
  fallback?: string
  icon?: string
  alt?: string
  radius?: Sizes | 'xs' | 'pill' | number
}

const {
  // eslint-disable-next-line vue/require-valid-default-prop
  size = 'm',
  url,
  fallback,
  alt = 'avatar',
  radius = 'pill',
} = defineProps<Props>()

const showFallback = ref(false)
const PILL_RADIUS_THRESHOLD = 164

const aS = computed(() => typeof size === 'number' ? formatUnitValue(size) : undefined)
const aR = computed(() => {
  if (typeof radius === 'number')
    return radius > PILL_RADIUS_THRESHOLD ? formatUnitValue(radius) : 'var(--border-radius-pill)'

  return `var(--border-radius-${radius})`
})
</script>

<template>
  <div
    class="vui-avatar"
    :class="[`vui-avatar-size-${typeof size === 'number' ? 'l' : size}`]"
    :style="{
      '--vui-avatar-size': aS,
      '--vui-avatar-border-radius': aR,
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
