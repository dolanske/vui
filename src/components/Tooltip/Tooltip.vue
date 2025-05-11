<script setup lang='ts'>
import type { Placement } from '../../shared/types'
import { computed, ref, useId, useTemplateRef, watch } from 'vue'
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
const anchor = computed(() => popoutAnchorRef.value?.children[0] as HTMLElement | null)
</script>

<template>
  <div
    ref="popoutAnchor"
    class="popout-anchor"
    :aria-describedby="id"
    @mouseenter="hoverAnchor = true"
    @mouseleave="hoverAnchor = false"
  >
    <slot />
  </div>
  <Popout :id :visible="showTooltip" :anchor class="vui-tooltip" :placement>
    <slot name="tooltip" />
  </Popout>
</template>

<style scoped lang="scss">
.popout-anchor {
  display: contents;
  width: fit-content;
}
</style>
