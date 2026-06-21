<script setup lang='ts'>
import type { Placement } from '../../lib/types.ts'
import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { formatUnitValue } from '../../lib/helpers.ts'
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
}

const {
  placement = 'bottom-start',
  maxHeight = 356,
  minWidth = 156,
  noMobileDrawer = false,
  transitionName,
} = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const anchorRef = useTemplateRef<HTMLDivElement>('anchor')
const anchorElement = computed(() =>
  (anchorRef.value?.firstElementChild as HTMLElement | null) ?? anchorRef.value,
)
const popoutComponentRef = useTemplateRef<{ el: () => HTMLElement | null }>('popoutEl')

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

defineExpose({
  open,
  close,
  toggle,
  isOpen: showMenu,
})

const mW = computed(() => formatUnitValue(minWidth))

const { escape } = useMagicKeys()
whenever(escape, close)

watch(showMenu, (v) => {
  if (!v) {
    emit('close')
  }
  else {
    nextTick(() => {
      popoutComponentRef.value?.el()
        ?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled])')
        ?.focus()
    })
  }
})

function onPopoutFocusout(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as HTMLElement | null
  const currentTarget = event.currentTarget as HTMLElement

  // Focus stayed inside the popout
  if (currentTarget.contains(relatedTarget))
    return

  // Focus moved back to the trigger area (e.g. Shift+Tab) — leave dropdown open
  if (anchorRef.value?.contains(relatedTarget))
    return

  // Focus left the popout entirely — close and return to trigger.
  close()
  anchorRef.value?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled])')?.focus()
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
  <span
    ref="anchor"
    class="vui-dropdown-trigger-wrap"
    role="button"
    :aria-expanded="showMenu"
    :aria-haspopup="true"
    name="Dropdown menu"
    @click.capture="onTriggerClickCapture"
  >
    <slot name="trigger" :open :is-open="showMenu" :close :toggle />
  </span>

  <!-- Mobile: Drawer -->
  <Drawer
    v-if="viewport.s && !noMobileDrawer"
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
    :anchor="anchorElement"
    class="vui-dropdown"
    :placement
    :style="{
      '--vui-dropdown-min-width': mW,
      '--vui-dropdown-max-height': formatUnitValue(maxHeight),
    }"
    :transition-name
    @click-outside="close"
    @click="handleContentClick"
    @focusout="onPopoutFocusout"
  >
    <slot :open :close :toggle :is-open="showMenu" />
  </Popout>
</template>
