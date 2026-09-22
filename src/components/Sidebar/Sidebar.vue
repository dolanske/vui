<script setup lang='ts'>
import { onClickOutside, useCssVar, useElementSize, useMouseInElement, useTimeoutFn, watchThrottled } from '@vueuse/core'
import { computed, onMounted, useAttrs, useSlots, useTemplateRef } from 'vue'
import { formatUnitValue } from '../../lib/helpers'
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
   * Removes automatic transform of some VUI components when placed inside the Sidebar
   */
  noAutoTransform?: boolean
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
const attrs = useAttrs()

const offset = useCssVar('--vui-sidebar-offset', sidebarInner)

const slotProps = computed(() => ({
  mini: props.mini,
  float: props.float,
  appear: props.appear,
  noAutoTransform: props.noAutoTransform,
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
const { width: sidebarWidth } = useElementSize(sidebarInner)

// Outer width
const openWidth = computed(() => {
  const _offset = Number.parseFloat(offset.value!)
  const val = sidebarWidth.value
  return props.variant === 'card' ? val + (_offset * 2) : val
})

// Watch for mouse movement for `appear` prop
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
  <div
    ref="outer"
    class="vui-sidebar-outer"
    :style="{ width: props.float ? 0 : formatUnitValue(openWidth) }"
    :class="{ open }"
  >
    <aside
      ref="inner"
      class="vui-sidebar"
      :class="[{ open, 'float': props.float, 'mini': props.mini, 'no-auto-transform': props.noAutoTransform }, `vui-sidebar-variant-${props.variant}`]"
      v-bind="attrs"
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
