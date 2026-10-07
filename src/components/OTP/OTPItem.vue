<script setup lang='ts'>
import { IconAsterisk } from '@iconify-prerendered/vue-ph'
import { inject, onUnmounted, watch } from 'vue'
import { OTP_KEY } from './otp'

interface Props {
  i: number
}

const props = defineProps<Props>()

const context = inject(OTP_KEY, null)

if (!context)
  throw new Error('[OTPItem] must be placed inside an <OTP /> component.')

const {
  otpValue,
  cursorIndex,
  redacted,
  register,
} = context

// Re-register when the index changes and clean up on unmount, so the parent
// always knows the real amount of items
let unregister = register(props.i)
watch(() => props.i, (index) => {
  unregister()
  unregister = register(index)
})
onUnmounted(() => unregister())
</script>

<template>
  <div
    class="vui-otp-item" :class="{
      'active': props.i === cursorIndex,
      'has-value': otpValue.trim().at(props.i),
    }"
  >
    <div class="blinker" />
    <template v-if="otpValue.trim().at(props.i)">
      <IconAsterisk v-if="redacted" />
      <template v-else>
        {{ otpValue.at(props.i) }}
      </template>
    </template>
  </div>
</template>
