<script setup lang='ts'>
import type { ModelRef, Ref } from 'vue'
import { computed, provide, ref, toRef, watch } from 'vue'
import { setCharAt } from '../../shared/helpers'
import './otp.scss'

export interface OtpContext {
  otpValue: ModelRef<string>
  cursorIndex: Ref<number>
  redacted: Ref<boolean>
}

interface Props {
  mode?: 'num' | 'char' | 'both'
  redacted?: boolean
}

const {
  mode = 'both',
  redacted = false,
} = defineProps<Props>()

const emits = defineEmits<{
  change: [value?: string]
  complete: [value: string]
}>()

const slots = defineSlots()

const otpValue = defineModel<string>({
  default: '',
})

const cursorIndex = ref<number>(-1)
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

provide('otp-context', {
  otpValue,
  cursorIndex,
  redacted: toRef(() => redacted),
})

watch(otpValue, value => emits('change', value))

function updateValue(e: KeyboardEvent) {
  const key = e.key
  if (pattern.value.test(key)) {
    const newValue = setCharAt(otpValue.value, key, cursorIndex.value)

    if (newValue.length <= maxLen.value) {
      otpValue.value = newValue
      ;(e.target as HTMLInputElement).value = otpValue.value

      if (cursorIndex.value < maxLen.value - 1)
        cursorIndex.value++
    }
  }
  else if (key === 'ArrowLeft' && cursorIndex.value > 0) {
    cursorIndex.value--
  }
  else if (key === 'ArrowRight' && cursorIndex.value < otpValue.value.length) {
    cursorIndex.value++
  }
  else if (key === 'Backspace') {
    // If we press backspace multiple times make sure to traverse back by 1
    if (otpValue.value.charAt(cursorIndex.value) === '' && cursorIndex.value > 0) {
      cursorIndex.value--
    }

    otpValue.value = setCharAt(otpValue.value, '', cursorIndex.value)
  }
}
</script>

<template>
  <div class="vui-otp">
    <div class="vui-otp-items">
      <slot />
    </div>

    <input
      type="text"
      class="vui-otp-input"
      @keydown="updateValue"
      @blur="cursorIndex = -1"
      @focus="cursorIndex = Math.min(otpValue.length, maxLen - 1)"
    >
  </div>

  {{ cursorIndex }}
</template>
