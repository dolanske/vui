<script setup lang='ts'>
import type { Variants } from '../Button/Button.vue'
import type { ModalProps } from './Modal.vue'
import { computed, useAttrs } from 'vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import Modal from './Modal.vue'

type Props = {
  /**
   * Rendered in the header and used as the accessible name of the dialog
   */
  title?: string
  /**
   * Text rendered in the body. The default slot can be used for richer content.
   */
  content?: string
  confirmText?: string
  confirmVariant?: Variants
  cancelText?: string
  showCancel?: boolean
} & Partial<ModalProps>

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  cancelText: 'Cancel',
  confirmText: 'Ok',
  size: 's',
  canDismiss: true,
  showCancel: true,
  confirmVariant: 'gray',
  open: false,
})

const emit = defineEmits<{
  'cancel': []
  'confirm': []
  'close': []
  'update:open': [value: boolean]
}>()

const attrs = useAttrs()

// Only Modal props are forwarded. Confirm specific props such as `title` or
// `content` would otherwise end up as HTML attributes on the dialog.
const modalProps = computed<Partial<ModalProps>>(() => ({
  size: props.size,
  card: props.card,
  scrollable: props.scrollable,
  centered: props.centered,
  canDismiss: props.canDismiss,
  hideCloseButton: props.hideCloseButton,
  transitionName: props.transitionName,
  disableMobileFs: props.disableMobileFs,
  closeLabel: props.closeLabel,
}))

function close() {
  emit('update:open', false)
  emit('close')
}

function cancel() {
  emit('cancel')
  close()
}

function confirm() {
  emit('confirm')
  close()
}

// Template note:
// Dismissing the dialog (Escape, backdrop, X) counts as cancelling
</script>

<template>
  <Modal
    v-bind="{ ...modalProps, ...attrs }"
    :open="props.open"
    role="alertdialog"
    @close="cancel"
  >
    <template v-if="props.title || $slots.header" #header>
      <slot name="header">
        <h4 class="vui-confirm-title">
          {{ props.title }}
        </h4>
      </slot>
    </template>
    <template v-if="props.content || $slots.default" #default>
      <div class="typeset">
        <slot>
          <p>{{ props.content }}</p>
        </slot>
      </div>
    </template>
    <template #footer>
      <Flex x-end>
        <!-- The least destructive action receives the initial focus -->
        <Button v-if="props.showCancel" plain autofocus @click="cancel">
          {{ props.cancelText }}
        </Button>
        <Button :variant="props.confirmVariant" :autofocus="!props.showCancel" @click="confirm">
          {{ props.confirmText }}
        </Button>
      </Flex>
    </template>
  </Modal>
</template>
