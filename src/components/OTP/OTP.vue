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

const otpValue = defineModel<string>({ default: '' })

const cursorIndex = ref<number>(-1)

const PATTERNS = {
  num: { single: /^\d$/, strip: /\D/g },
  char: { single: /^[a-z]$/i, strip: /[^a-z]/gi },
  both: { single: /^[a-z0-9]$/i, strip: /[^a-z0-9]/gi },
} as const

const pattern = computed(() => PATTERNS[mode].single)
const stripPattern = computed(() => PATTERNS[mode].strip)

const maxLen = ref(0)
const input = useTemplateRef('inputRef')

provide('otp-context', {
  otpValue,
  cursorIndex,
  redacted: toRef(() => redacted),
  register: () => maxLen.value++,
})

watch(otpValue, value => emits('change', value))

function setOtpValue(value: string) {
  otpValue.value = value
  if (input.value)
    input.value.value = value
}

const WHITESPACE_RE = /\s/g

// Strip whitespace and invalid characters, then clamp to maxLen
function sanitize(value: string): string {
  return value.replace(WHITESPACE_RE, '').replace(stripPattern.value, '').slice(0, maxLen.value)
}

function applyValue(raw: string) {
  const cleaned = sanitize(raw)
  if (!cleaned)
    return
  setOtpValue(cleaned)
  cursorIndex.value = Math.min(cleaned.length, maxLen.value - 1)
}

function onKeyDown(e: KeyboardEvent) {
  // Let the browser handle all modifier combos (Ctrl+V, Cmd+C, Ctrl+A, etc.)
  if (e.ctrlKey || e.metaKey)
    return

  const { key } = e

  if (key.length === 1 && pattern.value.test(key)) {
    e.preventDefault()
    const newValue = setCharAt(otpValue.value, key, cursorIndex.value)
    if (newValue.length <= maxLen.value) {
      setOtpValue(newValue)
      if (cursorIndex.value < maxLen.value - 1)
        cursorIndex.value++
    }
  }
  else if (key === 'Backspace') {
    e.preventDefault()
    if (otpValue.value.charAt(cursorIndex.value) === '' && cursorIndex.value > 0)
      cursorIndex.value--
    setOtpValue(setCharAt(otpValue.value, '', cursorIndex.value))
  }
  else if (key === 'Delete') {
    e.preventDefault()
    setOtpValue(setCharAt(otpValue.value, '', cursorIndex.value))
  }
  else if (key === 'ArrowLeft') {
    e.preventDefault()
    if (cursorIndex.value > 0)
      cursorIndex.value--
  }
  else if (key === 'ArrowRight') {
    e.preventDefault()
    if (cursorIndex.value < otpValue.value.length)
      cursorIndex.value++
  }
  else if (key === 'Home') {
    e.preventDefault()
    cursorIndex.value = 0
  }
  else if (key === 'End') {
    e.preventDefault()
    cursorIndex.value = Math.min(otpValue.value.length, maxLen.value - 1)
  }
}

function onPaste(e: ClipboardEvent) {
  // Read BEFORE preventDefault — iOS Safari returns empty string if called after
  const text = e.clipboardData?.getData('text/plain') || e.clipboardData?.getData('Text') || ''
  if (!text)
    return
  e.preventDefault()
  applyValue(text)
}

function onInput(e: Event) {
  const ie = e as InputEvent
  // insertText is handled by onKeyDown; delete variants are too — skip both
  if (ie.inputType === 'insertText' || ie.inputType?.startsWith('delete'))
    return
  // Everything else (insertReplacementText, insertFromYank, undefined) is
  // SMS autofill, password manager injection, or Android autofill
  const value = (e.target as HTMLInputElement).value
  if (!value)
    return
  applyValue(value)
}
</script>

<template>
  <div class="vui-otp">
    <input
      ref="inputRef"
      type="text"
      :inputmode="mode === 'num' ? 'numeric' : 'text'"
      :maxlength="maxLen"
      autocomplete="one-time-code"
      autocapitalize="none"
      autocorrect="off"
      spellcheck="false"
      class="vui-otp-input"
      @keydown="onKeyDown"
      @input="onInput"
      @paste="onPaste"
      @blur="cursorIndex = -1"
      @focus="cursorIndex = Math.min(otpValue.length, maxLen - 1)"
    >

    <div class="vui-otp-items">
      <slot />
    </div>
  </div>
</template>
