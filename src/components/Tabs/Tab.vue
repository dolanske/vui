<script setup lang="ts">
export interface TabProps {
  disabled?: boolean
  value: string
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
      {{ props.value }}
    </slot>
  </button>
</template>
