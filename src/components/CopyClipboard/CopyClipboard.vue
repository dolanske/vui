<script setup lang='ts'>
import { arrow, autoPlacement, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { useClipboard } from '@vueuse/core'
import { onBeforeMount, useTemplateRef } from 'vue'
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
  label = 'Copied to clipboard',
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
  placement: 'left',
  whileElementsMounted: autoUpdate,
  middleware: [
    autoPlacement({
      alignment: 'start',
      autoAlignment: true,
    }),
    offset(16),
  ],
})
</script>

<template>
  <div ref="anchorRef" class="vui-clipboard-copy-wrap" role="button" @click="copy(text)">
    <slot :copy :copied />
  </div>

  <div v-show="copied" ref="tooltipRef" class="vui-clipboard-tooltip" :style="floatingStyles">
    {{ label }}
  </div>
</template>
