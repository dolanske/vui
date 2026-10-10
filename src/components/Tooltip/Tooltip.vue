<script setup lang='ts'>
import type { Placement } from '../../lib/types.ts'
import { computed, ref, useAttrs, useId, useTemplateRef, watch, watchEffect } from 'vue'
import { useInputCapabilities } from '../../lib/media.ts'
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
   * If set to true, tooltip will not be rendered on hover. Trigger stays
   */
  disabled?: boolean
  /**
   * Renders an arrow pointing at the trigger
   */
  arrow?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const {
  placement,
  enterDelay,
  leaveDelay,
  disabled,
  arrow,
} = defineProps<Props>()

const attrs = useAttrs()

const popoutAnchorRef = useTemplateRef('popoutAnchor')
const hovered = ref(false)
const focused = ref(false)
const dismissed = ref(false)

const id = useId()
const anchor = computed(() => popoutAnchorRef.value?.children[0] as HTMLElement | null)

// Hover tooltips only make sense for precise pointers. Touch devices would
// otherwise show them on tap and never hide them.
const { canHover } = useInputCapabilities()

const visible = computed(() => !disabled && !dismissed.value && (hovered.value || focused.value))

function setHoverState(state: boolean) {
  if (state && !canHover.value)
    return
  hovered.value = state
  if (!state)
    dismissed.value = false
}

// Keyboard users get the tooltip on focus. `:focus-visible` filters out focus
// caused by a mouse click or a tap.
function onFocusIn(event: FocusEvent) {
  const target = event.target as HTMLElement
  if (target.matches?.(':focus-visible'))
    focused.value = true
}

function onFocusOut() {
  focused.value = false
  dismissed.value = false
}

// Disabling while visible hides the tooltip
watch(() => disabled, (isDisabled) => {
  if (isDisabled) {
    hovered.value = false
    focused.value = false
  }
})

// The description must be referenced from the element which receives focus,
// not from the layout wrapper
watchEffect(() => {
  const el = anchor.value
  if (!el)
    return
  if (visible.value)
    el.setAttribute('aria-describedby', id)
  else
    el.removeAttribute('aria-describedby')
}, { flush: 'post' })
</script>

<template>
  <div
    ref="popoutAnchor"
    class="popout-anchor"
    @mouseenter="setHoverState(true)"
    @mouseleave="setHoverState(false)"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <slot />
  </div>
  <!-- Escape dismisses the tooltip first, a second Escape reaches the layer below -->
  <Popout
    :id
    role="tooltip"
    :visible
    :anchor
    :enter-delay="focused ? 0 : enterDelay"
    :leave-delay="leaveDelay"
    :arrow
    close-on-escape
    class="vui-tooltip"
    v-bind="attrs"
    :placement
    @escape="dismissed = true"
  >
    <slot name="tooltip" />
  </Popout>
</template>

<style scoped lang="scss">
@layer vui.reset, vui.base, vui.components, vui.modifiers, vui.utilities;

@layer vui.components {
  .popout-anchor {
    display: contents;
    width: fit-content;
  }
}
</style>
