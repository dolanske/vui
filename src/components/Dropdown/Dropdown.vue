<script setup lang='ts'>
import type { Placement } from '../../shared/types'
import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { formatUnitValue } from '../../shared/helpers'
import Popout from '../Popout/Popout.vue'
import './dropdown.scss'

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

  /**
   * Set he max height of the dropdown element before it starts scrolling
   */
  maxHeight?: number | string
}

const {
  placement = 'bottom-start',
  maxHeight = 356,
  expand,
  minWidth = 156,
} = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const anchorRef = useTemplateRef<HTMLDivElement>('anchor')
// const dropdownRef = useTemplateRef<MaybeElement>('dropdown')

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

// onClickOutside(dropdownRef, () => {
//   showMenu.value = false
// }, {
//   ignore: [anchorRef],
// })

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

function handleContentClick(event: MouseEvent) {
  const target = event.target as HTMLElement

  // Check if the click was on a DropdownItem or inside one
  // We use a CSS class selector to identify "closable" items
  if (target.closest('.vui-dropdown-item')) {
    close()
  }
}
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

  <Popout
    :visible="showMenu"
    :anchor="anchorRef"
    class="vui-dropdown"
    :placement
    :style="{
      minWidth: expand ? w : mW,
      maxHeight: formatUnitValue(maxHeight),
    }"
    @click-outside="close"
    @click="handleContentClick"
  >
    <slot :open :close :toggle :is-open="showMenu" />
  </Popout>
</template>
