<script setup lang="ts">
import { Icon } from '@iconify/vue'

export interface TabProps {
  disabled?: boolean
  value: string
  icon?: string
}

const props = defineProps<TabProps>()
</script>

<template>
  <button
    class="vui-tab"
    :class="{ disabled: props.disabled }"
    role="tab"
    :name="value"
  >
    <slot>
      <Icon v-if="props.icon" :icon="props.icon" />
      {{ props.value }}
    </slot>
  </button>
</template>
