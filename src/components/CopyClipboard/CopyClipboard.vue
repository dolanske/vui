<script setup lang='ts'>
import type { Placement } from '../../shared/types'
import { useClipboard } from '@vueuse/core'
import { computed, onMounted, useSlots, useTemplateRef } from 'vue'
import { isNil } from '../../shared/helpers'
import Popout from '../Popout/Popout.vue'
import './copy-clipboard.scss'
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
}

const {
  text,
  confirm,
  confirmTime = 1500,
  confirmPlacement = 'top',
  transitionName,
} = defineProps<Props>()

const {
  copy,
  copied,
  isSupported,
} = useClipboard({
  copiedDuring: confirmTime,
})
const slots = useSlots()

const parsedConfirm = computed(() => {
  if (isNil(confirm))
    return false
  if (confirm === '')
    return true
  else return confirm
})

onMounted(() => {
  if (!isSupported.value) {
    console.error('Clipboard API is not supported. This component will not work')
  }

  if (typeof parsedConfirm.value === 'string' && slots.confirm) {
    console.warn('[ClipBoard] You are using the \'confirm\' prop and slot. The slot will take precedence.')
  }
})

const anchorRef = useTemplateRef('anchor')
const anchorEl = computed(() => anchorRef.value)
</script>

<template>
  <div ref="anchor" class="vui-clipboard-copy-wrap" role="button" @click="copy(text)">
    <slot :copy :copied />
  </div>
  <Popout
    :anchor="anchorEl"
    :visible="copied && (!!parsedConfirm || !!$slots.confirm)"
    :placement="confirmPlacement"
    :transition-name="transitionName"
    class="vui-tooltip"
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
</template>
