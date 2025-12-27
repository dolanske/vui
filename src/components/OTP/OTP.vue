<script setup lang='ts'>
import type { ModelRef, Ref } from 'vue'
import { computed, provide, ref, toRef, useTemplateRef, watch } from 'vue'
import { setCharAt } from '../../shared/helpers'
import './otp.scss'

export interface OtpContext {
  otpValue: ModelRef<string>
  cursorIndex: Ref<number>
  redacted: Ref<boolean>
  register: () => void
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

const maxLen = ref(0)

const input = useTemplateRef('inputRef')

provide('otp-context', {
  otpValue,
  cursorIndex,
  redacted: toRef(() => redacted),
  // Called by all OTPItem child components to properly set max length of the input.
  register: () => maxLen.value++,
})

watch(otpValue, value => emits('change', value))

function setOtpValue(value: string) {
  otpValue.value = value
  if (input.value) {
    input.value.value = value
  }
}

function updateValue(e: KeyboardEvent) {
  const key = e.key

  // Capping at length 0 prevents all non-character keyboard inputs
  if (pattern.value.test(key) && key.length === 1) {
    const newValue = setCharAt(otpValue.value, key, cursorIndex.value)

    if (newValue.length <= maxLen.value) {
      setOtpValue(newValue)

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

    const newValue = setCharAt(otpValue.value, '', cursorIndex.value)
    setOtpValue(newValue)
  }
}

function handlePaste(e: any) {
  const clipboard = e.clipboardData?.getData('text/plain')
  if (clipboard) {
    const clipboardTrim = clipboard.trim().slice(0, maxLen.value - cursorIndex.value)

    if (!pattern.value.test(clipboardTrim)) {
      return
    }

    const currentTrimStart = otpValue.value.slice(0, cursorIndex.value)
    const currentTrimEnd = otpValue.value.slice(cursorIndex.value + clipboardTrim.length)
    const newValue = (currentTrimStart + clipboardTrim + currentTrimEnd).trim()
    setOtpValue(newValue)
    cursorIndex.value = Math.min(newValue.length, maxLen.value - 1)
  }
}
</script>

<template>
  <div class="vui-otp">
    <input
      ref="inputRef"
      type="text"
      :inputmode="mode === 'num' ? 'numeric' : 'text'"
      autocomplete="one-time-code"
      class="vui-otp-input"
      contenteditable="true"
      @keydown="updateValue"
      @blur="cursorIndex = -1"
      @focus="cursorIndex = Math.min(otpValue.length, maxLen - 1)"
      @paste="handlePaste"
    >

    <div class="vui-otp-items">
      <slot />
    </div>
  </div>
</template>
