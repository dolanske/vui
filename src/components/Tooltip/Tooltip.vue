<script setup lang='ts'>
import type { Placement } from '@floating-ui/vue'
import { ref, useTemplateRef, watch } from 'vue'
import Popout from '../Popout/Popout.vue'
import './tooltip.scss'

interface Props {
  /**
   * Tooltip placement related to the anchor
   */
  placement?: Placement
  /**
   * Amount of time user should hover the anchor until the tooltip shows up
   */
  delay?: number
}

const {
  placement = 'bottom',
  delay = 0,
} = defineProps<Props>()

const popoutAnchor = useTemplateRef('popoutAnchor')
// Track if user is hovering the anchor
const hoverAnchor = ref(false)

// Display tooltip
const showTooltip = ref(false)

let timeoutId: NodeJS.Timeout
watch(hoverAnchor, (isHovering) => {
  if (isHovering) {
    if (!delay || delay <= 0) {
      showTooltip.value = true
      return
    }

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      // Need to reference the ref itself as this will execute without the
      // outside scope (as far as I know tbh)
      if (hoverAnchor.value) {
        showTooltip.value = true
      }
    }, delay)
  }
  else {
    clearTimeout(timeoutId)
    showTooltip.value = false
  }
})
</script>

<template>
  <div
    ref="popoutAnchor"
    @mouseenter="hoverAnchor = true"
    @mouseleave="hoverAnchor = false"
  >
    <slot />
  </div>
  <Transition appear name="tooltip">
    <Popout v-if="showTooltip" :anchor="popoutAnchor" class="vui-tooltip" :placement>
      <slot name="tooltip" />
    </Popout>
  </Transition>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: 0.1s opacity ease-in-out;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
