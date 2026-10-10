<script setup lang="ts">
import type { InputProps } from './Input.vue'
import { IconPalette } from '@iconify-prerendered/vue-ph'
import { computed, ref, useId, watch } from 'vue'
import { hexToRgb, isCompleteColor, REGEX_HEX, REGEX_RGB_PARTIAL, toHex } from '../../lib/color.ts'
import { isDark } from '../../lib/theme.ts'
import Input from './Input.vue'

const props = defineProps<Omit<InputProps, 'modelValue' | 'type'>>()
const pickerId = useId()

const [color, modifiers] = defineModel<string>()

const format = computed(() => modifiers.rgb ? 'rgb' : 'hex')

// Text shown in the text field. It is kept separately from the model so that
// partially typed values (e.g. `#ff`) stay visible without being emitted.
const text = ref(color.value ?? '')

watch(color, (value) => {
  // Do not overwrite what the user is typing if it represents the same color
  if (value !== undefined && value !== null && isCompleteColor(text.value, format.value) && toHex(text.value) === toHex(value))
    return
  text.value = value ?? ''
})

// Native color input always keeps state as a hex. So we need to make sure to
// convert it in rgb mode
const nativeHex = computed({
  get() {
    return toHex(color.value ?? '', isDark.value ? '#ffffff' : '#000000')
  },
  set(hex: string) {
    color.value = format.value === 'rgb' ? hexToRgb(hex) : hex
  },
})

function onTextInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Reject characters which can never form a valid color
  const isValidPartial = format.value === 'rgb' ? REGEX_RGB_PARTIAL.test(value) : REGEX_HEX.test(value)
  if (value && !isValidPartial) {
    input.value = text.value
    return
  }

  text.value = value

  if (value === '')
    color.value = ''
  else if (isCompleteColor(value, format.value))
    color.value = value
}

// Restore the last valid color if the user leaves an incomplete value behind
function onTextBlur() {
  if (text.value !== '' && !isCompleteColor(text.value, format.value))
    text.value = color.value ?? ''
}
</script>

<template>
  <Input v-bind="props" type="color" class="vui-input-color">
    <template #__internal_replace_input="{ bindings }">
      <input
        :id="pickerId"
        v-model="nativeHex"
        type="color"
        :disabled="props.disabled || props.readonly"
        aria-label="Open color picker"
      >
      <label :for="pickerId">
        <div class="vui-input-color-indicator" :style="{ backgroundColor: color }">
          <IconPalette v-if="!color" />
        </div>
        <!-- Main control, receives the outer label, name, ARIA & attributes -->
        <input
          v-bind="bindings"
          :value="text"
          type="text"
          :placeholder="props.placeholder"
          autocomplete="off"
          spellcheck="false"
          @input="onTextInput"
          @blur="onTextBlur"
        >
      </label>
    </template>
  </Input>
</template>
