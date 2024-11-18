<script setup lang='ts'>
import type { OtpContext } from './OTP.vue'
import { inject } from 'vue'
import { isNil } from '../../shared/helpers'

interface Props {
  i: number
}

const props = defineProps<Props>()

const {
  otpValue,
  cursorIndex,
} = inject('otp-context') as OtpContext
</script>

<template>
  <div
    class="vui-otp-item" :class="{
      'active': props.i === cursorIndex,
      // FIXME: has value shows all positive
      'has-value': !isNil(otpValue.at(props.i)),
    }"
  >
    {{ otpValue.at(props.i) }}
  </div>
</template>
