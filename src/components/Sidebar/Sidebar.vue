<script setup lang='ts'>
import { useLocalStorage } from '@vueuse/core'
import { onMounted } from 'vue'
import './sidebar.scss'

const props = withDefaults(defineProps<Props>(), {
  width: 224,
  mini: false,
})

interface Props {
  width: number
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
}

const open = defineModel({
  default: true,
  type: Boolean,
  set(value) {
    localStorage.setItem('sidebar-state', value.toString())
  },
})

onMounted(() => {
  open.value = localStorage.getItem('sidebar-state') !== 'false'
})
</script>

<template>
  <div class="vui-sidebar-outer" :style="{ width: `${props.width}px` }" :class="{ open }">
    <aside class="vui-sidebar" :class="{ open }">
      <div class="vui-sidebar-header">
        header
        {{ open }}
      </div>
      <div class="vui-sidebar-content">
        <div class="vui-sidebar-content-wrap text-xxl">
          content should be scrollable
        </div>
      </div>

      <div class="vui-sidebar-footer">
        footer
      </div>
    </aside>
  </div>
</template>
