<script setup lang='ts'>
import type { Props as CardProps } from '../Card/Card.vue'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed, ref, useAttrs, useId, useSlots, useTemplateRef, watch } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import { useFocusTrap } from '../../lib/focus.ts'
import { formatUnitValue } from '../../lib/helpers.ts'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import './sheet.scss'

defineOptions({
  inheritAttrs: false,
})

const {
  position = 'right',
  size,
  card = {
    separators: false,
  },
  open = false,
  transitionName = 'sheet',
  canDismiss = true,
  hideCloseButton = false,
  closeLabel = 'Close',
} = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'update:open': [value: boolean]
}>()

const attrs = useAttrs()
const slots = useSlots()
const rendered = ref(open)
const titleId = useId()

interface Props {
  /**
   * Controls the visibility of the sheet. Supports `v-model:open`.
   */
  open?: boolean
  /**
   * Controls the position of the sheet
   */
  position?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * Maximum width of left / right sheets (defaults to 398px), or maximum
   * height of top / bottom sheets (defaults to 35dvh)
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
   * Setting the value to `none` will not apply any transition. This is useful when using the View Transitions API to prevent conflicts between the default animation and the view transition.
   */
  transitionName?: string | 'none'
  /**
   * Accessible label of the close button
   */
  closeLabel?: string
}

function close() {
  emit('update:open', false)
  emit('close')
}

function tryClose() {
  if (canDismiss) {
    close()
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
const DEFAULT_WIDTH = 398

const style = computed(() => {
  if (position === 'left' || position === 'right') {
    return { maxWidth: formatUnitValue(size ?? DEFAULT_WIDTH) }
  }

  // Top & bottom sheets keep the CSS default unless a size is provided
  return size !== undefined
    ? { '--vui-sheet-max-height': formatUnitValue(size) }
    : undefined
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

const sheetRef = useTemplateRef<InstanceType<typeof Card>>('sheet')
const backdropRef = useTemplateRef<InstanceType<typeof Backdrop>>('backdrop')
useFocusTrap(() => sheetRef.value?.$el as HTMLElement | undefined, () => open && rendered.value, {
  layer: () => backdropRef.value?.layerIndex ?? 0,
})

const labelledBy = computed(() => (slots.header && !attrs['aria-label'] && !attrs['aria-labelledby']) ? titleId : undefined)
</script>

<template>
  <Teleport to="body">
    <Backdrop v-if="rendered" ref="backdrop" :leaving="!open" @close="tryClose">
      <Transition
        appear
        :name="transitionName === 'none' ? undefined : transitionName"
        :css="transitionName !== 'none'"
        @after-leave="handleAfterLeave"
      >
        <div v-if="open" class="vui-sheet-shell">
          <Card
            ref="sheet"
            class="vui-sheet"
            :class="[`vui-sheet-position-${position}`]"
            :style
            role="dialog"
            aria-modal="true"
            :aria-labelledby="labelledBy"
            v-bind="{ ...card, ...attrs }"
          >
            <template v-if="$slots.header" #header>
              <div :id="titleId" class="vui-sheet-title">
                <slot name="header" :close />
              </div>
            </template>
            <template v-if="!hideCloseButton" #header-end>
              <Button plain square size="s" :aria-label="closeLabel" @click="close">
                <IconX />
              </Button>
            </template>
            <template #default>
              <slot :close />
            </template>
            <template v-if="$slots.footer" #footer>
              <slot name="footer" :close />
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
  pointer-events: none;
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
