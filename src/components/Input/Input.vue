<script setup lang="ts">
import { type InputTypeHTMLAttribute, useAttrs, useId } from 'vue'
import '../../style/core.scss'
import './input.scss'

// FIXME: sometimes spamming inputs when limit is set, it will _just_ let me write one more letter

interface Props {
  type?: InputTypeHTMLAttribute
  label?: string
  hint?: string
  limit?: number | string
  expand?: boolean
  placeholder?: string
  required?: boolean
  modelValue: string
  readonly?: boolean
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
} = defineProps<Props>()

const model = defineModel<string>({
  default: '',
  set(newValue) {
    // Completely ignore inputs
    if (readonly)
      return modelValue

    if (newValue.length > Number(limit)) {
      return modelValue
    }
    return newValue
  },
})
const id = useId()
</script>

<template>
  <div class="vui-input-container" :class="{ expand, required, readonly }">
    <slot name="before" />
    <div class="vui-input">
      <label v-if="label" for="id">{{ label }}</label>
      <p v-if="hint" class="vui-input-hint">
        {{ hint }}
      </p>
      <input
        :id
        v-model="model"
        :readonly
        :type
        name="id"
        :placeholder
        :required
        :max="limit"
      >
    </div>
    <p v-if="limit" class="vui-input-limit">
      {{ `${model.length}/${limit}` }}
    </p>
    <slot name="after" />
  </div>
</template>
