<script setup lang='ts'>
import './dropdown-item.scss'

interface Props {
  disabled?: boolean
  size?: 's' | 'm'
}

const props = defineProps<Props>()
</script>

<template>
  <button
    class="vui-dropdown-item"
    :class="{
      disabled: props.disabled,
      [`vui-dropdown-item-size-${props.size}`]: props.size,
    }"
    :disabled="props.disabled"
  >
    <!-- This should always be here to offset items which dont have icons -->
    <div class="vui-dropdown-item-icon">
      <slot name="icon" />
    </div>

    <div class="vui-dropdown-item-slot">
      <slot />
    </div>

    <div v-if="$slots.hint" class="vui-dropdown-item-hint">
      <slot name="hint" />
    </div>

    <div v-if="$slots.iconEnd" class="vui-dropdown-item-icon-end">
      <slot name="iconEnd" />
    </div>
  </button>
</template>
