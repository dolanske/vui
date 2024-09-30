<script setup lang='ts'>
import type { Sizes } from '../../shared/types'
import type { Props as CardProps } from '../Card/Card.vue'
import { Transition } from 'vue'
import Backdrop from '../../internal/Backdrop/Backdrop.vue'
import Button from '../Button/Button.vue'
import Card from '../Card/Card.vue'
import './modal.scss'

interface Props {
  size?: Sizes | 'full'
  /**
   * Modal wraps a floating card. You can optinally pass in any props you'd pass
   * into the <Cadr /> component.
   */
  card?: CardProps

  // TODO: this should make header & footer sticky and scrollable through
  // content only Header & footer shouldn't actually be sticky, rather content
  // should be "suspended" in a vertical wrapper with flex: 1 and then
  // absolutely positioned over the wrapper. And use <Scrollable></Scrollable>
  // component
  scrollable?: boolean
}

const {
  size = 'm',
  card = {},
  scrollable,
} = defineProps<Props>()

const open = defineModel<boolean>()

function close() {
  open.value = false
}
</script>

<template>
  <Transition name="modal">
    <Backdrop v-if="open" @close="open = false">
      <div class="vui-modal" :class="[`vui-modal-size-${size}`, { scrollable }]">
        <Card v-bind="card">
          <template v-if="$slots.header" #header>
            <slot name="header" :close />
          </template>
          <template #header-end>
            <Button square icon="ph:x" @click="open = false" />
          </template>
          <template v-if="$slots.default" #default>
            <slot name="default" :close />
          </template>
          <template v-if="$slots.footer" #footer>
            <slot name="footer" :close />
          </template>
        </Card>
      </div>
    </Backdrop>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: var(--transition-slow);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
