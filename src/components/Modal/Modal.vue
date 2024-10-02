<script setup lang='ts'>
import type { Sizes } from '../../shared/types'
import type { Props as CardProps } from '../Card/Card.vue'
import { Transition, useAttrs } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import './modal.scss'

interface Props {
  size?: Sizes | 'full'
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
}

const {
  size = 'm',
  card = {},
  scrollable,
  centered,
} = defineProps<Props>()

const open = defineModel<boolean>()

function close() {
  open.value = false
}

const attrs = useAttrs()
</script>

<template>
  <Teleport to="body">
    <Transition appear name="modal">
      <Backdrop v-if="open" @close="open = false">
        <div class="vui-modal" :class="[`vui-modal-size-${size}`, { scrollable, centered }]" v-bind="attrs">
          <Card v-bind="card">
            <template v-if="$slots.header" #header>
              <slot name="header" :close />
            </template>
            <template #header-end>
              <Button square icon="ph:x" @click="open = false" />
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
  transform: scale(0.95);
}
</style>
