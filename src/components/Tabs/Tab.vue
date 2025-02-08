<script setup lang="ts">
import { Icon } from '@iconify/vue'

export interface TabProps {
  disabled?: boolean
  label?: string
  icon?: string
}
const props = defineProps<TabProps>()
</script>

<template>
  <button
    class="vui-tab"
    :data-tab-id="label"
    :class="{ disabled: props.disabled }"
    role="tab"
    :name="label"
  >
    <slot>
      <Icon v-if="props.icon" :icon="props.icon" />
      {{ props.label }}
    </slot>
  </button>
</template>
