<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import './alert.scss'

interface Props {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  /**
   * Override the variant's default icon
   */
  icon?: string
  /**
   * Setting a title and description will use slightly different styling other
   * than slots.
   */
  title?: string
  /**
   * Use strong color
   */
  filled?: boolean
  description?: string
}

const {
  icon = 'ph:circle-light',
  variant = 'neutral',
  title,
  description,
  filled,
} = defineProps<Props>()

const actualIcon = computed(() => {
  switch (variant) {
    case 'info': return 'ph:info'
    case 'success': return 'ph:check-circle'
    case 'warning': return 'ph:warning'
    case 'danger': return 'ph:warning-diamond'
    default: return icon
  }
})
</script>

<template>
  <div class="vui-alert" :class="[{ filled }, `vui-alert-variant-${variant}`]">
    <Icon v-if="actualIcon" class="vui-alert-icon" :icon="actualIcon" />
    <div v-if="$slots.default && !title" class="vui-alert-content">
      <slot />
    </div>
    <div v-else class="vui-alert-default-content">
      <strong v-if="title">{{ title }}</strong>
      <p v-if="description">
        {{ description }}
      </p>
      <slot v-else-if="$slots.default" />
    </div>

    <slot name="end" />
  </div>
</template>
