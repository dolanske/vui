<script setup lang='ts'>
import type { Sizes } from '../../shared/types'
import type { Props as CardProps } from '../Card/Card.vue'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed, useAttrs } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
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
   * Wether modal can be closed by clicking the X button
   */
  canDismiss?: boolean
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition
   */
  transitionName?: string | 'disabled'
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
  open = false,
  transitionName = 'modal',
} = defineProps<ModalProps>()

const emit = defineEmits<{ close: [] }>()

const attrs = useAttrs()

function tryClose() {
  if (canDismiss) {
    emit('close')
  }
}

const transition = computed(() => {
  if (transitionName === 'none')
    return undefined

  return transitionName
})
</script>

<template>
  <Teleport to="body">
    <Transition appear :name="transition">
      <Backdrop v-if="open" :class="{ 'p-0': size === 'screen' }" @close="tryClose">
        <div class="vui-modal" :class="[`vui-modal-size-${size}`, { scrollable: scrollable || size === 'screen', centered }]" v-bind="attrs" @click.self="tryClose">
          <Card v-bind="card">
            <template v-if="$slots.header" #header>
              <slot name="header" :close="() => emit('close')" />
            </template>
            <template #header-end>
              <Button
                v-if="canDismiss"
                class="vui-modal-close"
                plain
                square
                @click="emit('close')"
              >
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
      </Backdrop>
    </Transition>
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
