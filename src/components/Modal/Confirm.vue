<script setup lang='ts'>
import type { Variants } from '../Button/Button.vue'
import type { ModalProps } from './Modal.vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import Modal from './Modal.vue'

type Props = {
  title?: string
  content?: string
  confirmText?: string
  confirmVariant?: Variants
  cancelText?: string
  showCancel?: boolean
} & Partial<ModalProps>

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
  cancel: []
  confirm: []
  close: []
}>()
</script>

<template>
  <Modal
    v-bind="props"
    :open="props.open"
    @close="emit('close')"
  >
    <template #default>
      <div class="typeset">
        <slot />
      </div>
    </template>
    <template #footer>
      <Flex x-end>
        <Button v-if="props.showCancel" plain @click="emit('cancel'), emit('close')">
          {{ props.cancelText }}
        </Button>
        <Button :variant="props.confirmVariant" @click="emit('confirm'), emit('close')">
          {{ props.confirmText }}
        </Button>
      </Flex>
    </template>
  </Modal>
</template>
