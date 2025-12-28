<script setup lang='ts'>
import type { Placement } from '@floating-ui/vue'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { IconCheckBold } from '@iconify-prerendered/vue-ph'
import { useClipboard } from '@vueuse/core'
import { computed, onMounted, useSlots, useTemplateRef } from 'vue'
import { getPlacementAnimationName, isNil } from '../../shared/helpers'
import Flex from '../Flex/Flex.vue'
import './copy-clipboard.scss'

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
   * Setting the value to `none` will not apply any transition
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
const tooltipRef = useTemplateRef('tooltip')

const { floatingStyles } = useFloating(anchorRef, tooltipRef, {
  whileElementsMounted: autoUpdate,
  transform: false,
  strategy: 'fixed',
  placement: confirmPlacement,
  middleware: [
    offset(8),
    shift(),
    flip(),
  ],
})

const transition = computed(() => {
  if (transitionName === 'none')
    return undefined
  else if (transitionName)
    return transitionName
  return getPlacementAnimationName(confirmPlacement)
})
</script>

<template>
  <div ref="anchor" class="vui-clipboard-copy-wrap" role="button" @click="copy(text)">
    <slot :copy :copied />
  </div>

  <Transition :name="transition" mode="in-out">
    <div v-if="copied && (!!parsedConfirm || $slots.confirm)" ref="tooltip" class="vui-clipboard-tooltip" :style="floatingStyles">
      <slot name="confirm">
        <template v-if="typeof parsedConfirm === 'string'">
          {{ parsedConfirm }}
        </template>
        <Flex v-else y-center x-center gap="xs">
          <IconCheckBold />
          Copied to clipboard
        </Flex>
      </slot>
    </div>
  </Transition>
</template>
