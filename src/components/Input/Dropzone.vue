<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import Flex from '../Flex/Flex.vue'
import Input from './Input.vue'

type Props = Omit<InputProps, 'type' | 'modelValue' | 'focus' | 'limit' | 'placeholder'>

const props = defineProps<Props>()
const emits = defineEmits<{ files: [FileList] }>()

const dragging = ref(false)

// TODO: prevent default doesnt work
function handleDrop(e: InputEvent) {
  e.preventDefault()
  if (e.dataTransfer && e.dataTransfer.files)
    emits('files', e.dataTransfer?.files)
}
</script>

<template>
  <Input
    type="file"
    v-bind="props"
    class="vui-dropzone"
    :class="{ dragging }"
    @dragenter="dragging = true"
    @dragleave="dragging = false"
    @drop="handleDrop"
  >
    <template #__internal_replace_input="{ inputId }">
      <input :id="inputId" type="file">
      <label :for="inputId">
        <slot :dragging>
          <Flex justify-center gap="s" align-center>
            <template v-if="dragging">
              <Icon icon="ph:target" />
              Drop them here
            </template>
            <template v-else>
              <Icon icon="ph:file" />
              Click me or drag files here
            </template>
          </Flex>
        </slot>
      </label>
    </template>
  </Input>
</template>
