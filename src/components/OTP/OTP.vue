<script setup lang='ts'>
import { computed, provide, reactive, ref, toRef, useTemplateRef, watch } from 'vue'
import { setCharAt } from '../../lib/helpers'
import { OTP_KEY } from './otp'
import OTPItem from './OTPItem.vue'
import './otp.scss'

export type { OtpContext } from './otp'

interface Props {
  mode?: 'num' | 'char' | 'both'
  redacted?: boolean
  /**
   * Amount of characters. When set and no items are passed into the default
   * slot, items are rendered automatically. Otherwise the length is derived
   * from the rendered `OTPItem` components.
   */
  length?: number
  /**
   * Accessible label of the hidden input
   */
  label?: string
  disabled?: boolean
  /**
   * Marks the code as invalid, e.g. after a failed verification
   */
  invalid?: boolean
  /**
   * Native `name` for form submission
   */
  name?: string
}

const {
  mode = 'both',
  redacted = false,
  length,
  label = 'One-time code',
  disabled,
  invalid,
  name,
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

// Indices of the currently mounted items. Using a set (instead of a counter)
// keeps the length correct when items unmount or re-mount.
const registered = reactive(new Set<number>())
const maxLen = computed(() => length ?? (registered.size > 0 ? Math.max(...registered) + 1 : 0))

const input = useTemplateRef('inputRef')

provide(OTP_KEY, {
  otpValue,
  cursorIndex,
  redacted: toRef(() => redacted),
  register: (index: number) => {
    registered.add(index)
    return () => registered.delete(index)
  },
})

watch(otpValue, (value, previous) => {
  emits('change', value)

  if (maxLen.value > 0 && value.length === maxLen.value && previous?.length !== maxLen.value)
    emits('complete', value)
})

function setOtpValue(value: string) {
  otpValue.value = value
  syncInput()
}

// The hidden input always mirrors the model, whatever the browser inserted
function syncInput() {
  if (input.value && input.value.value !== otpValue.value)
    input.value.value = otpValue.value
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

function typeChar(char: string) {
  if (!pattern.value.test(char))
    return

  const index = Math.max(0, cursorIndex.value)
  const newValue = setCharAt(otpValue.value, char, index)
  if (newValue.length <= maxLen.value) {
    setOtpValue(newValue)
    if (cursorIndex.value < maxLen.value - 1)
      cursorIndex.value = index + 1
  }
}

function backspace() {
  if (otpValue.value.charAt(cursorIndex.value) === '' && cursorIndex.value > 0)
    cursorIndex.value--
  setOtpValue(setCharAt(otpValue.value, '', cursorIndex.value))
}

function onKeyDown(e: KeyboardEvent) {
  // Let the browser handle all modifier combos (Ctrl+V, Cmd+C, Ctrl+A, etc.)
  if (e.ctrlKey || e.metaKey)
    return

  const { key } = e

  // Virtual keyboards (e.g. Android Gboard) often report "Unidentified" here.
  // Those are not prevented and get handled by the `input` event instead.
  if (key.length === 1 && pattern.value.test(key)) {
    e.preventDefault()
    typeChar(key)
  }
  else if (key === 'Backspace') {
    e.preventDefault()
    backspace()
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
    if (cursorIndex.value < Math.min(otpValue.value.length, maxLen.value - 1))
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

// Reaching this handler means keydown did not prevent the default action.
// That happens with virtual keyboards, IMEs, SMS / password manager autofill.
function onInput(e: Event) {
  const ie = e as InputEvent

  // Composition is handled once it ends
  if (ie.isComposing)
    return

  switch (ie.inputType) {
    case 'insertText':
      for (const char of ie.data ?? '')
        typeChar(char)
      break
    case 'deleteContentBackward':
      backspace()
      break
    case 'deleteContentForward':
      setOtpValue(setCharAt(otpValue.value, '', cursorIndex.value))
      break
    default: {
      // insertReplacementText, insertFromPaste, autofill (undefined), ...
      const value = (e.target as HTMLInputElement).value
      if (value)
        applyValue(value)
    }
  }

  syncInput()
}

function onCompositionEnd(e: CompositionEvent) {
  for (const char of e.data ?? '')
    typeChar(char)
  syncInput()
}
</script>

<template>
  <div class="vui-otp" :class="{ disabled, invalid }">
    <input
      ref="inputRef"
      type="text"
      :value="otpValue"
      :name
      :inputmode="mode === 'num' ? 'numeric' : 'text'"
      :maxlength="maxLen"
      :disabled
      :aria-label="label"
      :aria-invalid="invalid ? true : undefined"
      autocomplete="one-time-code"
      autocapitalize="none"
      autocorrect="off"
      spellcheck="false"
      class="vui-otp-input"
      @keydown="onKeyDown"
      @input="onInput"
      @compositionend="onCompositionEnd"
      @paste="onPaste"
      @blur="cursorIndex = -1"
      @focus="cursorIndex = Math.min(otpValue.length, maxLen - 1)"
    >

    <div class="vui-otp-items" aria-hidden="true">
      <slot>
        <!-- Fallback only renders when no items are passed in -->
        <template v-if="length">
          <OTPItem v-for="index in length" :key="index" :i="index - 1" />
        </template>
      </slot>
    </div>
  </div>
</template>
