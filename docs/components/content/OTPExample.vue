<script setup lang="ts">
import { OTP, OTPItem } from '@dolanske/vui'
import { ref } from 'vue'

const numericOtp = ref('')
const alphanumericOtp = ref('')
const redactedOtp = ref('')
const customLengthOtp = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Numeric OTP -->
        <div>
          <h3 class="mb-sm">
            Numeric OTP
          </h3>
          <OTP v-model="numericOtp" mode="num">
            <OTPItem :i="0" />
            <OTPItem :i="1" />
            <OTPItem :i="2" />
            <OTPItem :i="3" />
            <OTPItem :i="4" />
            <OTPItem :i="5" />
          </OTP>
        </div>

        <!-- Alphanumeric OTP -->
        <div>
          <h3 class="mb-sm">
            Alphanumeric OTP
          </h3>
          <OTP v-model="alphanumericOtp" mode="both">
            <OTPItem :i="0" />
            <OTPItem :i="1" />
            <OTPItem :i="2" />
            <OTPItem :i="3" />
          </OTP>
        </div>

        <!-- Redacted OTP -->
        <div>
          <h3 class="mb-sm">
            Redacted OTP
          </h3>
          <OTP v-model="redactedOtp" mode="num" redacted>
            <OTPItem :i="0" />
            <OTPItem :i="1" />
            <OTPItem :i="2" />
            <OTPItem :i="3" />
          </OTP>
        </div>

        <!-- Custom Length OTP -->
        <div>
          <h3 class="mb-sm">
            Custom Length OTP
          </h3>
          <OTP v-model="customLengthOtp" mode="num">
            <OTPItem :i="0" />
            <OTPItem :i="1" />
            <OTPItem :i="2" />
            <OTPItem :i="3" />
            <OTPItem :i="4" />
            <OTPItem :i="5" />
            <OTPItem :i="6" />
            <OTPItem :i="7" />
          </OTP>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
