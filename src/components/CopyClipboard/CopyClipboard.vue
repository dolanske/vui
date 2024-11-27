<script setup lang='ts'>
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { onMounted, useSlots, useTemplateRef } from 'vue'
import Flex from '../Flex/Flex.vue'
import './copy-clipboard.scss'

interface Props {
  /**
   * Text to copy
   */
  text: string
  /**
   * Wether to show a tooltip after successful copy
   */
  confirm?: string | boolean
  /**
   * How long will the copy confirmation tooltip be visible in milliseconds.
   */
  confirmTime?: number
}

const {
  text,
  confirm,
  confirmTime,
} = defineProps<Props>()

const {
  copy,
  copied,
  isSupported,
} = useClipboard({
  copiedDuring: confirmTime,
})
const slots = useSlots()

onMounted(() => {
  if (!isSupported.value) {
    console.error('Clipboard API is not supported. This component will not work')
  }

  if (confirm && slots.confirm) {
    console.warn('You are using the \'confirm\' prop and slot. The slot will take precedence.')
  }
})

const anchorRef = useTemplateRef('anchor')
const tooltipRef = useTemplateRef('tooltip')

const { floatingStyles } = useFloating(anchorRef, tooltipRef, {
  whileElementsMounted: autoUpdate,
  transform: false,
  placement: 'top',
  middleware: [
    offset(8),
    shift(),
    flip(),
  ],
})
</script>

<template>
  <div ref="anchor" class="vui-clipboard-copy-wrap" role="button" @click="copy(text)">
    <slot :copy :copied />
  </div>

  <Transition name="fade-up" mode="in-out">
    <div v-if="copied && (confirm || $slots.confirm)" ref="tooltip" class="vui-clipboard-tooltip" :style="floatingStyles">
      <slot name="confirm">
        <template v-if="confirm">
          {{ confirm }}
        </template>
        <Flex v-else align-center justify-center>
          <Icon width="16" height="16" icon="ph:check-bold" />
          Copied to clipboard
        </Flex>
      </slot>
    </div>
  </Transition>
</template>
