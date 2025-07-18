<script setup lang="ts">
import type { InputProps } from './Input.vue'
import { computed, useId } from 'vue'
import '../Input/input.scss'

type Props = Omit<InputProps, 'type'> & {
  resize?: boolean | 'vertical' | 'horizontal'
  autoResize?: boolean
  rows?: number
  cols?: number
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
  resize = 'vertical',
  autoResize,
  errors = [] as string[],
  disabled,
  rows = 5,
  cols,
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

const r = computed(() => resize === true ? 'both' : (resize || 'initial'))
const fS = computed(() => autoResize ? 'content' : 'auto')
</script>

<template>
  <div class="vui-input-container" :class="{ expand, required, readonly, 'has-errors': errors.length > 0, disabled }">
    <slot name="before" />
    <div class="vui-input">
      <label v-if="label" :for="id">{{ label }}</label>
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
        :disabled
        :max="limit"
        :rows="rows"
        :cols="cols"
        :style="{
          resize: r,
          // @ts-expect-error Early-adoption CSS attribute
          fieldSizing: fS,
          // Add 1 to the width to account for the border
          ...(cols ? { width: `${cols + 1}ch` } : {}),
        }"
      />
    </div>
    <p v-if="limit" class="vui-input-limit">
      {{ `${model.length}/${limit}` }}
    </p>
    <ul v-if="errors.length > 0" class="vui-input-errors">
      <li v-for="err in errors" :key="err">
        {{ err }}
      </li>
    </ul>
    <slot name="after" />
  </div>
</template>
