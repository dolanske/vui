<script setup lang='ts'>
import { onClickOutside, useCssVar, useMouseInElement, useTimeoutFn, watchThrottled } from '@vueuse/core'
import { computed, onBeforeMount, onMounted, useSlots, useTemplateRef } from 'vue'
import { isNil } from '../../lib/helpers'
import './sidebar.scss'

interface Props {
  /**
   * Sidebar styling.
   *
   * - default: border on the right
   * - plain: no styling except padding
   * - card: radius & border around the entire sidebar
   */
  variant: 'default' | 'plain' | 'card'
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
  mini: false,
  appearDelay: 250,
})

const sidebarInner = useTemplateRef('inner')
const open = defineModel<boolean>({
  default: true,
})
const slots = useSlots()

const widthFull = useCssVar('--vui-sidebar-width-full', sidebarInner, {
  initialValue: '224px',
})

const widthMini = useCssVar('--vui-sidebar-width-mini', sidebarInner, {
  initialValue: '68px',
})

const offset = useCssVar('--vui-sidebar-offset', sidebarInner)

// const outerWidth = computed(() => {
//   const elWidth = sidebarInner.value?.getBoundingClientRect().width

//   if (props.appear) {
//     return 0
//   }

//   if (props.floaty) {
//     return props.mini
//       ? `calc(${elWidth} + ${offset.value})`
//       : `calc(${props.width}px + ${offset.value})`
//   }

//   if (!props.mini) {
//     return `${props.width}px`
//   }

//   return `${elWidth}px`
// })

// const innerWidth = computed(() => {
//   if (props.mini) {
//     return 'auto'
//   }

//   return props.width
// })

const slotProps = computed(() => ({
  mini: props.mini,
  // floaty: props.floaty,
  // width: props.width,
  open,
  close: () => open.value = false,
}))

// Sidebar `appear` implementation
const { start, stop, isPending } = useTimeoutFn(() => {
  if (props.appear) {
    open.value = true
  }
}, () => props.appearDelay)

const APPEAR_OFFSET = 32

const sidebarOuter = useTemplateRef('outer')

const { elementX, elementY, elementHeight } = useMouseInElement(sidebarOuter)

onMounted(() => {
  // If appear is set on mount, but sidebar is open, close it
  if (props.appear && open.value) {
    open.value = false
  }
})

// TODO: must convert pix to values, combine and back to px
const outerWidth = computed(() => {
  if (props.mini) {
    return props.variant === 'card'
      ? widthMini.value + (offset.value * 2)
      : widthMini.value
  }

  return props.variant === 'card'
})

// FIXME: this doeasnt seem to take in account height outside of sidebar
watchThrottled([elementX, elementY], (pos) => {
  if (!props.appear || (pos <= APPEAR_OFFSET && pos >= 0 && isPending.value))
    return

  if (pos <= APPEAR_OFFSET && pos >= 0 && !open.value && !isPending.value) {
    start()
  }
  else if (isPending.value) {
    stop()
  }

  // FIXME: use iiner / outer width
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
  immediate: true,
})

onClickOutside(sidebarInner, () => {
  if (open.value && props.float) {
    open.value = false
  }
})
</script>

<template>
  <div ref="outer" class="vui-sidebar-outer" :style="{ width: mini ? widthMini : widthFull }" :class="{ open, `manual-buttons`: manualButtons }">
    <aside
      ref="inner"
      class="vui-sidebar"
      :class="{ open, floaty: props.floaty, mini: props.mini }"
      :style="{ '--vui-sidebar-width': `${innerWidth}px` }"
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
