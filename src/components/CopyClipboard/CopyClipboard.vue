<script setup lang='ts'>
import type { Placement } from '../../lib/types.ts'
import { useClipboard } from '@vueuse/core'
import { computed, onMounted, onUpdated, ref, useSlots, useTemplateRef } from 'vue'
import { getFocusableElements } from '../../lib/focus.ts'
import { isNil } from '../../lib/helpers.ts'
import Popout from '../Popout/Popout.vue'
import '../Tooltip/tooltip.scss'

interface Props {
  /**
   * Text to copy
   */
  text: string
  /**
   * Whether to show a tooltip after successful copy
   */
  confirm?: string | boolean
  /**
   * How long will the copy confirmation tooltip be visible in milliseconds.
   */
  confirmTime?: number
  /**
   * Tooltip position. Default is top
   */
  confirmPlacement?: Placement
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition. This is useful when using the View Transitions API to prevent conflicts between the default animation and the view transition.
   */
  transitionName?: string | 'none'
  /**
   * Message announced to screen readers after copying
   */
  announcement?: string
}

const {
  text,
  confirm,
  confirmTime = 1500,
  confirmPlacement = 'top',
  transitionName,
  announcement = 'Copied to clipboard',
} = defineProps<Props>()

const emit = defineEmits<{
  copied: [text: string]
  error: [error: unknown]
}>()

// `legacy` falls back to `document.execCommand('copy')` where the Clipboard
// API is not available, e.g. on pages served over plain HTTP
const {
  copy: copyToClipboard,
  copied,
  isSupported,
} = useClipboard({
  copiedDuring: confirmTime,
  legacy: true,
})
const slots = useSlots()

async function copy() {
  try {
    await copyToClipboard(text)
    emit('copied', text)
  }
  catch (error) {
    emit('error', error)
  }
}

const parsedConfirm = computed(() => {
  if (isNil(confirm))
    return false
  if (confirm === '')
    return true
  else return confirm
})

onMounted(() => {
  if (!isSupported.value) {
    console.error('[CopyClipboard] Copying to the clipboard is not supported in this browser.')
  }

  if (typeof parsedConfirm.value === 'string' && slots.confirm) {
    console.warn('[CopyClipboard] You are using the \'confirm\' prop and slot. The slot will take precedence.')
  }
})

const anchorRef = useTemplateRef<HTMLElement>('anchor')

// When the slot already contains an interactive element (e.g. a Button), its
// own click / keyboard handling triggers the copy. Plain content gets button
// semantics instead, so it never ends up with nested interactive roles.
const needsOwnSemantics = ref(false)

function updateSemantics() {
  needsOwnSemantics.value = !!anchorRef.value && getFocusableElements(anchorRef.value).length === 0
}

onMounted(updateSemantics)
onUpdated(updateSemantics)

function onKeydown(event: KeyboardEvent) {
  if (!needsOwnSemantics.value)
    return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    copy()
  }
}
</script>

<template>
  <span class="vui-copy-clipboard">
    <span
      ref="anchor"
      class="vui-copy-clipboard-trigger"
      :role="needsOwnSemantics ? 'button' : undefined"
      :tabindex="needsOwnSemantics ? 0 : undefined"
      @click="copy"
      @keydown="onKeydown"
    >
      <slot :copy :copied />
    </span>
    <Popout
      :anchor="anchorRef"
      :visible="copied && (!!parsedConfirm || !!$slots.confirm)"
      :placement="confirmPlacement"
      :transition-name="transitionName"
      class="vui-tooltip"
      aria-hidden="true"
    >
      <slot name="confirm">
        <template v-if="typeof parsedConfirm === 'string'">
          {{ parsedConfirm }}
        </template>
        <p v-else>
          Copied to clipboard
        </p>
      </slot>
    </Popout>
    <!-- Always rendered, so the change of its content is announced -->
    <span class="visually-hidden" aria-live="polite">{{ copied ? announcement : '' }}</span>
  </span>
</template>
