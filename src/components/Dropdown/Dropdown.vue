<script setup lang='ts'>
import type { Placement } from '@floating-ui/vue'
import type { MaybeElement } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
import Popout from '../Popout/Popout.vue'
import './dropdown.scss'

interface Props {
  /**
   * Tooltip placement related to the anchor
   */
  placement?: Placement

  /**
   *
   */
  minWidth?: number
}

const {
  placement = 'bottom-start',
} = defineProps<Props>()

const anchorRef = useTemplateRef<HTMLDivElement>('anchorRef')
const dropdownRef = useTemplateRef<MaybeElement>('dropdownRef')

const showMenu = ref(false)

function open() {
  showMenu.value = true
}

function close() {
  showMenu.value = false
}

function toggle() {
  showMenu.value = !showMenu.value
}

onClickOutside(dropdownRef, (event) => {
  // Hide dropdown when it is clicked outside EXCEPT when we click the trigger,
  // as that is either by the slot itself
  if (!anchorRef.value?.contains(event.target as Node | null))
    showMenu.value = false
})
</script>

<template>
  <div ref="anchorRef" class="vui-dropdown-trigger-wrap">
    <slot name="trigger" :open :is-open="showMenu" :close :toggle />
  </div>

  <Transition appear name="dropdown">
    <Popout v-if="showMenu" ref="dropdownRef" :anchor="anchorRef" class="vui-dropdown" :placement>
      <slot />
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
