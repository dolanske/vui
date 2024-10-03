<script setup lang="ts">
import type { InputProps } from './Input.vue'
import { useId } from 'vue'

type Props = Omit<InputProps, 'type'> & {
  resize?: boolean | 'vertical' | 'horizontal'
}

const {
  limit,
  label,
  expand = false,
  hint,
  placeholder,
  required,
  modelValue = '',
  readonly,
  resize,
} = defineProps<Props>()

const model = defineModel<string>({
  default: '',
  set(newValue) {
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
      <textarea
        :id
        v-model="model"
        :readonly
        name="id"
        :placeholder
        :required
        :max="limit"
        :style="{
          resize: resize === true ? 'both' : (resize || 'initial'),
        }"
      />
    </div>
    <p v-if="limit" class="vui-input-limit">
      {{ `${model.length}/${limit}` }}
    </p>
    <slot name="after" />
  </div>
</template>
