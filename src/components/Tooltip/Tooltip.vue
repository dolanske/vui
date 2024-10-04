<script setup lang='ts'>
import { ref, useTemplateRef } from 'vue'
import Popout from '../Popout/Popout.vue'

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
  <!-- <Transition appear name="tooltip"> -->
  <Popout v-if="showTooltip" :anchor="popoutAnchor">
    <slot name="tooltip" />
  </Popout>
  <!-- </Transition> -->
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: var(--transition);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  /* transform: scale(0.95); */
}
</style>
