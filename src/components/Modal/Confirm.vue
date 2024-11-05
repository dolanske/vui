<script setup lang='ts'>
import type { ModalProps } from './Modal.vue'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import Modal from './Modal.vue'

interface Props extends ModalProps {
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
}

const {
  title,
  content,
  cancelText = 'Cancel',
  confirmText = 'Ok',
  ...modalProps
} = defineProps<Props>()

const emits = defineEmits<{
  cancel: []
  confirm: []
}>()

const open = defineModel<boolean>()
</script>

<template>
  <Modal v-bind="modalProps" v-model="open">
    <template #default>
      <div class="typeset">
        <slot />
      </div>
    </template>
    <template #footer>
      <Flex justify-end>
        <Button plain @click="emits('cancel'), open = false">
          {{ cancelText }}
        </Button>
        <Button @click="emits('confirm'), open = false">
          {{ confirmText }}
        </Button>
      </Flex>
    </template>
  </Modal>
</template>
