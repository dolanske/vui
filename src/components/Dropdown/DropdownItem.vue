<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import './dropdown-item.scss'

interface Props {
  disabled?: boolean
  icon?: string
  iconEnd?: string
}

const props = defineProps<Props>()
</script>

<template>
  <button class="vui-dropdown-item" :class="{ disabled }">
    <!-- This should always be here to offset items which dont have icons -->
    <div class="vui-dropdown-item-icon">
      <Icon v-if="props.icon" :icon="props.icon" />
    </div>

    <div class="vui-dropdown-item-slot">
      <slot />
    </div>

    <div class="vui-dropdown-item-hint">
      <slot name="hint" />
    </div>

    <div v-if="props.iconEnd" class="vui-dropdown-item-icon">
      <Icon :icon="props.iconEnd" />
    </div>
  </button>
</template>
