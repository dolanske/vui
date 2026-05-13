<script lang="ts" setup>
import './dropdown-title.scss'

const { sticky } = defineProps<{
  sticky?: boolean
}>()
</script>

<template>
  <div class="vui-dropdown-title" :class="{ sticky }">
    <slot />
    <div v-if="$slots.end" class="vui-dropdown-title-end">
      <slot name="end" />
    </div>
  </div>
</template>
