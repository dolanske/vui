<script setup lang="ts">
import type { Props } from './Popout.vue'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, useAttrs, useId, useTemplateRef, watch, watchEffect } from 'vue'
import { isFocusable } from '../../lib/focus'
import { focusInitialItem } from '../../lib/menu'
import Popout from './Popout.vue'

type PopoutHoverProps = Omit<Props, 'anchor' | 'visible'> & {
  /**
   * If set to true, Popout will not be rendered on hover. Trigger stays
   */
  disabled?: boolean
}

defineOptions({ inheritAttrs: false })

const {
  enterDelay = 200,
  leaveDelay = 200,
  disabled,
  ...remainingProps
} = defineProps<PopoutHoverProps>()

const attrs = useAttrs()
const anchor = useTemplateRef('anchorRef')
const popout = useTemplateRef<InstanceType<typeof Popout>>('popoutRef')

const popoutId = useId()
const visible = ref(false)
// Opened through the keyboard (ArrowRight in a menu), skips the enter delay
const immediate = ref(false)

function isInside(node: Node | null): boolean {
  if (!node)
    return false
  return !!anchor.value?.contains(node) || !!popout.value?.el()?.contains(node)
}

function handleFocusOut(event: FocusEvent) {
  // Focus moving between the trigger and the popout (or within the popout)
  // keeps it open
  if (isInside(event.relatedTarget as Node | null))
    return

  setVisibility(false)
}

function setVisibility(visibleState: boolean) {
  if (disabled && visibleState)
    return

  if (!visibleState)
    immediate.value = false

  visible.value = visibleState
}

// Disabling while open closes the popout
watch(() => disabled, (isDisabled) => {
  if (isDisabled)
    visible.value = false
})

// Use the first child element as the actual anchor for Popout positioning so that
// the wrapper's display type does not affect offset calculations.
const anchorElement = computed(() =>
  (anchor.value?.firstElementChild as HTMLElement | null) ?? anchor.value,
)

// ARIA lives on the actual trigger element, not on the layout wrapper. Only
// elements which can not receive focus on their own are made focusable.
watchEffect(() => {
  const el = anchor.value?.firstElementChild
  if (!el)
    return

  if (!isFocusable(el) && !el.hasAttribute('tabindex'))
    el.setAttribute('tabindex', '0')

  el.setAttribute('aria-expanded', String(visible.value))
  if (visible.value)
    el.setAttribute('aria-controls', popoutId)
  else
    el.removeAttribute('aria-controls')
}, { flush: 'post' })

function closeAndFocusTrigger() {
  setVisibility(false)
  ;(anchorElement.value as HTMLElement | null)?.focus()
}

// Submenu keyboard support. Menus dispatch this event on ArrowRight.
useEventListener(anchor, 'vui-submenu-open', async () => {
  immediate.value = true
  setVisibility(true)
  await nextTick()
  await nextTick()
  const el = popout.value?.el()
  if (el)
    focusInitialItem(el)
})

function onPopoutKeydown(event: KeyboardEvent) {
  // ArrowLeft closes a submenu and returns to its trigger
  if (event.key === 'ArrowLeft' && anchor.value?.querySelector('[role^="menuitem"]')) {
    event.preventDefault()
    event.stopPropagation()
    closeAndFocusTrigger()
  }
}
</script>

<template>
  <span
    ref="anchorRef"
    class="popout-hover-anchor"
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
    @focusin="setVisibility(true)"
    @focusout="handleFocusOut"
  >
    <slot name="trigger" />
  </span>
  <Popout
    :id="popoutId"
    ref="popoutRef"
    v-bind="{ ...attrs, ...remainingProps }"
    :anchor="anchorElement"
    :visible
    :enter-delay="immediate ? 0 : enterDelay"
    :leave-delay
    close-on-escape
    @escape="closeAndFocusTrigger"
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
    @focusout="handleFocusOut"
    @keydown="onPopoutKeydown"
  >
    <slot />
  </Popout>
</template>
