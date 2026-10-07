<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { nextTick, onUnmounted, provide, ref, useId, useTemplateRef, watch } from 'vue'
import { claimedContextMenuEvents as claimedEvents, createMenuKeydownHandler, focusInitialItem, MENU_KEY } from '../../lib/menu'
import Popout from '../Popout/Popout.vue'
import './context-menu.scss'

interface Props {
  /**
   * Keeps the browser's native context menu instead of opening this one
   */
  disabled?: boolean
  /**
   * How long a touch has to be held to open the menu, in milliseconds.
   * iOS Safari never fires `contextmenu`, so a long-press is detected manually.
   */
  longPressDelay?: number
}

const { disabled = false, longPressDelay = 500 } = defineProps<Props>()

const context = useTemplateRef('contextEl')
const anchor = useTemplateRef('anchorEl')
const popout = useTemplateRef<InstanceType<typeof Popout>>('popoutRef')
const menuId = useId()

const anchorPos = ref<{ x: number, y: number } | null>(null)
// Element focused before the menu opened, focus returns there on close
let returnFocusTo: HTMLElement | null = null

// Every contextmenu event is claimed by the innermost ContextMenu only. Outer
// menus see the claim and stay closed, so nested menus never stack.
const instanceId = useId()

/**
 * Positions the menu at a viewport point. The anchor is absolutely
 * positioned inside the container, so scroll offsets and borders of the
 * container have to be taken into account.
 */
function openAt(clientX: number, clientY: number) {
  const el = context.value
  if (!el)
    return

  const rect = el.getBoundingClientRect()
  returnFocusTo = document.activeElement as HTMLElement | null

  anchorPos.value = {
    x: clientX - rect.left - el.clientLeft + el.scrollLeft,
    y: clientY - rect.top - el.clientTop + el.scrollTop,
  }
}

useEventListener(context, 'contextmenu', (event: MouseEvent) => {
  if (disabled || claimedEvents.has(event))
    return

  // Right-clicking inside this menu's own popup is left to the browser
  if (popout.value?.el()?.contains(event.target as Node))
    return

  claimedEvents.set(event, instanceId)
  event.preventDefault()
  cancelLongPress()

  // Opened with the keyboard (Shift+F10 or the Menu key): there is no pointer
  // position, so anchor the menu to the focused element instead
  const isKeyboard = event.button !== 2 && event.clientX === 0 && event.clientY === 0
  if (isKeyboard) {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect()
    openAt(targetRect.left, targetRect.bottom)
  }
  else {
    openAt(event.clientX, event.clientY)
  }
})

// If a context menu is opened elsewhere (including a nested one), close this one
useEventListener(window, 'contextmenu', (event: MouseEvent) => {
  if (claimedEvents.get(event) === instanceId)
    return
  if (popout.value?.el()?.contains(event.target as Node))
    return
  close()
}, { capture: false })

//
// Long-press for touch devices

let longPressTimer: ReturnType<typeof setTimeout> | undefined
let longPressStart: { x: number, y: number } | null = null
const LONG_PRESS_TOLERANCE = 10

function cancelLongPress() {
  clearTimeout(longPressTimer)
  longPressStart = null
}

useEventListener(context, 'pointerdown', (event: PointerEvent) => {
  if (disabled || event.pointerType !== 'touch')
    return

  longPressStart = { x: event.clientX, y: event.clientY }
  longPressTimer = setTimeout(() => {
    if (longPressStart) {
      openAt(longPressStart.x, longPressStart.y)
      suppressNextClick()
    }
    longPressStart = null
  }, longPressDelay)
})

useEventListener(context, 'pointermove', (event: PointerEvent) => {
  if (!longPressStart)
    return
  if (Math.abs(event.clientX - longPressStart.x) > LONG_PRESS_TOLERANCE || Math.abs(event.clientY - longPressStart.y) > LONG_PRESS_TOLERANCE)
    cancelLongPress()
})

// Releasing a long-press can fire a click, which would immediately close the
// menu again (click outside) or activate whatever is underneath the finger
function suppressNextClick() {
  const handler = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }
  window.addEventListener('click', handler, { capture: true, once: true })
  setTimeout(() => window.removeEventListener('click', handler, { capture: true }), 800)
}

useEventListener(context, 'pointerup', cancelLongPress)
useEventListener(context, 'pointercancel', cancelLongPress)
onUnmounted(cancelLongPress)

function close(returnFocus = false) {
  if (!anchorPos.value)
    return

  anchorPos.value = null

  if (returnFocus && returnFocusTo?.isConnected)
    returnFocusTo.focus({ preventScroll: true })
  returnFocusTo = null
}

// Menu items close the menu and return focus where it was
provide(MENU_KEY, {
  close: (returnFocus = true) => close(returnFocus),
})

// Move focus into the menu so it can be operated with the keyboard
watch(anchorPos, async (pos) => {
  if (!pos)
    return
  await nextTick()
  await nextTick()
  const el = popout.value?.el()
  if (el)
    focusInitialItem(el)
})

const navigate = createMenuKeydownHandler(() => popout.value?.el())

function onPopoutFocusout(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  const current = event.currentTarget as HTMLElement
  if (next && current.contains(next))
    return

  // Submenus live in layers above this one
  const layerEl = (next as Element | null)?.closest?.<HTMLElement>('[data-vui-layer]')
  if (layerEl && Number(layerEl.dataset.vuiLayer) > (popout.value?.layerIndex() ?? 0))
    return

  close()
}

defineExpose({
  close: () => close(),
})
</script>

<template>
  <div ref="contextEl" class="vui-context-menu">
    <div
      ref="anchorEl"
      class="vui-context-menu-anchor"
      :style="{
        left: `${anchorPos?.x}px`,
        top: `${anchorPos?.y}px`,
      }"
    />
    <Popout
      :id="menuId"
      ref="popoutRef"
      :key="`${anchorPos?.x}${anchorPos?.y}`"
      :offset="2"
      :visible="!!anchorPos"
      :anchor
      role="menu"
      aria-orientation="vertical"
      placement="bottom-start"
      transition-name="none"
      close-on-escape
      @escape="close(true)"
      @click-outside="close()"
      @focusout="onPopoutFocusout"
      @keydown="navigate"
    >
      <slot name="menu" :close="() => close(true)" />
    </Popout>
    <slot />
  </div>
</template>
