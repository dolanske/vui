<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import { Icon } from '@iconify/vue'
import { useCssVar } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'
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

// For some reason CSS variable assignemnt in scoped <style> is broken, so we
// have to go this way instead.
const avatarRef = useTemplateRef('avatar')
const avatarSize = useCssVar('--avatar-size', avatarRef)
watch(() => size, (val) => {
  avatarSize.value = (() => {
    if (typeof val == 'number') {
      return `${val}px`
    }
    switch (size) {
      case Size.s: return '28px'
      case Size.l: return '48px'
      case Size.m:
      default: return '36px'
    }
  })()
})
</script>

<template>
  <div
    ref="avatar"
    class="vui-avatar"
    :class="[`vui-avatar-size-${typeof size === 'number' ? 'm' : size}`]"
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
