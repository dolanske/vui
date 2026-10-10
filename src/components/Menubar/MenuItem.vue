<script setup lang="ts">
import { computed, inject, nextTick, onUnmounted, provide, useId, useTemplateRef, watch, watchEffect } from 'vue'
import { getFocusableElements } from '../../lib/focus'
import { createMenuKeydownHandler, focusInitialItem, MENU_KEY } from '../../lib/menu'
import Popout from '../Popout/Popout.vue'
import { MENUBAR_KEY, MENUBAR_TRIGGER_ATTR } from './menubar'
import '../Dropdown/dropdown.scss'

const context = inject(MENUBAR_KEY, null)

if (!context)
  throw new Error('[MenuItem] must be placed inside a <Menubar /> component.')

const { openId, activeId, register, open, close } = context

const id = useId()
onUnmounted(register(id))

const triggerRef = useTemplateRef<HTMLElement>('trigger')
const popout = useTemplateRef<InstanceType<typeof Popout>>('popoutRef')
const menuId = useId()

const isOpen = computed(() => openId.value === id)

// The focusable element inside the trigger slot acts as the menubar item
const triggerElement = computed<HTMLElement | null>(() => {
  const wrapper = triggerRef.value
  if (!wrapper)
    return null
  return getFocusableElements(wrapper)[0] ?? (wrapper.firstElementChild as HTMLElement | null)
})

watchEffect(() => {
  const el = triggerElement.value
  if (!el)
    return

  el.setAttribute(MENUBAR_TRIGGER_ATTR, id)
  el.setAttribute('role', 'menuitem')
  el.setAttribute('aria-haspopup', 'menu')
  el.setAttribute('aria-expanded', String(isOpen.value))
  // Roving tabindex, only one item of the menubar is in the Tab order
  el.setAttribute('tabindex', activeId.value === id ? '0' : '-1')
  if (isOpen.value)
    el.setAttribute('aria-controls', menuId)
  else
    el.removeAttribute('aria-controls')
}, { flush: 'post' })

function focusTrigger() {
  triggerElement.value?.focus({ preventScroll: true })
}

function closeMenu(returnFocus = false) {
  if (!isOpen.value)
    return
  close()
  if (returnFocus)
    focusTrigger()
}

// Items inside the menu close the whole menubar
provide(MENU_KEY, {
  close: (returnFocus = true) => closeMenu(returnFocus),
})

function handleClick() {
  if (isOpen.value)
    close()
  else
    open(id)
}

function handleMouseenter() {
  if (openId.value !== null && openId.value !== id)
    open(id)
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.target !== triggerElement.value)
    return

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    open(id)
  }
}

// Focus the first item whenever this menu opens
watch(isOpen, async (value) => {
  if (!value)
    return
  await nextTick()
  const el = popout.value?.el()
  if (el)
    focusInitialItem(el)
})

const navigate = createMenuKeydownHandler(() => popout.value?.el())

function onMenuKeydown(event: KeyboardEvent) {
  // ArrowLeft / ArrowRight switch to the neighbouring menubar menu, unless the
  // focused item opens a submenu
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    const item = document.activeElement as HTMLElement | null
    const submenuAnchor = item?.closest('.popout-hover-anchor')
    if (event.key === 'ArrowRight' && submenuAnchor) {
      event.preventDefault()
      submenuAnchor.dispatchEvent(new CustomEvent('vui-submenu-open'))
      return
    }

    event.preventDefault()
    const triggers = Array.from(document.querySelectorAll<HTMLElement>(`[${MENUBAR_TRIGGER_ATTR}]`))
      .filter(el => el.closest('[role="menubar"]') === triggerElement.value?.closest('[role="menubar"]'))
    const index = triggers.indexOf(triggerElement.value!)
    const next = triggers[(index + (event.key === 'ArrowRight' ? 1 : -1) + triggers.length) % triggers.length]
    const nextId = next?.getAttribute(MENUBAR_TRIGGER_ATTR)
    if (nextId)
      open(nextId)
    return
  }

  navigate(event)
}

function onPopoutFocusout(event: FocusEvent) {
  const next = event.relatedTarget as Element | null
  const current = event.currentTarget as HTMLElement
  if (next && (current.contains(next) || triggerRef.value?.contains(next)))
    return

  // Focus moved to a submenu or another menu of the same menubar
  const layerEl = next?.closest?.<HTMLElement>('[data-vui-layer]')
  if (layerEl && Number(layerEl.dataset.vuiLayer) > (popout.value?.layerIndex() ?? 0))
    return
  if (next?.closest('[role="menubar"]') || openId.value !== id)
    return

  closeMenu()
}
</script>

<template>
  <div
    ref="trigger"
    class="vui-menubar-item"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @keydown="onTriggerKeydown"
  >
    <slot />
  </div>
  <Popout
    :id="menuId"
    ref="popoutRef"
    :anchor="triggerRef"
    :visible="isOpen"
    placement="bottom-start"
    role="menu"
    aria-orientation="vertical"
    close-on-escape
    @escape="closeMenu(true)"
    @click-outside="closeMenu()"
    @focusout="onPopoutFocusout"
    @keydown="onMenuKeydown"
  >
    <slot name="menu" :close="() => closeMenu(true)" />
  </Popout>
</template>
