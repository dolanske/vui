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
}

const {
  size = Size.m,
  url,
  fallback,
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
    <img v-if="url && !showFallback" :src="url" @error="showFallback = true">
    <strong v-else>
      <template v-if="showFallback">
        {{ fallback }}
      </template>
      <Icon v-else :icon="icon ?? 'ph:user'" />
    </strong>
  </div>
</template>
