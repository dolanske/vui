<script setup lang='ts'>
import { Icon } from '@iconify/vue'

interface Props {
  disabled?: boolean
  icon?: string
}

const props = defineProps<Props>()
</script>

<template>
  <button class="vui-dropdown-item" :class="{ disabled }">
    <!-- This should always be here to offset items which dont have icons -->
    <div class="vui-dropdown-item-icon">
      <Transition name="fade" appear>
        <Icon v-if="props.icon" :icon="props.icon" />
      </Transition>
    </div>

    <div class="vui-dropdown-item-slot">
      <slot />
    </div>

    <div class="vui-dropdown-item-hint">
      <slot name="hint" />
    </div>
  </button>
</template>
