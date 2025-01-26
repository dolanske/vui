<script setup lang='ts'>
import type { MaybeElement } from '@vueuse/core'
import type { Placement } from '../../shared/types'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import Popout from '../Popout/Popout.vue'
import './dropdown.scss'

// FIXME: figure out how minWidth and expand should work together

export interface Props {
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
  minWidth = 156,
} = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

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
  if (!expand || !window)
    return 0
  return anchorRef.value?.getBoundingClientRect().width
})

defineExpose({
  open,
  close,
  toggle,
  isOpen: showMenu,
})

const mW = computed(() => formatUnitValue(minWidth))
const w = computed(() => expand ? `${anchorWidth.value}px` : 'initial')

const { escape } = useMagicKeys()
whenever(escape, close)

watch(showMenu, (v) => {
  if (!v)
    emit('close')
})

onMounted(() => {
  if (expand && minWidth !== 156)
    console.warn('[Dropdown] Dropdown: minWidth prop is ignored when expand is set to true')
})
</script>

<template>
  <div
    ref="anchor"
    class="vui-dropdown-trigger-wrap"
    role="button"
    :aria-expanded="showMenu"
    :aria-haspopup="true"
    name="Dropdown menu"
  >
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
        minWidth: expand ? w : mW,
        width: w,
      }"
    >
      <slot :open :close :toggle :is-open="showMenu" />
    </Popout>
  </Transition>
</template>

<style scoped lang="scss">
.dropdown-enter-active,
.dropdown-leave-active {
  transition: var(--transition-fast);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
