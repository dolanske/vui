<script setup lang='ts'>
import { onClickOutside, useCssVar, useMouseInElement, useTimeoutFn, watchThrottled } from '@vueuse/core'
import { computed, onBeforeMount, onMounted, useSlots, useTemplateRef } from 'vue'
import { formatUnitValue, isNil } from '../../lib/helpers'
import './sidebar.scss'

interface Props {
  /**
   * Sidebar styling.
   *
   * - default: border on the right
   * - plain: no styling except padding
   * - card: radius & border around the entire sidebar
   */
  variant?: 'default' | 'plain' | 'card'
  /**
   * Controls wether the sidebar is displayed in full size, or a small version.
   */
  mini?: boolean
  /**
   * If enabled, sidebar opens when user hovers close to where sidebar appears
   * from.
   */
  appear?: boolean
  /**
   * Controls the amount of time in milliseconds user needs to hover the trigger
   * area, for sidebar to show up.
   */
  appearDelay?: number
  /**
   * If enabled, sidebar floats on top of content when opened
   */
  float?: boolean
  /**
   * Removes automatic scaling / formatting of `<Button />` and `<DropdownItem
   * />` components when sidebar is is minified.
   */
  manualButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  mini: false,
  appearDelay: 250,
})

const APPEAR_DETECT_THRESHOLD = 32
const sidebarInner = useTemplateRef('inner')
const sidebarOuter = useTemplateRef('outer')

const open = defineModel<boolean>({
  default: true,
})
const slots = useSlots()

// Reference sidebar CSS variables
const widthFull = useCssVar('--vui-sidebar-width-full', sidebarInner)
const widthMini = useCssVar('--vui-sidebar-width-mini', sidebarInner)
const offset = useCssVar('--vui-sidebar-offset', sidebarInner)

const slotProps = computed(() => ({
  mini: props.mini,
  float: props.float,
  appear: props.appear,
  open,
  close: () => open.value = false,
}))

onClickOutside(sidebarInner, () => {
  if (open.value && props.float) {
    open.value = false
  }
})

// Sidebar `appear` implementation
const { start, stop, isPending } = useTimeoutFn(() => {
  if (props.appear) {
    open.value = true
  }
}, () => props.appearDelay)

onMounted(() => {
  // If appear is set on mount, but sidebar is open, close it
  if (props.appear && open.value) {
    open.value = false
  }
})

const { elementX, elementY, elementHeight } = useMouseInElement(sidebarOuter)

// Derived from CSS vars/props, NOT measured from the DOM — the outer wrap's
// real width is intentionally collapsed in floaty mode, so it can't be trusted
// as the sidebar's true open width. This mirrors what the original implementation did.
const openWidth = computed(() => {
  const _offset = Number.parseFloat(offset.value!)
  const _mini = Number.parseFloat(widthMini.value!)
  const _full = Number.parseFloat(widthFull.value!)

  const val = props.mini ? _mini : _full
  return props.variant === 'card' ? val + (_offset * 2) : val
})

watchThrottled([elementX, elementY], ([x, y]) => {
  const inTriggerZone = x <= APPEAR_DETECT_THRESHOLD && x >= 0

  if (!props.appear || (inTriggerZone && isPending.value))
    return

  if (inTriggerZone && !open.value && !isPending.value) {
    start()
  }
  else if (isPending.value) {
    stop()
  }

  const withinVerticalBounds = y >= 0 && y <= elementHeight.value

  if ((x > APPEAR_DETECT_THRESHOLD + openWidth.value || x < 0 || !withinVerticalBounds) && open.value) {
    open.value = false
  }
}, {
  throttle: 100,
  immediate: true,
})
</script>

<template>
  <div ref="outer" class="vui-sidebar-outer" :style="{ width: props.float ? 0 : openWidth }" :class="{ open, 'manual-buttons': props.manualButtons }">
    <aside
      ref="inner"
      class="vui-sidebar"
      :class="{ open, float: props.float, mini: props.mini }"
    >
      <div v-if="slots.header" class="vui-sidebar-header">
        <slot name="header" v-bind="slotProps" />
      </div>
      <div class="vui-sidebar-content">
        <div class="vui-sidebar-content-wrap">
          <slot v-bind="slotProps" />
        </div>
      </div>

      <div v-if="slots.footer" class="vui-sidebar-footer">
        <slot name="footer" v-bind="slotProps" />
      </div>
    </aside>
  </div>
</template>
