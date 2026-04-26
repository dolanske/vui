<script setup lang='ts'>
import type { Props as CardProps } from '../Card/Card.vue'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed, ref, useAttrs, watch } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import { formatUnitValue } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import './sheet.scss'

defineOptions({
  inheritAttrs: false,
})

const {
  position = 'right',
  size = 398,
  card = {
    separators: false,
  },
  open = false,
  transitionName = 'sheet',
  canDismiss = true,
  hideCloseButton = false,
} = defineProps<Props>()

const emit = defineEmits<{ close: [] }>()

const attrs = useAttrs()
const rendered = ref(open)

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
  /**
   * Wether sheet can be closed by pressing Escape or by clicking the backdrop. If you want to disable the "X" close button, combine this setting with `hideCloseButton`.
   */
  canDismiss?: boolean
  /**
   * Hides the X button in the top right of the sheet. The sheet can still be closed by other means.
   */
  hideCloseButton?: boolean
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition
   */
  transitionName?: string | 'none'
}

function tryClose() {
  if (canDismiss) {
    emit('close')
  }
}

function handleAfterLeave() {
  rendered.value = false
}

watch(() => open, (isOpen) => {
  if (isOpen) {
    rendered.value = true
  }
})

const TRANSITION_OFFSET = 16

const style = computed(() => {
  if (position === 'left' || position === 'right') {
    return { maxWidth: formatUnitValue(size) }
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
    <Backdrop v-if="rendered" @close="tryClose">
      <Transition
        appear
        :name="transitionName === 'none' ? undefined : transitionName"
        :css="transitionName !== 'none'"
        @after-leave="handleAfterLeave"
      >
        <div v-if="open" class="vui-sheet-shell">
          <Card
            class="vui-sheet"
            :class="[`vui-sheet-position-${position}`]" :style
            v-bind="{ ...card, ...attrs }"
          >
            <template v-if="$slots.header" #header>
              <slot name="header" :close="() => emit('close')" />
            </template>
            <template v-if="!hideCloseButton" #header-end>
              <Button plain square size="s" @click="emit('close')">
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
        </div>
      </Transition>
    </Backdrop>
  </Teleport>
</template>

<style scoped lang="scss">
.vui-backdrop {
  padding: 0;
}

.vui-sheet-shell {
  position: relative;
  width: 100%;
  height: 100%;
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
