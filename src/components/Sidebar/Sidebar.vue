<script setup lang='ts'>
import { useCssVar, useMouseInElement, useTimeoutFn, watchThrottled } from '@vueuse/core'
import { computed, onMounted, useSlots, useTemplateRef } from 'vue'
import { isNil } from '../../shared/helpers'
import './sidebar.scss'

const props = withDefaults(defineProps<Props>(), {
  width: 224,
  mini: false,
})

interface Props {
  width?: number
  /**
   * Controls wether the sidebar is displayed in full size, or a small version
   */
  mini?: boolean
  /**
   * Allow sidebar showing up, when user hovers at very left of the screen. The
   * sidebar will apear over content, not pushing anything over
   */
  appear?: boolean
  /**
   * Add edges of background around sidebar
   */
  floaty?: boolean
}

const sidebar = useTemplateRef('sidebar')
const open = defineModel<boolean>({
  default: true,
})
const slots = useSlots()
const offset = useCssVar('--vui-sidebar-float-offset', sidebar, {
  initialValue: '8px',
})

const width = computed(() => {
  if (props.mini) {
    return props.floaty ? '73px' : `65px`
  }
  if (!props.floaty)
    return `${props.width}px`
  return `calc(${props.width}px + ${offset.value})`
})

const slotProps = computed(() => ({
  mini: props.mini,
  floaty: props.floaty,
  width: props.width,
  open,
  close: () => open.value = false,
}))

// Sidebar `appear` implementation
const { start, stop, isPending } = useTimeoutFn(() => {
  if (props.appear) {
    open.value = true
  }
}, 250)

const APPEAR_OFFSET = 32

const wrap = useTemplateRef('wrap')
const { elementX } = useMouseInElement(wrap)

onMounted(() => {
  if (props.appear && open.value) {
    open.value = false
  }
})

watchThrottled(elementX, (pos) => {
  if (!props.appear || (pos <= APPEAR_OFFSET && pos >= 0 && isPending.value))
    return

  if (pos <= APPEAR_OFFSET && pos >= 0 && !open.value && !isPending.value) {
    start()
  }
  else if (isPending.value) {
    stop()
  }

  const openWidth = props.mini
    ? 65
    : props.floaty
      ? props.width
      : props.width - (isNil(offset.value) ? 0 : Number(offset.value?.replace('px', '')))

  if ((pos > APPEAR_OFFSET + openWidth || pos < 0) && open.value) {
    open.value = false
  }
}, {
  throttle: 100,
})
</script>

<template>
  <div ref="wrap" class="vui-sidebar-outer" :style="{ width }" :class="{ open }">
    <aside ref="sidebar" class="vui-sidebar" :class="{ open, floaty: props.floaty, mini: props.mini }" :style="{ width: `${props.mini ? 65 : props.width}px` }">
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
