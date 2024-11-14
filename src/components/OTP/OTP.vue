<script setup lang='ts'>
import { computed, provide, ref, watch } from 'vue'
import { isNil } from '../../shared/helpers'
import './otp.scss'

interface Props {
  mode?: 'num' | 'char' | 'both'
}

const {
  mode = 'both',
} = defineProps<Props>()

const emits = defineEmits<{
  change: [value?: string]
  complete: [value: string]
}>()

const slots = defineSlots()
const cursorIndex = ref<number>(0)
const regexNumbers = '^\\d+$'
const regexChars = '^[a-z]+$'
const regexBoth = '^[a-z0-9]+$'

const pattern = computed(() => {
  if (mode === 'num')
    return new RegExp(regexNumbers)
  else if (mode === 'char')
    return new RegExp(regexChars, 'i')
  else return new RegExp(regexBoth, 'i')
})

const maxLen = computed(() => {
  return slots.default().length
})

const otpModel = defineModel<string>({
  default: '',
  set(v) {
    if (!v)
      return ''
    if (pattern.value.test(v) && v.length <= maxLen.value) {
      return v
    }
    return otpModel.value
  },
})

provide('otp-value', otpModel)

watch(otpModel, value => emits('change', value))

function updateIndex(e: Event) {
  const selection = (e.target as HTMLInputElement).selectionStart
  if (!isNil(selection))
    cursorIndex.value = selection
}
</script>

<template>
  <div class="vui-otp">
    <div class="vui-otp-items">
      <slot />
    </div>

    <input
      v-model="otpModel"
      type="text"
      class="vui-otp-input"
      @keyup="updateIndex"
      @focus="setFirstEmptyIndex"
    >
  </div>

  {{ cursorIndex }}
</template>
