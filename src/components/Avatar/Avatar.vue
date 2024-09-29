<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import './avatar.scss'

interface Props {
  size: Sizes
  url?: string
  fallback?: string
}

const {
  size = 'm',
  url,
  fallback,
} = defineProps<Props>()

const showFallback = ref(false)
</script>

<template>
  <div
    class="vui-avatar"
    :class="[`vui-avatar-size-${size}`]"
  >
    <img v-if="url && !showFallback" :src="url" @error="showFallback = true">
    <strong v-else>
      <template v-if="showFallback">
        {{ fallback }}
      </template>
      <Icon v-else icon="ph:user" />
    </strong>
  </div>
</template>
