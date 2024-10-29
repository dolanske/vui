<script setup lang='ts'>
import { useFloating } from '@floating-ui/vue'
import { useClipboard } from '@vueuse/core'
import { onBeforeMount, useTemplateRef } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'

interface Props {
  /**
   * Text to copy
   */
  text: string
  /**
   * Wether to show a tooltip after successful copy
   */
  tooltip?: boolean
  /**
   * Tooltip to display above the anchor
   */
  labelDuration?: number
}

const {
  text,
  tooltip,
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

const anchorRef = useTemplateRef('anchor')
const tooltipRef = useTemplateRef('tooltip')

const { floatingStyles } = useFloating(anchorRef, tooltipRef, {
  placement: 'top',
})
</script>

<template>
  <div ref="anchor" class="vui-clipboard-copy-wrap" @click="copy(text)">
    <slot :copy :copied />
  </div>

  <Transition name="fade-up">
    <div v-if="copied && tooltip" ref="tooltip" class="vui-clipboard-tooltip" :style="floatingStyles" />
  </Transition>
</template>
