<script setup lang='ts'>
import type { Placement } from '../../lib/types.ts'
import { computed, nextTick, provide, ref, useAttrs, useId, useTemplateRef, watch, watchEffect } from 'vue'
import { getFocusableElements } from '../../lib/focus.ts'
import { formatUnitValue } from '../../lib/helpers.ts'
import { useInputCapabilities } from '../../lib/media.ts'
import { createMenuKeydownHandler, focusInitialItem, MENU_KEY } from '../../lib/menu.ts'
import { viewport } from '../../lib/viewport.ts'
import Drawer from '../Drawer/Drawer.vue'
import Popout from '../Popout/Popout.vue'
import './dropdown.scss'

export interface Props {
  /**
   * Tooltip placement related to the anchor
   */
  placement?: Placement
  /**
   * Set the minimum width of the dropdown element
   */
  minWidth?: number | string
  /**
   * Set he max height of the dropdown element before it starts scrolling
   */
  maxHeight?: number | string
  /**
   * Disable mobile drawer behavior, always use the floating dropdown.
   */
  noMobileDrawer?: boolean
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition. This is useful when using viewTransitions to prevent conflicts between default animation and the view transition
   */
  transitionName?: string | 'none'
  /**
   * ARIA role of the popup. Use `listbox` for selection lists (like Select)
   * and `dialog` for arbitrary interactive content (like an emoji picker).
   */
  role?: 'menu' | 'listbox' | 'dialog'
  /**
   * Makes the dropdown at least as wide as its trigger
   */
  matchWidth?: boolean
  /**
   * Accessible name of the mobile drawer
   */
  drawerTitle?: string
}

defineOptions({
  inheritAttrs: false,
})

const {
  placement = 'bottom-start',
  maxHeight = 356,
  minWidth = 156,
  noMobileDrawer = false,
  transitionName,
  role = 'menu',
  matchWidth = false,
  drawerTitle = 'Menu',
} = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const attrs = useAttrs()
const menuId = useId()

const anchorRef = useTemplateRef<HTMLSpanElement>('anchor')
const popoutComponentRef = useTemplateRef<InstanceType<typeof Popout>>('popoutEl')

// The element users interact with: the first focusable element inside the
// trigger slot, falling back to the first child
const triggerElement = computed<HTMLElement | null>(() => {
  const wrapper = anchorRef.value
  if (!wrapper)
    return null
  return getFocusableElements(wrapper)[0] ?? (wrapper.firstElementChild as HTMLElement | null)
})

const anchorElement = computed(() =>
  (anchorRef.value?.firstElementChild as HTMLElement | null) ?? anchorRef.value,
)

const showMenu = ref(false)

// The drawer is meant for small touch screens. A narrow desktop window keeps
// the floating dropdown.
const { coarsePointer } = useInputCapabilities()
const useDrawer = computed(() => viewport.s && coarsePointer.value && !noMobileDrawer)

// Where focus goes when the menu opens: first or last item
let initialFocus: 'first' | 'last' = 'first'

function open(position: 'first' | 'last' = 'first') {
  initialFocus = position
  showMenu.value = true
}

function close(returnFocus = false) {
  if (!showMenu.value)
    return

  showMenu.value = false
  if (returnFocus)
    triggerElement.value?.focus({ preventScroll: true })
}

function toggle() {
  if (showMenu.value)
    close()
  else
    open()
}

// Items (also inside teleported submenus) close the menu through this context
provide(MENU_KEY, {
  close: (returnFocus = true) => close(returnFocus),
})

defineExpose({
  open: () => open(),
  close: () => close(),
  toggle,
  isOpen: showMenu,
})

const mW = computed(() => formatUnitValue(minWidth))

watch(showMenu, async (v) => {
  if (!v) {
    emit('close')
    return
  }

  if (useDrawer.value)
    return

  await nextTick()
  const el = popoutComponentRef.value?.el()
  if (el)
    focusInitialItem(el, initialFocus)
})

// ARIA wiring on the real trigger element
watchEffect(() => {
  const el = triggerElement.value
  if (!el)
    return

  el.setAttribute('aria-haspopup', role === 'menu' ? 'menu' : role)
  el.setAttribute('aria-expanded', String(showMenu.value))
  if (showMenu.value && !useDrawer.value)
    el.setAttribute('aria-controls', menuId)
  else
    el.removeAttribute('aria-controls')
}, { flush: 'post' })

function isInsideHigherLayer(target: Element | null): boolean {
  const layerEl = target?.closest<HTMLElement>('[data-vui-layer]')
  const ownLayer = popoutComponentRef.value?.layerIndex() ?? 0
  return !!layerEl && Number(layerEl.dataset.vuiLayer) > ownLayer
}

function onPopoutFocusout(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as HTMLElement | null
  const currentTarget = event.currentTarget as HTMLElement

  // The whole window lost focus (e.g. switching apps). Keep the menu open.
  if (!relatedTarget && !document.hasFocus())
    return

  // Focus was dropped, not moved: the focused element got hidden or removed, or
  // plain content was clicked. Clicks outside are handled by click-outside, so
  // keep the menu open and pull focus back in for Escape and Tab to keep working.
  if (!relatedTarget) {
    requestAnimationFrame(() => {
      if (showMenu.value && currentTarget.isConnected && (!document.activeElement || document.activeElement === document.body))
        currentTarget.focus({ preventScroll: true })
    })
    return
  }

  // Focus stayed inside the popout, moved to a submenu or another layer above.
  // The popout itself is focusable (tabindex -1), so clicking plain content
  // inside it keeps focus within instead of dropping it to the body.
  if (currentTarget.contains(relatedTarget) || isInsideHigherLayer(relatedTarget))
    return

  // Focus moved back to the trigger area (e.g. Shift+Tab) — leave dropdown open
  if (anchorRef.value?.contains(relatedTarget))
    return

  // Focus left the menu (Tab, or a click elsewhere). The menu closes, but focus
  // stays where the user put it.
  close()
}

function onTriggerClickCapture(event: MouseEvent) {
  // Ensures that clicking trigger while dropdown is open does not reopen it
  // immediately but closes it properly
  if (!showMenu.value)
    return

  event.preventDefault()
  event.stopPropagation()
  close()
}

// Keyboard support on the trigger: ArrowDown / ArrowUp open the menu
function onTriggerKeydown(event: KeyboardEvent) {
  if (event.target !== triggerElement.value)
    return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    open(event.key === 'ArrowUp' ? 'last' : 'first')
  }
}

const navigate = createMenuKeydownHandler(() => popoutComponentRef.value?.el())

function onMenuKeydown(event: KeyboardEvent) {
  // Tab moves focus out of the menu, which closes it via focusout
  if (event.key === 'ArrowRight') {
    // Opens a submenu (PopoutHover) belonging to the focused item
    const item = document.activeElement as HTMLElement | null
    const submenuAnchor = item?.closest('.popout-hover-anchor')
    if (submenuAnchor && popoutComponentRef.value?.el()?.contains(submenuAnchor)) {
      event.preventDefault()
      submenuAnchor.dispatchEvent(new CustomEvent('vui-submenu-open'))
      return
    }
  }

  navigate(event)
}

// Template note:
// Pure layout wrapper (display: contents), ARIA is applied to the actual trigger
</script>

<template>
  <span
    ref="anchor"
    class="vui-dropdown-trigger-wrap"
    @click.capture="onTriggerClickCapture"
    @keydown="onTriggerKeydown"
  >
    <slot name="trigger" :open="() => open()" :is-open="showMenu" :close="() => close()" :toggle />
  </span>

  <!-- Mobile: Drawer -->
  <Drawer
    v-if="useDrawer"
    :open="showMenu"
    :title="drawerTitle"
    v-bind="attrs"
    @close="close()"
  >
    <div :role="role" :aria-orientation="role === 'dialog' ? undefined : 'vertical'" @keydown="navigate">
      <slot :open="() => open()" :close="() => close(true)" :toggle :is-open="showMenu" />
    </div>
  </Drawer>

  <!-- Desktop: Popout -->
  <Popout
    v-else
    :id="menuId"
    ref="popoutEl"
    :visible="showMenu"
    :anchor="anchorElement"
    class="vui-dropdown"
    :role
    :aria-orientation="role === 'dialog' ? undefined : 'vertical'"
    :placement
    :match-width="matchWidth"
    :style="{
      '--vui-dropdown-min-width': mW,
      '--vui-dropdown-max-height': formatUnitValue(maxHeight),
    }"
    :transition-name
    tabindex="-1"
    close-on-escape
    v-bind="attrs"
    @escape="close(true)"
    @click-outside="close()"
    @focusout="onPopoutFocusout"
    @keydown="onMenuKeydown"
  >
    <slot :open="() => open()" :close="() => close(true)" :toggle :is-open="showMenu" />
  </Popout>
</template>
