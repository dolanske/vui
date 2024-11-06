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
  confirmVariant: 'default',
})

const emits = defineEmits<{
  cancel: []
  confirm: []
}>()

const open = defineModel<boolean>()
</script>

<template>
  <pre>{{ $props }}</pre>
  <Modal
    v-bind="props"
    v-model="open"
  >
    <template #default>
      <div class="typeset">
        <slot />
      </div>
    </template>
    <template #footer>
      <Flex justify-end>
        <Button v-if="props.showCancel" plain @click="emits('cancel'), open = false">
          {{ props.cancelText }}
        </Button>
        <Button :variant="props.confirmVariant" @click="emits('confirm'), open = false">
          {{ props.confirmText }}
        </Button>
      </Flex>
    </template>
  </Modal>
</template>
