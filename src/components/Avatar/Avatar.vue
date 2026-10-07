<script setup lang="ts">
import type { Sizes } from '../../lib/types'
import { IconUser } from '@iconify-prerendered/vue-ph'
import { computed, ref, watch } from 'vue'
import { formatUnitValue } from '../../lib/helpers'
import './avatar.scss'

interface Props {
  size?: Sizes | number
  url?: string
  /**
   * Text (usually initials) shown when there is no `url` or the image fails
   * to load
   */
  fallback?: string
  /**
   * Alternative text of the image. Empty by default, which marks the avatar
   * as decorative. Set it when the avatar is the only representation of a
   * person, e.g. `alt="Jane Doe"`.
   */
  alt?: string
  radius?: Sizes | 'xs' | 'pill' | number
}

const {
  // eslint-disable-next-line vue/require-valid-default-prop
  size = 'm',
  url,
  fallback,
  alt = '',
  radius = 'pill',
} = defineProps<Props>()

const imageFailed = ref(false)

// A new image gets a new chance to load
watch(() => url, () => {
  imageFailed.value = false
})

const showImage = computed(() => !!url && !imageFailed.value)

const aS = computed(() => typeof size === 'number' ? formatUnitValue(size) : undefined)
const aR = computed(() => {
  if (typeof radius === 'number')
    return formatUnitValue(radius)

  return `var(--border-radius-${radius})`
})
</script>

<template>
  <span
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
      v-else-if="showImage"
      :alt
      :src="url"
      @error="imageFailed = true"
    >
    <strong v-else-if="fallback">
      {{ fallback }}
    </strong>
    <strong v-else aria-hidden="true">
      <slot name="icon">
        <IconUser />
      </slot>
    </strong>
    <span v-if="$slots.overlay" class="vui-avatar-overlay">
      <slot name="overlay" />
    </span>
  </span>
</template>
