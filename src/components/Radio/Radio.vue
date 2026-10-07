<script setup lang='ts'>
import { IconCircle, IconRadioButtonFill } from '@iconify-prerendered/vue-ph'
import { computed, inject, useAttrs, useId } from 'vue'
import { splitAttrs } from '../../lib/input.ts'
import { RADIO_GROUP_KEY } from './radio'
import './radio.scss'

export interface RadioProps {
  label?: string
  disabled?: boolean
  value: any
  accent?: boolean
  /**
   * Native `name`. Inherited from the parent `RadioGroup` when omitted.
   */
  name?: string
}

defineOptions({
  inheritAttrs: false,
})

const {
  label,
  disabled,
  value,
  accent,
  name,
} = defineProps<RadioProps>()

const emit = defineEmits<{
  change: [value: any]
}>()

const slots = defineSlots()
const model = defineModel<any>()
const attrs = useAttrs()
const id = useId()

// When placed inside a RadioGroup, the group owns the selected value
const group = inject(RADIO_GROUP_KEY, null)

const selected = computed(() => group ? group.model.value : model.value)
const isChecked = computed(() => value === selected.value)
const isDisabled = computed(() => !!disabled || !!group?.disabled.value)
const nativeName = computed(() => name ?? group?.name.value)

function onChange() {
  if (isDisabled.value)
    return

  if (group)
    group.model.value = value
  else
    model.value = value

  emit('change', value)
}

// Only primitive values can be submitted natively
const nativeValue = computed(() => typeof value === 'string' || typeof value === 'number' ? value : undefined)
</script>

<template>
  <div
    class="vui-radio"
    :class="[splitAttrs(attrs).root.class, { disabled: isDisabled, checked: isChecked, accent }]"
    :style="splitAttrs(attrs).root.style as any"
  >
    <input
      v-bind="splitAttrs(attrs).control"
      :id
      type="radio"
      :name="nativeName"
      :value="nativeValue"
      :checked="isChecked"
      :disabled="isDisabled"
      :required="group?.required.value"
      @change="onChange"
    >
    <label :for="id">
      <span class="vui-radio-icon">
        <IconCircle v-if="!isChecked" />
        <IconRadioButtonFill v-else />
      </span>
      <span v-if="!slots.default" class="vui-radio-content is-text">{{ label ?? value }}</span>
      <span v-else class="vui-radio-content">
        <slot />
      </span>
    </label>
  </div>
</template>
