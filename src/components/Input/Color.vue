<script setup lang="ts">
import type { InputProps } from './Input.vue'
import { IconPalette } from '@iconify-prerendered/vue-ph'
import { computed, useAttrs, useId } from 'vue'
import { hexToRgb, REGEX_HEX, REGEX_RGB_PARTIAL, toHex } from '../../shared/color'
import { theme } from '../../shared/theme'
import Input from './Input.vue'

const props = defineProps<InputProps>()
const attrs = useAttrs()
const id = useId()

const [color, modifiers] = defineModel<string>()

// Native color input always keeps state as a hex. So we need to make sure to
// convert it in rgb mode
const nativeHex = computed({
  get() {
    return toHex(color.value ?? '', theme.value === 'dark' ? '#ffffff' : '#000000')
  },
  set(hex: string) {
    color.value = modifiers.rgb ? hexToRgb(hex) : hex
  },
})

function onTextInput(e: Event) {
  const input = e.target as HTMLInputElement
  const val = input.value

  if (val && (modifiers.rgb ? !REGEX_RGB_PARTIAL.test(val) : !REGEX_HEX.test(val))) {
    input.value = color.value ?? ''
    return
  }

  color.value = val
}
</script>

<template>
  <Input v-bind="{ ...attrs, ...props }" type="color" class="vui-input-color">
    <template #__internal_replace_input>
      <input :id v-model="nativeHex" type="color" tabindex="0">
      <label :for="id">
        <div class="vui-input-color-indicator" :style="{ backgroundColor: color }">
          <IconPalette v-if="!color" />
        </div>
        <input :value="color" type="text" :placeholder="props.placeholder" @input="onTextInput">
      </label>
    </template>
  </Input>
</template>
