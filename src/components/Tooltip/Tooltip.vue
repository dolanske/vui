<script setup lang='ts'>
import type { Placement } from '../../shared/types'
import { computed, ref, useAttrs, useId, useTemplateRef } from 'vue'
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
  enterDelay?: number
  /**
   * Amount of time after the cursor leaves before the tooltip is hidden
   */
  leaveDelay?: number
  /**
   * If set to true, tooltip will not be rendered
   */
  disabled?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const {
  placement,
  enterDelay,
  leaveDelay,
  disabled,
} = defineProps<Props>()

const attrs = useAttrs()

const popoutAnchorRef = useTemplateRef('popoutAnchor')
// Track if user is hovering the anchor
const hoverAnchor = ref(false)

const id = useId()
const anchor = computed(() => popoutAnchorRef.value?.children[0] as HTMLElement | null)

function setHoverState(state: boolean) {
  if (disabled)
    return

  hoverAnchor.value = state
}
</script>

<template>
  <div
    ref="popoutAnchor"
    class="popout-anchor"
    :aria-describedby="id"
    @mouseenter="setHoverState(true)"
    @mouseleave="setHoverState(false)"
  >
    <slot />
  </div>
  <Popout :id :visible="hoverAnchor" :anchor :enter-delay="enterDelay" :leave-delay="leaveDelay" class="vui-tooltip" v-bind="attrs" :placement>
    <slot name="tooltip" />
  </Popout>
</template>

<style scoped lang="scss">
.popout-anchor {
  display: contents;
  width: fit-content;
}
</style>
