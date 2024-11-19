<script setup lang='ts'>
import type { OtpContext } from './OTP.vue'
import { Icon } from '@iconify/vue'
import { inject, watchEffect } from 'vue'
import { isNil } from '../../shared/helpers'

interface Props {
  i: number
}

const props = defineProps<Props>()

const {
  otpValue,
  cursorIndex,
  redacted,
} = inject('otp-context') as OtpContext
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
      <Icon v-if="redacted" icon="ph:asterisk" />
      <template v-else>
        {{ otpValue.at(props.i) }}
      </template>
    </template>
  </div>
</template>
