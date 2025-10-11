<script setup lang='ts'>
import type { Props as CardProps } from '../Card/Card.vue'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import { formatUnitValue } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
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
   * Modal wraps a floating card. You can optinally pass in any props you'd pass
   * into the <Card /> component.
   */
  card?: CardProps
}

const {
  position = 'right',
  size = 398,
  card = {
    separators: false,
  },
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
        <Card
          v-if="open"
          class="vui-sheet"
          :class="[`vui-sheet-position-${position}`]" :style
          v-bind="card"
        >
          <template v-if="$slots.header" #header>
            <slot name="header" :close="() => emit('close')" />
          </template>
          <template #header-end>
            <Button plain square @click="emit('close')">
              <IconX />
            </Button>
          </template>
          <template #default>
            <slot :close="() => emit('close')" />
          </template>
          <template v-if="$slots.footer" #footer>
            <slot name="footer" :close="() => emit('close')" />
          </template>
        </Card>
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
