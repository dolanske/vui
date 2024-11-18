<script setup lang='ts'>
import type { ModelRef, Ref } from 'vue'
import { computed, provide, ref, watch } from 'vue'
import { isNil, setCharAt } from '../../shared/helpers'
import './otp.scss'

export interface OtpContext {
  otpValue: ModelRef<string>
  cursorIndex: Ref<number>
}

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

const otpValue = defineModel<string>({
  default: '',
})

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

// const otpValue = defineModel<string>({
//   default: '',
//   set(v) {
//     if (!v)
//       return ''
//     if (pattern.value.test(v) && v.length <= maxLen.value) {
//       if (v.length - 1 === cursorIndex) {
//         const replaced = setCharAt(v, )
//         return v
//       } else {
//         // Replace value at current index and increment it
//         v[]

//         return v
//       }

//     }
//     return otpValue.value
//   },
// })

provide('otp-context', {
  otpValue,
  cursorIndex,
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
  else if (key === 'ArrowRight' && cursorIndex.value < maxLen.value - 1) {
    cursorIndex.value++
  }
  else if (key === 'Backspace') {
    // If we press backspace multiple times
    if (otpValue.value.charAt(cursorIndex.value) === ' ') {
      cursorIndex.value--
    }
    otpValue.value = setCharAt(otpValue.value, ' ', cursorIndex.value)
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
    >
  </div>

  {{ cursorIndex }}
</template>
