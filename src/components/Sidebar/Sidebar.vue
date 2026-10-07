<script setup lang='ts'>
import { onClickOutside, useCssVar, useElementSize, useEventListener, useThrottleFn, useTimeoutFn } from '@vueuse/core'
import { computed, onMounted, useAttrs, useSlots, useTemplateRef, watch } from 'vue'
import { formatUnitValue } from '../../lib/helpers'
import { useLayer } from '../../lib/layerManager'
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
   * from. Keyboard focus and touching the screen edge open it as well.
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
  /**
   * Accessible name of the sidebar landmark
   */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  mini: false,
  appearDelay: 250,
  label: 'Sidebar',
})

const APPEAR_DETECT_THRESHOLD = 24
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

// Closing is deferred until the click has been fully dispatched. Otherwise
// clicking a toggle button outside the sidebar would first close it here and
// then immediately re-open it in the button's own click handler.
onClickOutside(sidebarInner, () => {
  if (open.value && props.float) {
    setTimeout(() => {
      open.value = false
    })
  }
})

// Floating sidebars are overlays: Escape closes them and focus returns to
// where it was before the sidebar opened
let returnFocusTo: HTMLElement | null = null
const { openLayer, closeLayer } = useLayer({
  onEscape: () => {
    open.value = false
    returnFocusTo?.focus({ preventScroll: true })
  },
})

watch(() => props.float && open.value, (isOverlay) => {
  if (isOverlay) {
    returnFocusTo = document.activeElement as HTMLElement | null
    openLayer()
  }
  else {
    closeLayer()
  }
})

// Sidebar `appear` implementation
const { start, stop, isPending } = useTimeoutFn(() => {
  if (props.appear) {
    open.value = true
  }
}, () => props.appearDelay, { immediate: false })

onMounted(() => {
  // If appear is set on mount, but sidebar is open, close it
  if (props.appear && open.value) {
    open.value = false
  }
})

const { width: sidebarWidth } = useElementSize(sidebarInner)

// Outer width. A missing offset variable must not produce a NaN width.
const openWidth = computed(() => {
  const _offset = Number.parseFloat(offset.value ?? '') || 0
  const val = sidebarWidth.value
  return props.variant === 'card' ? val + (_offset * 2) : val
})

// Mouse tracking is only active while `appear` is enabled
const onMouseMove = useThrottleFn((event: MouseEvent) => {
  const outer = sidebarOuter.value
  if (!outer)
    return

  const rect = outer.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const inTriggerZone = x <= APPEAR_DETECT_THRESHOLD && x >= 0

  if (inTriggerZone && isPending.value)
    return

  if (inTriggerZone && !open.value && !isPending.value) {
    start()
  }
  else if (isPending.value) {
    stop()
  }

  const withinVerticalBounds = y >= 0 && y <= rect.height
  // While focus is inside, the sidebar stays open for keyboard users
  const hasFocus = sidebarInner.value?.contains(document.activeElement)

  if ((x > APPEAR_DETECT_THRESHOLD + openWidth.value || x < 0 || !withinVerticalBounds) && open.value && !hasFocus) {
    open.value = false
  }
}, 100)

useEventListener(() => props.appear ? document : null, 'mousemove', onMouseMove, { passive: true })

// Touch devices never hover, touching the edge opens the sidebar instead
useEventListener(() => props.appear ? document : null, 'pointerdown', (event: PointerEvent) => {
  if (event.pointerType === 'mouse' || open.value)
    return
  const rect = sidebarOuter.value?.getBoundingClientRect()
  if (rect && event.clientX - rect.left <= APPEAR_DETECT_THRESHOLD && event.clientX >= rect.left)
    open.value = true
}, { passive: true })

// Keyboard users open an `appear` sidebar by tabbing into it
function onFocusIn() {
  if (props.appear && !open.value) {
    stop()
    open.value = true
  }
}

function onFocusOut(event: FocusEvent) {
  if (props.appear && !sidebarInner.value?.contains(event.relatedTarget as Node | null))
    open.value = false
}
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
      :aria-label="props.label"
      v-bind="attrs"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
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
