<script setup lang='ts'>
import type { OtpContext } from './OTP.vue'
import { IconAsterisk } from '@iconify-prerendered/vue-ph'

import { inject } from 'vue'

interface Props {
  i: number
}

const props = defineProps<Props>()

const {
  otpValue,
  cursorIndex,
  redacted,
  register,
} = inject('otp-context') as OtpContext

register()
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
