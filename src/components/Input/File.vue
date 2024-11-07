<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import Input from './Input.vue'

const props = defineProps<Omit<InputProps, 'type'>>()
const emits = defineEmits<{ files: [FileList] }>()
</script>

<template>
  <Input
    type="file"
    v-bind="{ ...props }"
    @input="emits('files', $event.target.files)"
  />
</template>
