<script setup lang='ts'>
import type { Sizes } from '../../lib/types.ts'
import type { Props as CardProps } from '../Card/Card.vue'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed, ref, useAttrs, useId, useSlots, useTemplateRef, watch } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import { useFocusTrap } from '../../lib/focus.ts'
import { viewport } from '../../lib/viewport.ts'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import './modal.scss'

export interface ModalProps {
  /**
   * Controls the visibility of the modal. Supports `v-model:open`.
   */
  open?: boolean
  /**
   * Controls the width of the modal
   */
  size?: Sizes | 'screen'
  /**
   * Modal wraps a floating card. You can optinally pass in any props you'd pass
   * into the <Card /> component.
   */
  card?: CardProps
  /**
   * Modal will not overflow the screen, but its card's content will be scrollable instead.
   */
  scrollable?: boolean
  /**
   * Modal appears in the center of the screen
   */
  centered?: boolean
  /**
   * Wether modal can be closed by pressing Escape or by clicking the backdrop. If you want to disable the "X" close button, combine this setting with `hideCloseButton`.
   */
  canDismiss?: boolean
  /**
   * Hides the X button in the top right of the modal. The modal can still be closed by other means.
   */
  hideCloseButton?: boolean
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition. This is useful when using the View Transitions API to prevent conflicts between the default animation and the view transition.
   */
  transitionName?: string | 'none'
  /**
   * On mobile, the modal automatically becomes fullscreen. You can configure this
   * breakpoint through the exported `breakpoints` object. This setting disables
   * the default behavior.
   */
  disableMobileFs?: boolean
  /**
   * Accessible label of the close button
   */
  closeLabel?: string
}

defineOptions({
  inheritAttrs: false,
})

const {
  size = 'm',
  card = {},
  scrollable,
  centered,
  canDismiss = true,
  hideCloseButton = false,
  open = false,
  transitionName = 'modal',
  disableMobileFs = false,
  closeLabel = 'Close',
} = defineProps<ModalProps>()

const emit = defineEmits<{
  'close': []
  'update:open': [value: boolean]
}>()

const attrs = useAttrs()
const slots = useSlots()
const rendered = ref(open)
const titleId = useId()

function close() {
  emit('update:open', false)
  emit('close')
}

// Escape and backdrop clicks respect `canDismiss`, the close button does not
function tryClose() {
  if (canDismiss)
    close()
}

function handleAfterLeave() {
  rendered.value = false
}

watch(() => open, (isOpen) => {
  if (isOpen) {
    rendered.value = true
  }
})

const realSize = computed(() => {
  if (viewport.s && !disableMobileFs) {
    return 'screen'
  }

  return size
})

// Focus is moved into the dialog when it opens, kept inside while it is open
// and returned to the previously focused element once it closes
const dialogRef = useTemplateRef<HTMLElement>('dialog')
const backdropRef = useTemplateRef<InstanceType<typeof Backdrop>>('backdrop')
useFocusTrap(dialogRef, () => open && rendered.value, {
  layer: () => backdropRef.value?.layerIndex ?? 0,
})

// The header slot labels the dialog, unless an explicit label was provided
const labelledBy = computed(() => (slots.header && !attrs['aria-label'] && !attrs['aria-labelledby']) ? titleId : undefined)
</script>

<template>
  <Teleport to="body">
    <Backdrop
      v-if="rendered"
      ref="backdrop"
      :class="{ 'p-0': realSize === 'screen' }"
      :leaving="!open"
      @close="tryClose"
    >
      <Transition
        appear
        :name="transitionName === 'none' ? undefined : transitionName"
        :css="transitionName !== 'none'"
        @after-leave="handleAfterLeave"
      >
        <div
          v-if="open"
          ref="dialog"
          class="vui-modal"
          :class="[`vui-modal-size-${realSize}`, { scrollable: scrollable || realSize === 'screen', centered }]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledBy"
          v-bind="attrs"
        >
          <Card v-bind="card">
            <template v-if="$slots.header" #header>
              <div :id="titleId" class="vui-modal-title">
                <slot name="header" :close />
              </div>
            </template>
            <template v-if="!hideCloseButton" #header-end>
              <Button class="vui-modal-close" plain square size="s" :aria-label="closeLabel" @click="close">
                <IconX />
              </Button>
            </template>
            <template v-if="$slots.default" #default>
              <div>
                <slot name="default" :close />
              </div>
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

<style scoped>
@layer vui.reset, vui.base, vui.components, vui.modifiers, vui.utilities;

@layer vui.components {
  .modal-enter-active,
  .modal-leave-active {
    transition: var(--transition);
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(1.025);
  }
}
</style>
