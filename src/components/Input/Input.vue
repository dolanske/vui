<script setup lang="ts">
import type { Sizes } from '../../lib/types.ts'
import { IconX } from '@iconify-prerendered/vue-ph'
import { computed, useAttrs, useId, useTemplateRef, watchEffect } from 'vue'
import { getInputSizeStyle, joinIds, splitAttrs } from '../../lib/input.ts'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import '../../style/core.scss'
import './input.scss'

export type InputType = 'text' | 'password' | 'color' | 'date' | 'email' | 'number' | 'range' | 'search' | 'tel' | 'time' | 'url' | 'file'

export interface InputProps {
  type?: InputType
  label?: string
  hint?: string
  /**
   * Maximum amount of characters. Enforced natively via `maxlength` where the
   * input type supports it, and by truncation otherwise (e.g. `number`).
   */
  limit?: number | string
  expand?: boolean
  placeholder?: string
  required?: boolean
  modelValue?: string | number
  readonly?: boolean
  /**
   * Focuses the input whenever this becomes `true`
   */
  focus?: boolean
  errors?: string[]
  accept?: string
  multiple?: boolean
  min?: number
  max?: number
  disabled?: boolean
  /**
   * Native `name` attribute used for form submission & autofill
   */
  name?: string
  /**
   * Native `step` attribute for `number`, `range`, `date` & `time` inputs
   */
  step?: number | 'any'
  /**
   * Controls the input height and padding
   */
  size?: Sizes
  /**
   * Shows a button which clears the value
   */
  clearable?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const {
  type = 'text',
  limit,
  label,
  expand = false,
  hint,
  placeholder,
  required,
  readonly,
  focus,
  accept,
  multiple,
  min,
  max,
  errors = [] as string[],
  disabled,
  name,
  step,
  size = 'm',
  clearable,
} = defineProps<InputProps>()

const emit = defineEmits<{
  clear: []
}>()

const model = defineModel<string | number>({ default: '' })
const attrs = useAttrs()

const id = useId()
const hintId = `${id}-hint`
const errorsId = `${id}-errors`
const limitId = `${id}-limit`

const inputRef = useTemplateRef('input')

// Input types which natively support the `maxlength` attribute
const MAXLENGTH_TYPES = new Set<InputType>(['text', 'password', 'email', 'search', 'tel', 'url'])

const limitNumber = computed(() => {
  if (limit === undefined || limit === '')
    return undefined
  const parsed = Number(limit)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined
})

const describedBy = computed(() => joinIds(
  hint && hintId,
  errors.length > 0 && errorsId,
  limitNumber.value !== undefined && limitId,
))

const valueLength = computed(() => String(model.value ?? '').length)
const showClear = computed(() => clearable && !disabled && !readonly && valueLength.value > 0)

function onInput(event: Event) {
  if (type === 'file')
    return

  // Wait for the IME composition to finish before updating the model
  if ((event as InputEvent).isComposing)
    return

  const el = event.target as HTMLInputElement
  let value = el.value

  // Always keep the DOM in sync with the enforced limit. Without this the
  // field would display more characters than the model contains.
  if (limitNumber.value !== undefined && value.length > limitNumber.value) {
    value = value.slice(0, limitNumber.value)
    el.value = value
  }

  model.value = value
}

function clear() {
  model.value = ''
  emit('clear')
  inputRef.value?.focus({ preventScroll: true })
}

watchEffect(() => {
  if (focus)
    inputRef.value?.focus({ preventScroll: true })
})

defineExpose({
  focus: () => {
    inputRef.value?.focus({ preventScroll: true })
  },
})

// Attributes and ARIA wiring for the native control. Also passed to the
// internal replace slot so that components which render their own control
// (Color, Dropzone) stay accessible.
function getControlBindings() {
  return {
    ...splitAttrs(attrs).control,
    'id': id,
    'name': name,
    'required': required,
    'disabled': disabled,
    'readonly': readonly,
    'aria-describedby': describedBy.value,
    'aria-invalid': errors.length > 0 ? true : undefined,
  }
}
</script>

<template>
  <div
    class="vui-input-container"
    :class="[splitAttrs(attrs).root.class, { expand, disabled, required, readonly, 'has-errors': errors.length > 0 }]"
    :style="[getInputSizeStyle(size), splitAttrs(attrs).root.style as any]"
  >
    <slot name="before" />
    <div class="vui-input">
      <label v-if="label" :for="id">{{ label }}</label>
      <p v-if="hint" :id="hintId" class="vui-input-hint">
        {{ hint }}
      </p>
      <Flex class="vui-input-style" :gap="5" y-center>
        <slot name="start" />
        <slot
          name="__internal_replace_input"
          :input-id="id"
          :bindings="getControlBindings()"
        />
        <input
          v-if="!$slots.__internal_replace_input"
          ref="input"
          v-bind="getControlBindings()"
          :value="type === 'file' ? undefined : model"
          :type
          :placeholder
          :maxlength="limitNumber !== undefined && MAXLENGTH_TYPES.has(type) ? limitNumber : undefined"
          :max
          :min
          :step
          :accept
          :multiple
          @input="onInput"
          @compositionend="onInput"
        >
        <Button
          v-if="showClear"
          class="vui-input-clear"
          plain
          square
          size="s"
          aria-label="Clear"
          @click="clear"
        >
          <IconX />
        </Button>
        <slot name="end" />
      </Flex>
    </div>
    <p v-if="limitNumber !== undefined" :id="limitId" class="vui-input-limit">
      {{ `${valueLength}/${limitNumber}` }}
    </p>
    <ul v-if="errors.length > 0" :id="errorsId" class="vui-input-errors">
      <li v-for="(err, index) in errors" :key="index">
        {{ err }}
      </li>
    </ul>

    <slot name="after" />
  </div>
</template>
