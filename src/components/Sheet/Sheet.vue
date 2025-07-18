<script setup lang='ts'>
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import { formatUnitValue } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import Divider from '../Divider/Divider.vue'
import './sheet.scss'

interface Props {
  /**
   * Controls the visibility of the sheet
   */
  open?: boolean
  /**
   * Controls the position of the sheet
   */
  position?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * Sets the width of the sheet
   */
  size?: number | string
  /**
   * Wether to show a divider between header and content
   */
  separator?: boolean
}

const {
  position = 'right',
  size = 398,
  separator,
  open = false,
} = defineProps<Props>()

const emit = defineEmits<{ close: [] }>()

const TRANSITION_OFFSET = 16

const style = computed(() => {
  if (position === 'left' || position === 'right') {
    return { width: formatUnitValue(size) }
  }

  return undefined
})

// Used to compute base location so that sheet appears to animate form the edge of the screen
const baseTransform = computed(() => {
  switch (position) {
    case 'left': return `translate(-${TRANSITION_OFFSET}px, 0)`
    case 'top': return `translate(0, -${TRANSITION_OFFSET}px)`
    case 'bottom': return `translate(0, ${TRANSITION_OFFSET}px)`
    case 'right':
    default: return `translate(${TRANSITION_OFFSET}px, 0)`
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition appear name="sheet">
      <Backdrop v-if="open" @close="emit('close')">
        <div v-if="open" class="vui-sheet" :class="[`vui-sheet-position-${position}`]" :style>
          <div class="vui-sheet-header">
            <slot name="header" :close="() => emit('close')" />
            <Button plain square @click="emit('close')">
              <IconX />
            </Button>
          </div>

          <Divider v-if="separator && $slots.header" :size="1" />

          <div v-if="$slots.default" class="vui-sheet-content">
            <slot :close="() => emit('close')" />
          </div>

          <Divider v-if="separator && $slots.footer" :size="1" />

          <div class="vui-sheet-footer">
            <slot name="footer" :close="() => emit('close')" />
          </div>
        </div>
      </Backdrop>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.vui-backdrop {
  padding: 0;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: var(--transition);
}

.sheet-enter-to,
.sheet-leave-from {
  transform: translate(0, 0);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: v-bind(baseTransform);
}
</style>
