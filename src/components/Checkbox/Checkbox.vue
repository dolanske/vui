<script setup lang="ts">
import { IconCheckSquareFill, IconMinusSquareFill, IconSquare } from '@iconify-prerendered/vue-ph'
import { computed, ref, useAttrs, useId, watch } from 'vue'
import { joinIds, splitAttrs } from '../../lib/input.ts'
import './checkbox.scss'

interface Props {
  label?: string
  disabled?: boolean
  /**
   * Initial / controlled checked state when not using `v-model`
   */
  checked?: boolean
  accent?: boolean
  /**
   * Displays a mixed state, e.g. when only some nested items are selected.
   * Purely visual, clicking the checkbox still toggles it.
   */
  indeterminate?: boolean
  /**
   * Value added to / removed from the model when `v-model` is bound to an
   * array. Also used as the native value during form submission.
   */
  value?: any
  name?: string
  required?: boolean
  hint?: string
  errors?: string[]
}

defineOptions({
  inheritAttrs: false,
})

const {
  label,
  disabled,
  checked: checkedProp = undefined,
  accent,
  indeterminate,
  value,
  name,
  required,
  hint,
  errors = [] as string[],
} = defineProps<Props>()

const emit = defineEmits<{
  change: [checked: boolean]
}>()

const slots = defineSlots()
const model = defineModel<boolean | any[] | null>({ default: undefined })
const attrs = useAttrs()

const id = useId()
const hintId = `${id}-hint`
const errorsId = `${id}-errors`

// Used when the component is not controlled by `v-model`
const localChecked = ref(!!checkedProp)
watch(() => checkedProp, (next) => {
  localChecked.value = !!next
})

const isArrayModel = computed(() => Array.isArray(model.value))

const isChecked = computed(() => {
  if (Array.isArray(model.value))
    return model.value.includes(value)
  if (model.value !== undefined && model.value !== null)
    return !!model.value
  return localChecked.value
})

function onChange(event: Event) {
  if (disabled)
    return

  const next = (event.target as HTMLInputElement).checked

  if (isArrayModel.value) {
    const current = model.value as any[]
    model.value = next
      ? [...current.filter(item => item !== value), value]
      : current.filter(item => item !== value)
  }
  else {
    localChecked.value = next
    model.value = next
  }

  emit('change', next)
}

// Only primitive values can be submitted natively
const nativeValue = computed(() => typeof value === 'string' || typeof value === 'number' ? value : undefined)
const describedBy = computed(() => joinIds(hint && hintId, errors.length > 0 && errorsId))
</script>

<template>
  <div
    class="vui-checkbox"
    :class="[splitAttrs(attrs).root.class, { 'disabled': !!disabled, 'checked': isChecked, indeterminate, accent, 'has-errors': errors.length > 0 }]"
    :style="splitAttrs(attrs).root.style as any"
  >
    <input
      v-bind="splitAttrs(attrs).control"
      :id
      type="checkbox"
      :checked="isChecked"
      :indeterminate="indeterminate"
      :disabled
      :name
      :value="nativeValue"
      :required
      :aria-describedby="describedBy"
      :aria-invalid="errors.length > 0 ? true : undefined"
      @change="onChange"
    >
    <label :for="id">
      <span class="vui-checkbox-icon">
        <slot v-if="indeterminate" name="icon-indeterminate">
          <IconMinusSquareFill />
        </slot>
        <slot v-else-if="isChecked" name="icon-on">
          <IconCheckSquareFill />
        </slot>
        <slot v-else name="icon-off">
          <IconSquare />
        </slot>
      </span>
      <span v-if="label || slots.default" class="vui-checkbox-content is-text">
        <slot>{{ label }}</slot>
      </span>
    </label>
    <p v-if="hint" :id="hintId" class="vui-hint vui-checkbox-hint">
      {{ hint }}
    </p>
    <ul v-if="errors.length > 0" :id="errorsId" class="vui-input-errors vui-checkbox-errors">
      <li v-for="(err, index) in errors" :key="index">
        {{ err }}
      </li>
    </ul>
  </div>
</template>
