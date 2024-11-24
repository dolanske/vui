<script setup lang='ts'>
import { computed } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import Button from '../Button/Button.vue'
import Divider from '../Divider/Divider.vue'
import './sheet.scss'

interface Props {
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: number | string
  separator?: boolean
}

const {
  position = 'right',
  size = 398,
  separator,
} = defineProps<Props>()

const TRANSITION_OFFSET = 16

const open = defineModel<boolean>()

function close() {
  open.value = false
}

const style = computed(() => {
  const formattedSizeValue = typeof size === 'number' ? `${size}px` : size
  let style

  if (position === 'left' || position === 'right') {
    style = { width: formattedSizeValue }
  }
  // else {
  //   style = { minHeight: formattedSizeValue }
  // }

  return style
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
      <Backdrop v-if="open" @close="open = false">
        <div v-if="open" class="vui-sheet" :class="[`vui-sheet-position-${position}`]" :style>
          <div class="vui-sheet-header">
            <div class="flex-1">
              <slot name="header" :close />
            </div>
            <Button square icon="ph:x" @click="open = false" />
          </div>

          <Divider v-if="separator && $slots.header" :space="1" />

          <div v-if="$slots.default" class="vui-sheet-content">
            <slot :close />
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
