<script setup lang="ts">
import { IconChatTeardrop, IconCheckCircle, IconInfo, IconWarning, IconWarningDiamond } from '@iconify-prerendered/vue-ph'
import './alert.scss'

interface Props {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
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
  variant = 'neutral',
  title,
  description,
  filled,
} = defineProps<Props>()
</script>

<template>
  <div class="vui-alert" :class="[{ filled }, `vui-alert-variant-${variant}`]">
    <slot name="icon">
      <IconInfo v-if="variant === 'info'" class="vui-alert-icon" />
      <IconCheckCircle v-else-if="variant === 'success'" class="vui-alert-icon" />
      <IconWarning v-else-if="variant === 'warning'" class="vui-alert-icon" />
      <IconWarningDiamond v-else-if="variant === 'danger'" class="vui-alert-icon" />
      <IconChatTeardrop v-else class="vui-alert-icon" />
    </slot>
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
