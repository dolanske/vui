<script setup lang="ts">
import { computed, type InputTypeHTMLAttribute, useId, useTemplateRef, watchEffect } from 'vue'
import { getMaybeRefLength } from '../../shared/helpers'
import Flex from '../Flex/Flex.vue'
import '../../style/core.scss'
import './input.scss'

// FIXME: sometimes spamming inputs when limit is set, it will _just_ let me write one more letter

export interface InputProps {
  type?: InputTypeHTMLAttribute
  label?: string
  hint?: string
  limit?: number | string
  expand?: boolean
  placeholder?: string
  required?: boolean
  modelValue?: string | number
  readonly?: boolean
  focus?: boolean
  errors?: string[]
  accept?: string
  multiple?: boolean
  min?: number
  max?: number
}

const {
  type = 'text',
  limit,
  label,
  expand = false,
  hint,
  placeholder,
  required,
  modelValue = '',
  readonly,
  focus,
  accept,
  min,
  max,
  errors = [] as string[],
} = defineProps<InputProps>()

const model = defineModel<string | number>({
  default: '',
  set(newValue) {
    // Completely ignore inputs
    if (readonly)
      return modelValue

    if (getMaybeRefLength(newValue) > Number(limit)) {
      return modelValue
    }
    return newValue
  },
})
const id = useId()

const inputRef = useTemplateRef('inputRef')

watchEffect(() => {
  if (focus)
    inputRef.value?.focus()
})

defineExpose({
  focus: () => {
    inputRef.value?.focus()
  },
})

const renderLimit = computed(() => {
  return `${getMaybeRefLength(model.value)}/${limit}`
})
</script>

<template>
  <div class="vui-input-container" :class="{ expand, required, readonly, 'has-errors': errors.length > 0 }">
    <slot name="before" />
    <div class="vui-input">
      <label v-if="label" for="id">{{ label }}</label>
      <p v-if="hint" class="vui-input-hint">
        {{ hint }}
      </p>
      <Flex class="vui-input-style" :gap="3" align-center>
        <slot name="start" />
        <slot name="__internal_replace_input" :input-id="id" />
        <input
          v-if="!$slots.__internal_replace_input"
          :id
          ref="inputRef"
          v-model="model"
          :readonly
          :type
          name="id"
          :placeholder
          :required
          :max="max ?? limit"
          :accept
          :multiple
          :min
        >
        <slot name="end" />
      </Flex>
    </div>
    <p v-if="limit" class="vui-input-limit">
      {{ renderLimit }}
    </p>
    <ul v-if="errors.length > 0" class="vui-input-errors">
      <li v-for="err in errors" :key="err">
        {{ err }}
      </li>
    </ul>

    <slot name="after" />
  </div>
</template>
