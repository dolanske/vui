<script setup lang='ts'>
import type { Placement } from '@floating-ui/vue'
import { ref, useTemplateRef } from 'vue'

interface Props {
  /**
   * Tooltip placement related to the anchor
   */
  placement?: Placement

  anchor?: HTMLElement
}

const {
  placement = 'bottom',
} = defineProps<Props>()

const dropdownAnchor = useTemplateRef('dropdownAnchor')

const showMenu = ref(false)
</script>

<template>
  <div ref="dropdownAnchor">
    <slot />
  </div>

  <Transition appear name="tooltip">
    <Popout v-if="showMenu" :anchor="dropdownAnchor" class="vui-tooltip" :placement>
      <slot name="tooltip" />
    </Popout>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: 0.1s opacity ease-in-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
