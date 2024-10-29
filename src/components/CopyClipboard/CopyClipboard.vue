<script setup lang='ts'>
import { arrow, autoPlacement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { onBeforeMount, useTemplateRef } from 'vue'
import Flex from '../Flex/Flex.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import './copy-clipboard.scss'

interface Props {
  /**
   * Text to copy
   */
  text: string
  /**
   * Wether to show a tooltip after successful copy
   */
  label?: string | boolean
  /**
   * Tooltip to display above the anchor
   */
  labelDuration?: number
}

const {
  text,
  label,
  labelDuration,
} = defineProps<Props>()

const {
  copy,
  copied,
  isSupported,
} = useClipboard({
  copiedDuring: labelDuration,
})

onBeforeMount(() => {
  if (!isSupported.value) {
    throw new Error('Clipboard API is not supported')
  }
})

const anchorRef = useTemplateRef('anchorRef')
const tooltipRef = useTemplateRef('tooltipRef')
// const arrowRef = useTemplateRef('arrowRef')

const { floatingStyles } = useFloating(anchorRef, tooltipRef, {
  whileElementsMounted: autoUpdate,
  transform: false,
  middleware: [
    offset(8),
    autoPlacement({
      autoAlignment: true,
      crossAxis: true,
    }),
  ],
})
</script>

<template>
  <div ref="anchorRef" class="vui-clipboard-copy-wrap" role="button" @click="copy(text)">
    <slot :copy :copied />
  </div>

  <Transition name="fade-up" mode="in-out">
    <div v-if="copied" ref="tooltipRef" class="vui-clipboard-tooltip" :style="floatingStyles">
      <slot name="label">
        <template v-if="label">
          {{ label }}
        </template>
        <Flex v-else align-center justify-center>
          <Icon width="16" height="16" icon="ph:check-bold" />
          Copied to clipboard
        </Flex>
      </slot>
    </div>
  </Transition>
</template>
