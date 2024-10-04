<script setup lang='ts'>
import type { UseFloatingOptions } from '@floating-ui/vue'
import { ref, useTemplateRef } from 'vue'
import Popout from '../Popout/Popout.vue'

interface Props {
  options?: UseFloatingOptions
}

const props = defineProps<Props>()

const popoutAnchor = useTemplateRef('popoutAnchor')
const showTooltip = ref(false)
</script>

<template>
  <div
    ref="popoutAnchor"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <slot />
  </div>
  <Transition appear name="tooltip">
    <Popout v-if="showTooltip" :anchor="popoutAnchor" :options="props.options">
      <slot name="tooltip" />
    </Popout>
  </Transition>
</template>

<!-- <style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: var(--transition);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style> -->
