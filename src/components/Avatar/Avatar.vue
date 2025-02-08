<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import { Size } from '../../shared/types'
import './avatar.scss'

interface Props {
  size?: Sizes | number
  url?: string
  fallback?: string
  icon?: string
  alt?: string
}

const {
  size = Size.m,
  url,
  fallback,
  alt = 'avatar',
} = defineProps<Props>()

const showFallback = ref(false)
</script>

<template>
  <div
    class="vui-avatar"
    :class="[`vui-avatar-size-${typeof size === 'number' ? 'l' : size}`]"
    :style="{
      ...(typeof size === 'number' && {
        '--avatar-size': formatUnitValue(size),
      }),
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
      <Icon v-else :icon="icon ?? 'ph:user'" />
    </strong>
  </div>
</template>
