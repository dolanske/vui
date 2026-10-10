<script setup lang="ts">
import { computed, inject, onUnmounted, watch } from 'vue'
import { getTabId, getTabPanelId, TABS_KEY } from './tabs'

export interface TabProps {
  disabled?: boolean
  value: string
}

const props = defineProps<TabProps>()

// Tabs owns the active value. A Tab rendered on its own still works as a
// plain button, it just never becomes active by itself.
const context = inject(TABS_KEY, null)

if (context) {
  onUnmounted(context.register())
  watch(() => props.value, () => context.notify())
}

const isActive = computed(() => !!context && context.active.value === props.value)
const isDisabled = computed(() => !!props.disabled || !!context?.disabled.value)

// Ids linking the tab with its TabPanel, only when panels are used
const tabId = computed(() => context?.linkedId.value ? getTabId(context.linkedId.value, props.value) : undefined)
const panelId = computed(() => context?.linkedId.value ? getTabPanelId(context.linkedId.value, props.value) : undefined)

function select() {
  if (!isDisabled.value)
    context?.select(props.value)
}
</script>

<template>
  <button
    :id="tabId"
    type="button"
    class="vui-tab"
    :class="{ disabled: isDisabled, active: isActive }"
    role="tab"
    :aria-selected="isActive"
    :aria-controls="panelId"
    :tabindex="context ? (isActive ? 0 : -1) : undefined"
    :disabled="isDisabled"
    :data-value="props.value"
    @click="select"
  >
    <slot>
      {{ props.value }}
    </slot>
  </button>
</template>
