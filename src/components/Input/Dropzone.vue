<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import { IconFile, IconTarget } from '@iconify-prerendered/vue-ph'
import { useEventListener } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import Flex from '../Flex/Flex.vue'
import Input from './Input.vue'

type Props = Omit<InputProps, 'type' | 'modelValue' | 'focus' | 'limit' | 'placeholder' | 'clearable' | 'step' | 'min' | 'max'>

const props = defineProps<Props>()
const emits = defineEmits<{
  /**
   * Emitted with the accepted files, after `accept` and `multiple` filtering
   */
  files: [FileList]
  /**
   * Emitted with files that did not match `accept`, or extra files when
   * `multiple` is not set
   */
  rejected: [File[]]
}>()

const dragging = ref(false)
// dragenter / dragleave fire for every child element. Tracking the depth makes
// sure the dragging state only resets once the drag actually leaves the zone.
let dragDepth = 0

const dropzoneRef = useTemplateRef<InstanceType<typeof Input>>('dropzone')
const dropzoneEl = computed(() => (dropzoneRef.value?.$el as HTMLElement | undefined))

function isFileDrag(event: DragEvent) {
  return !!event.dataTransfer && Array.from(event.dataTransfer.types).includes('Files')
}

/**
 * Checks a file against an `accept` attribute value, e.g. `.pdf,image/*`
 */
function matchesAccept(file: File, accept?: string): boolean {
  if (!accept)
    return true

  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()

  return accept
    .split(',')
    .map(token => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith('.'))
        return name.endsWith(token)
      if (token.endsWith('/*'))
        return type.startsWith(token.slice(0, -1))
      return type === token
    })
}

function toFileList(files: File[]): FileList {
  const transfer = new DataTransfer()
  for (const file of files)
    transfer.items.add(file)
  return transfer.files
}

function handleFiles(list: FileList | null | undefined) {
  if (!list || list.length === 0 || props.disabled)
    return

  const accepted: File[] = []
  const rejected: File[] = []

  for (const file of Array.from(list)) {
    if (matchesAccept(file, props.accept))
      accepted.push(file)
    else
      rejected.push(file)
  }

  if (!props.multiple && accepted.length > 1)
    rejected.push(...accepted.splice(1))

  if (rejected.length > 0)
    emits('rejected', rejected)

  if (accepted.length > 0)
    emits('files', toFileList(accepted))
}

function resetDragging() {
  dragDepth = 0
  dragging.value = false
}

useEventListener(dropzoneEl, 'dragenter', (event: DragEvent) => {
  if (!isFileDrag(event))
    return

  event.preventDefault()
  dragDepth++

  if (!props.disabled)
    dragging.value = true
})

useEventListener(dropzoneEl, 'dragover', (event: DragEvent) => {
  if (!isFileDrag(event))
    return

  // Required, otherwise the browser does not allow dropping
  event.preventDefault()
  if (event.dataTransfer)
    event.dataTransfer.dropEffect = props.disabled ? 'none' : 'copy'
})

useEventListener(dropzoneEl, 'dragleave', () => {
  dragDepth = Math.max(0, dragDepth - 1)
  if (dragDepth === 0)
    dragging.value = false
})

useEventListener(dropzoneEl, 'drop', (event: DragEvent) => {
  if (!isFileDrag(event))
    return

  event.preventDefault()
  resetDragging()
  handleFiles(event.dataTransfer?.files)
})

// Drag cancelled (Escape) or dropped somewhere else entirely
useEventListener(window, 'dragend', resetDragging)
useEventListener(window, 'drop', resetDragging)

function onFieldChange(event: Event) {
  const input = event.target as HTMLInputElement
  handleFiles(input.files)
  // Reset so selecting the same file again emits again
  input.value = ''
}
</script>

<template>
  <Input
    v-bind="props"
    ref="dropzone"
    type="file"
    class="vui-dropzone"
    :class="{ dragging }"
  >
    <template #__internal_replace_input="{ inputId, bindings }">
      <input
        v-bind="bindings"
        type="file"
        :accept="props.accept"
        :multiple="props.multiple"
        @change="onFieldChange"
      >
      <label :for="inputId">
        <slot :dragging>
          <Flex x-center gap="xs" y-center>
            <template v-if="dragging">
              <IconTarget />
              Drop it
            </template>
            <template v-else>
              <IconFile />
              Click or drag files over here
            </template>
          </Flex>
        </slot>
      </label>
    </template>
  </Input>
</template>
