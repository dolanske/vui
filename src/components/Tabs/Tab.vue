<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

export interface TabProps {
  disabled?: boolean
  id?: string
  label: string
  icon?: string
}

const props = defineProps<TabProps>()
const id = computed(() => props.id ?? props.label)
</script>

<template>
  <button
    class="vui-tab"
    :data-tab-id="id"
    :class="{ disabled: props.disabled }"
    role="tab"
    :name="id"
  >
    <Icon v-if="props.icon" :icon="props.icon" />
    {{ props.label }}
  </button>
</template>
