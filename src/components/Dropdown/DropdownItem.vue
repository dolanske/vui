<script setup lang='ts'>
interface Props {
  disabled?: boolean
  icon?: string
}

const props = defineProps<Props>()
</script>

<template>
  <button class="vui-dropdown-item">
    <!-- This should always be here to offset items which dont have icons -->
    <div class="vui-dropdown-item-icon" />
    <slot />
  </button>
</template>
