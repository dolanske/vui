<script setup lang='ts'>
import { useCssVar, useLocalStorage } from '@vueuse/core'
import { computed, onMounted, useSlots, useTemplateRef } from 'vue'
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
   * Sidebar will always float over content.
   */
  fixed?: boolean

  /**
   * Add edges of background around sidebar
   */
  floaty?: boolean
}

const sidebar = useTemplateRef('sidebar')
const open = defineModel<boolean>()
const slots = useSlots()
const offset = useCssVar('--vui-sidebar-float-offset', sidebar, {
  initialValue: '8px',
})

const width = computed(() => {
  if (!props.floaty)
    return `${props.width}px`
  return `calc(${props.width}px - ${offset.value})`
})

const slotProps = computed(() => ({
  mini: props.mini,
  floaty: props.floaty,
  width: props.width,
  open,
}))
</script>

<template>
  <div class="vui-sidebar-outer" :style="{ width }" :class="{ open }">
    <aside ref="sidebar" class="vui-sidebar" :class="{ open, floaty: props.floaty }">
      <div v-if="slots.header" class="vui-sidebar-header">
        <slot name="header" v-bind="slotProps" />
      </div>
      <div class="vui-sidebar-content">
        <div class="vui-sidebar-content-wrap text-xxl">
          <slot v-bind="slotProps" />
        </div>
      </div>

      <div v-if="slots.footer" class="vui-sidebar-footer">
        <slot name="footer" v-bind="slotProps" />
      </div>
    </aside>
  </div>
</template>
