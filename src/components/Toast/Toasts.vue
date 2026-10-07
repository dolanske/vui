<script setup lang="ts">
import type { Placement } from '../../lib/types.ts'
import type { Toast } from './toast'
import { IconCheckCircle, IconInfo, IconWarning, IconWarningDiamond, IconX } from '@iconify-prerendered/vue-ph'
import { computed, onUnmounted, watch } from 'vue'
import Button from '../Button/Button.vue'
import { pauseToasts, removeToast, resumeToasts, toasts } from './toast'
import './toast.scss'

interface Props {
  placement?: Placement
  /**
   * Maximum amount of toasts shown at once. Older toasts are dismissed.
   */
  max?: number
  /**
   * Accessible name of the notifications region
   */
  label?: string
  /**
   * Accessible label of the dismiss buttons
   */
  dismissLabel?: string
}

const {
  placement = 'bottom-end',
  max = 5,
  label = 'Notifications',
  dismissLabel = 'Dismiss',
} = defineProps<Props>()

// Newest toasts are kept when the stack overflows, older ones are dismissed
const visibleToasts = computed(() => [...toasts.value.values()].slice(-max))

watch(() => toasts.value.size, (size) => {
  if (size <= max)
    return
  for (const toast of [...toasts.value.values()].slice(0, size - max))
    removeToast(toast.id)
}, { immediate: true })

function runAction(toast: Toast) {
  toast.action?.handler(toast.id)
  if (!toast.action?.keepOpen)
    removeToast(toast.id)
}

const icons = {
  info: IconInfo,
  success: IconCheckCircle,
  warning: IconWarning,
  danger: IconWarningDiamond,
} as const

// Timers resume if the component unmounts while hovered
onUnmounted(resumeToasts)
</script>

<template>
  <Teleport to="body">
    <!-- The region is always rendered, so screen readers announce toasts added later -->
    <section
      class="vui-toast-wrapper"
      :class="placement"
      :aria-label="label"
      @mouseenter="pauseToasts"
      @mouseleave="resumeToasts"
      @focusin="pauseToasts"
      @focusout="resumeToasts"
    >
      <TransitionGroup
        name="toast"
        tag="ul"
        class="vui-toast-list"
        aria-live="polite"
        aria-relevant="additions"
      >
        <li
          v-for="toast in visibleToasts"
          :key="toast.id"
          class="vui-toast-item"
          :class="[`vui-toast-variant-${toast.variant}`, { 'vui-toast-custom': !!toast.body }]"
          :role="toast.variant === 'danger' ? 'alert' : 'status'"
        >
          <!-- Custom bodies are wrapped in the list item, keeping the markup valid -->
          <Component
            :is="toast.body"
            v-if="toast.body"
            v-bind="{ data: toast.bodyProps, toastId: toast.id }"
          />
          <template v-else>
            <component :is="icons[toast.variant as keyof typeof icons]" v-if="toast.variant in icons" class="vui-toast-icon" aria-hidden="true" />
            <div class="vui-toast-item-content">
              <strong>{{ toast.title }}</strong>
              <p v-if="toast.description">
                {{ toast.description }}
              </p>
            </div>
            <Button v-if="toast.action" size="s" @click="runAction(toast)">
              {{ toast.action.label }}
            </Button>
          </template>
          <Button
            v-if="toast.dismissible"
            class="vui-toast-dismiss"
            size="s"
            plain
            square
            :aria-label="dismissLabel"
            @click="removeToast(toast.id)"
          >
            <IconX />
          </Button>
        </li>
      </TransitionGroup>
    </section>
  </Teleport>
</template>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: var(--transition);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-24px) scale(0.95);
}

.toast-leave-active {
  position: absolute;
}
</style>
