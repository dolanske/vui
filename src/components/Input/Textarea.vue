<script setup lang="ts">
import type { InputProps } from './Input.vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, useAttrs, useId, useTemplateRef, watch, watchEffect } from 'vue'
import { joinIds, splitAttrs } from '../../lib/input.ts'
import '../Input/input.scss'

type Props = Omit<InputProps, 'type' | 'accept' | 'multiple' | 'min' | 'max' | 'step' | 'clearable' | 'size' | 'modelValue'> & {
  modelValue?: string
  resize?: boolean | 'vertical' | 'horizontal'
  /**
   * Grows the textarea with its content. `rows` is used as the minimum height.
   */
  autoResize?: boolean
  rows?: number
  cols?: number
}

defineOptions({
  inheritAttrs: false,
})

const {
  limit,
  label,
  expand = false,
  hint,
  placeholder,
  required,
  readonly,
  resize = 'vertical',
  autoResize = false,
  errors = [] as string[],
  disabled,
  rows = 5,
  cols,
  focus,
  name,
} = defineProps<Props>()

const model = defineModel<string>({ default: '' })
const attrs = useAttrs()

const id = useId()
const hintId = `${id}-hint`
const errorsId = `${id}-errors`
const limitId = `${id}-limit`

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

// When auto-resizing, vertical manual resizing would immediately be overridden
const r = computed(() => {
  if (disabled || readonly)
    return 'none'
  const value = resize === true ? 'both' : (resize || 'none')
  if (!autoResize)
    return value
  return value === 'both' || value === 'horizontal' ? 'horizontal' : 'none'
})

const textareaRef = useTemplateRef('textarea')

function onInput(event: Event) {
  if ((event as InputEvent).isComposing)
    return

  const el = event.target as HTMLTextAreaElement
  let value = el.value

  // `maxlength` handles typing, this keeps programmatic / pasted edge cases
  // and the DOM in sync with the model
  if (limitNumber.value !== undefined && value.length > limitNumber.value) {
    value = value.slice(0, limitNumber.value)
    el.value = value
  }

  model.value = value
}

//
// Auto resize. Prefers native `field-sizing: content` and falls back to
// measuring `scrollHeight` in browsers which do not support it yet.
const supportsFieldSizing = typeof CSS !== 'undefined' && CSS.supports?.('field-sizing', 'content')

function syncHeight() {
  const el = textareaRef.value
  if (!autoResize || supportsFieldSizing || !el)
    return

  el.style.height = 'auto'
  const borders = el.offsetHeight - el.clientHeight
  el.style.height = `${el.scrollHeight + borders}px`
}

watch(() => model.value, () => nextTick(syncHeight))
watch(() => autoResize, (enabled) => {
  if (!enabled && textareaRef.value && !supportsFieldSizing)
    textareaRef.value.style.height = ''
  nextTick(syncHeight)
})
onMounted(syncHeight)
useResizeObserver(textareaRef, () => syncHeight())

watchEffect(() => {
  if (focus)
    textareaRef.value?.focus({ preventScroll: true })
})

defineExpose({
  focus: () => {
    textareaRef.value?.focus({ preventScroll: true })
  },
})
</script>

<template>
  <div
    class="vui-input-container"
    :class="[splitAttrs(attrs).root.class, { expand, required, readonly, 'has-errors': errors.length > 0, disabled }]"
    :style="splitAttrs(attrs).root.style as any"
  >
    <slot name="before" />
    <div class="vui-input">
      <label v-if="label" :for="id">{{ label }}</label>
      <p v-if="hint" :id="hintId" class="vui-input-hint">
        {{ hint }}
      </p>
      <textarea
        v-bind="splitAttrs(attrs).control"
        :id
        ref="textarea"
        :value="model"
        :class="{ 'auto-resize': autoResize }"
        :readonly
        :name
        :placeholder
        :required
        :disabled
        :maxlength="limitNumber"
        :rows="rows"
        :cols="cols"
        :aria-describedby="describedBy"
        :aria-invalid="errors.length > 0 ? true : undefined"
        :style="{
          'resize': r,
          // Keep `rows` as the minimum height while growing with content
          '--vui-textarea-rows': rows,
          // Add 1 to the width to account for the border
          ...(cols ? { width: `${cols + 1}ch` } : {}),
        }"
        @input="onInput"
        @compositionend="onInput"
      />
    </div>
    <p v-if="limitNumber !== undefined" :id="limitId" class="vui-input-limit">
      {{ `${model.length}/${limitNumber}` }}
    </p>
    <ul v-if="errors.length > 0" :id="errorsId" class="vui-input-errors">
      <li v-for="(err, index) in errors" :key="index">
        {{ err }}
      </li>
    </ul>
    <slot name="after" />
  </div>
</template>
