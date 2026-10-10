<script setup lang="ts">
import { computed } from 'vue'
import { getTabId, getTabPanelId } from './tabs'

interface Props {
  /**
   * The `id` of the Tabs component this panel belongs to
   */
  tabs: string
  /**
   * Value of the Tab which shows this panel
   */
  value: string
  /**
   * Currently active tab value, usually the same ref bound to the Tabs `v-model`
   */
  active?: string
  /**
   * Keeps the panel rendered (but hidden) while inactive, preserving its state
   */
  keepMounted?: boolean
}

const props = defineProps<Props>()

const isActive = computed(() => props.active === props.value)
</script>

<template>
  <div
    v-if="isActive || props.keepMounted"
    v-show="isActive"
    :id="getTabPanelId(props.tabs, props.value)"
    class="vui-tab-panel"
    role="tabpanel"
    tabindex="0"
    :aria-labelledby="getTabId(props.tabs, props.value)"
  >
    <slot />
  </div>
</template>
