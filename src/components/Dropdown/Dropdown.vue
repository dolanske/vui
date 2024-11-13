<script setup lang='ts'>
import type { Placement } from '@floating-ui/vue'
import type { MaybeElement } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import Popout from '../Popout/Popout.vue'
import './dropdown.scss'

interface Props {
  /**
   * Tooltip placement related to the anchor
   */
  placement?: Placement
  /**
   * Set the minimum width of the dropdown element
   */
  minWidth?: number | string
  /**
   * Sets the width of the dropdown to the width of its anchor
   */
  expand?: boolean
}

const {
  placement = 'bottom-start',
  expand,
  minWidth,
} = defineProps<Props>()

const anchorRef = useTemplateRef<HTMLDivElement>('anchor')
const dropdownRef = useTemplateRef<MaybeElement>('dropdown')

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

const anchorWidth = computed(() => {
  if (!expand)
    return 0
  return anchorRef.value?.getBoundingClientRect().width
})

defineExpose({
  open,
  close,
  toggle,
  isOpen: showMenu,
})
</script>

<template>
  <div ref="anchor" class="vui-dropdown-trigger-wrap">
    <slot name="trigger" :open :is-open="showMenu" :close :toggle />
  </div>

  <Transition appear name="dropdown">
    <Popout
      v-if="showMenu"
      ref="dropdown"
      :anchor="anchorRef"
      class="vui-dropdown"
      :placement
      :style="{
        minWidth: `${minWidth ?? 156}px`,
        ...(expand && { width: `${anchorWidth}px` }),
      }"
    >
      <slot :open :close :toggle :is-open="showMenu" />
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
