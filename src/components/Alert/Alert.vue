<script setup lang="ts">
import { IconChatTeardrop, IconCheckCircle, IconInfo, IconNoteBlank, IconSparkle, IconWarning, IconWarningDiamond, IconX } from '@iconify-prerendered/vue-ph'
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import './alert.scss'

interface Props {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent' | 'note'
  /**
   * Setting a title and description will use slightly different styling other
   * than slots.
   */
  title?: string
  /**
   * Use strong color
   */
  filled?: boolean
  /**
   * Fill with a strong saturated color
   */
  filledStrong?: boolean
  /**
   * Additional text rendered under the title
   */
  description?: string
  /**
   * Vertical alignment of the icon
   */
  iconAlign?: 'start' | 'center' | 'end'
  /**
   * Hides the icon completely. If you hide the icon, make sure you're using
   * `filled` variant, otherwise the alert will be missing the relevant
   * color-coding.
   */
  hideIcon?: boolean
  /**
   * Shows a close button which emits `dismiss`
   */
  dismissible?: boolean
  /**
   * Accessible label of the close button
   */
  dismissLabel?: string
  /**
   * How assistive technology announces the alert when it appears. Defaults to
   * `alert` (interrupting) for warnings and errors and `status` (polite)
   * otherwise. Use `none` for static content that is part of the page.
   */
  live?: 'alert' | 'status' | 'none'
}

const {
  variant = 'neutral',
  title,
  description,
  filled,
  filledStrong,
  iconAlign = 'center',
  hideIcon = false,
  dismissible = false,
  dismissLabel = 'Dismiss',
  live,
} = defineProps<Props>()

const emit = defineEmits<{
  dismiss: []
}>()

const role = computed(() => {
  const value = live ?? (variant === 'danger' || variant === 'warning' ? 'alert' : 'status')
  return value === 'none' ? undefined : value
})
</script>

<template>
  <div
    class="vui-alert"
    :class="[{ filled, 'filled-strong': filledStrong }, `vui-alert-variant-${variant}`]"
    :style="{ alignItems: iconAlign }"
    :role
  >
    <!-- Icons are decorative, the meaning is conveyed by the content -->
    <span v-if="$slots.icon || !hideIcon" class="vui-alert-icon-wrap" aria-hidden="true">
      <slot name="icon">
        <IconInfo v-if="variant === 'info'" class="vui-alert-icon" />
        <IconCheckCircle v-else-if="variant === 'success'" class="vui-alert-icon" />
        <IconWarning v-else-if="variant === 'warning'" class="vui-alert-icon" />
        <IconWarningDiamond v-else-if="variant === 'danger'" class="vui-alert-icon" />
        <IconSparkle v-else-if="variant === 'accent'" class="vui-alert-icon" />
        <IconNoteBlank v-else-if="variant === 'note'" class="vui-alert-icon" />
        <IconChatTeardrop v-else class="vui-alert-icon" />
      </slot>
    </span>
    <div v-if="$slots.default && !title && !description" class="vui-alert-content">
      <slot />
    </div>
    <!-- Title, description and slot content can all be combined -->
    <div v-else class="vui-alert-default-content">
      <strong v-if="title">{{ title }}</strong>
      <p v-if="description">
        {{ description }}
      </p>
      <slot />
    </div>
    <slot name="end" />
    <Button
      v-if="dismissible"
      class="vui-alert-dismiss"
      plain
      square
      size="s"
      :aria-label="dismissLabel"
      @click="emit('dismiss')"
    >
      <IconX />
    </Button>
  </div>
</template>
