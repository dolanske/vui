<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import { Icon } from '@iconify/vue'
import { useEventListener } from '@vueuse/core'
import { onMounted, ref, useTemplateRef } from 'vue'
import Flex from '../Flex/Flex.vue'
import Input from './Input.vue'

type Props = Omit<InputProps, 'type' | 'modelValue' | 'focus' | 'limit' | 'placeholder'>

const props = defineProps<Props>()
const emits = defineEmits<{ files: [FileList] }>()

const dragging = ref(false)

function onSubmitHandler(e: any, isFromField?: boolean) {
  e.preventDefault()
  e.stopPropagation()

  const files = isFromField ? e.target.files : e.dataTransfer.files

  if (files.length > 0)
    emits('files', files)
}

const dropzoneRef = useTemplateRef<HTMLDivElement>('dropzone')

onMounted(() => {
  useEventListener(dropzoneRef, 'dragenter', onSubmitHandler, false)
  useEventListener(dropzoneRef, 'dragleave', onSubmitHandler, false)
  useEventListener(dropzoneRef, 'dragover', onSubmitHandler, false)
  useEventListener(dropzoneRef, 'drop', onSubmitHandler, false)
  useEventListener(dropzoneRef, 'input', e => onSubmitHandler(e, true), false)
})
</script>

<template>
  <Input
    v-bind="props"
    ref="dropzone"
    type="file"
    class="vui-dropzone"
    :class="{ dragging }"
    @dragenter="dragging = true"
    @mouseleave="dragging = false"
  >
    <template #__internal_replace_input="{ inputId }">
      <input :id="inputId" type="file">
      <label :for="inputId">
        <slot :dragging>
          <Flex justify-center gap="xs" align-center>
            <template v-if="dragging">
              <Icon icon="ph:target" />
              Drop it
            </template>
            <template v-else>
              <Icon icon="ph:file" />
              Click or drag files over here
            </template>
          </Flex>
        </slot>
      </label>
    </template>
  </Input>
</template>
