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

function handlePaste(e: ClipboardEvent) {
  e.preventDefault()
  const clipboard = e.clipboardData?.getData('text/plain')
  if (clipboard) {
    const clipboardTrim = clipboard.trim().slice(0, maxLen.value)

    if (!pattern.value.test(clipboardTrim)) {
      return
    }

    setOtpValue(clipboardTrim)
    cursorIndex.value = Math.min(clipboardTrim.length, maxLen.value - 1)
  }
}

function handleInput(e: Event) {
  const inputEvent = e as InputEvent
  // Regular typing and deletions are handled by @keydown — skip them here
  if (inputEvent.inputType === 'insertText' || inputEvent.inputType?.startsWith('delete')) {
    return
  }
  // Handles SMS autofill / password manager autofill (fires 'input', not 'paste')
  const value = (e.target as HTMLInputElement).value
  if (!value) {
    return
  }
  const trimmed = value.trim().slice(0, maxLen.value)
  if (!pattern.value.test(trimmed)) {
    // Reset the hidden input to prevent stale value
    if (input.value) {
      input.value.value = otpValue.value
    }
    return
  }
  setOtpValue(trimmed)
  cursorIndex.value = Math.min(trimmed.length, maxLen.value - 1)
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
      @keydown="updateValue"
      @input="handleInput"
      @blur="cursorIndex = -1"
      @focus="cursorIndex = Math.min(otpValue.length, maxLen - 1)"
      @paste="handlePaste"
    >

    <div class="vui-otp-items">
      <slot />
    </div>
  </div>
</template>
