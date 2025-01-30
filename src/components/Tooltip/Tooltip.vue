<script setup lang='ts'>
import type { Placement } from '../../shared/types'
import { ref, useId, useTemplateRef, watch } from 'vue'
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
  placement,
  delay = 0,
} = defineProps<Props>()

const popoutAnchorRef = useTemplateRef('popoutAnchor')
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

const id = useId()
</script>

<template>
  <div
    ref="popoutAnchor"
    :style="{
      width: 'fit-content',
    }"
    :aria-describedby="id"
    @mouseenter="hoverAnchor = true"
    @mouseleave="hoverAnchor = false"
  >
    <slot />
  </div>
  <Transition mode="out-in" name="tooltip">
    <Popout v-if="showTooltip" :id :anchor="popoutAnchorRef" class="vui-tooltip" :placement>
      <slot name="tooltip" />
    </Popout>
  </Transition>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: var(--transition-fast);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
