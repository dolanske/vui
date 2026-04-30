<script setup lang='ts'>
import type { Placement } from '../../shared/types'
import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { Breakpoints, useBreakpoint } from '../../shared/breakpoints'
import { formatUnitValue } from '../../shared/helpers'
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
   * Sets the width of the dropdown to the width of its anchor
   */
  expand?: boolean
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
}

const {
  placement = 'bottom-start',
  maxHeight = 356,
  expand,
  minWidth = 156,
  noMobileDrawer = false,
  transitionName,
} = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const anchorRef = useTemplateRef<HTMLDivElement>('anchor')
const popoutComponentRef = useTemplateRef<{ el: HTMLElement | null }>('popoutEl')

const showMenu = ref(false)

function open() {
  showMenu.value = true
}

function close() {
  showMenu.value = false
}

function toggle() {
  showMenu.value = !showMenu.value
}

// onClickOutside(dropdownRef, () => {
//   showMenu.value = false
// }, {
//   ignore: [anchorRef],
// })

const anchorWidth = computed(() => {
  if (!expand || !window)
    return 0
  return anchorRef.value?.getBoundingClientRect().width
})

defineExpose({
  open,
  close,
  toggle,
  isOpen: showMenu,
})

const mW = computed(() => formatUnitValue(minWidth))
const w = computed(() => expand ? `${anchorWidth.value}px` : 'initial')

const isMobile = useBreakpoint(Breakpoints.Mobile)

const { escape } = useMagicKeys()
whenever(escape, close)

// We want to make sure that after opening, focus is transferred to the first
// focusable element within Popout. And when focus is lost, we move back to the
// trigger element. Big win for accessibility and keyboard navigation bro
const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

watch(showMenu, (v) => {
  if (!v) {
    emit('close')
  }
  else {
    nextTick(() => {
      popoutComponentRef.value?.el
        ?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
        ?.focus()
    })
  }
})

function onPopoutFocusout(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as HTMLElement | null
  const currentTarget = event.currentTarget as HTMLElement

  if (!relatedTarget)
    return

  if (!currentTarget.contains(relatedTarget)) {
    anchorRef.value?.focus()
  }
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

onMounted(() => {
  if (expand && minWidth !== 156)
    console.warn('[Dropdown] Dropdown: minWidth prop is ignored when expand is set to true')
})

function handleContentClick(event: MouseEvent) {
  const target = event.target as HTMLElement

  // Check if the click was on a DropdownItem or inside one
  // We use a CSS class selector to identify "closable" items
  if (target.closest('.vui-dropdown-item')) {
    close()
  }
}
</script>

<template>
  <div
    ref="anchor"
    class="vui-dropdown-trigger-wrap"
    role="button"
    :aria-expanded="showMenu"
    :aria-haspopup="true"
    name="Dropdown menu"
    @click.capture="onTriggerClickCapture"
  >
    <slot name="trigger" :open :is-open="showMenu" :close :toggle />
  </div>

  <!-- Mobile: Drawer -->
  <Drawer
    v-if="isMobile && !noMobileDrawer"
    :open="showMenu"
    @close="close"
    @click="handleContentClick"
  >
    <slot :open :close :toggle :is-open="showMenu" />
  </Drawer>

  <!-- Desktop: Popout -->
  <Popout
    v-else
    ref="popoutEl"
    :visible="showMenu"
    :anchor="anchorRef"
    class="vui-dropdown"
    :placement
    :style="{
      minWidth: expand ? w : mW,
      maxHeight: formatUnitValue(maxHeight),
    }"
    :transition-name
    @click-outside="close"
    @click="handleContentClick"
    @focusout="onPopoutFocusout"
  >
    <slot :open :close :toggle :is-open="showMenu" />
  </Popout>
</template>
