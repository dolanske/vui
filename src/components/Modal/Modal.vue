<script setup lang='ts'>
import type { Sizes } from '../../shared/types'
import type { Props as CardProps } from '../Card/Card.vue'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed, ref, useAttrs, watch } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import { Breakpoints, useBreakpoint } from '../../shared/breakpoints'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import './modal.scss'

export interface ModalProps {
  /**
   * Controls the visibility of the modal
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
   * breakpoint by setting a custom `vuiBreakpoints` mobile variable. This
   * setting disables the default behavior.
   */
  disableMobileFs?: boolean
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
} = defineProps<ModalProps>()

const emit = defineEmits<{ close: [] }>()

const attrs = useAttrs()
const rendered = ref(open)

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

// Automatically change modal to fullscreen on mobile
const isMobile = useBreakpoint(Breakpoints.Mobile)

const realSize = computed(() => {
  if (isMobile.value && !disableMobileFs) {
    return 'screen'
  }

  return size
})
</script>

<template>
  <Teleport to="body">
    <Backdrop v-if="rendered" :class="{ 'p-0': realSize === 'screen' }" @close="tryClose">
      <Transition
        appear
        :name="transitionName === 'none' ? undefined : transitionName"
        :css="transitionName !== 'none'"
        @after-leave="handleAfterLeave"
      >
        <div
          v-if="open"
          class="vui-modal"
          :class="[`vui-modal-size-${realSize}`, { scrollable: scrollable || realSize === 'screen', centered }]"
          v-bind="attrs"
        >
          <Card v-bind="card">
            <template v-if="$slots.header" #header>
              <slot name="header" :close="() => emit('close')" />
            </template>
            <template v-if="!hideCloseButton" #header-end>
              <Button class="vui-modal-close" plain square size="s" @click="emit('close')">
                <IconX />
              </Button>
            </template>
            <template v-if="$slots.default" #default>
              <div>
                <slot name="default" :close="() => emit('close')" />
              </div>
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

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: var(--transition);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.025);
}
</style>
