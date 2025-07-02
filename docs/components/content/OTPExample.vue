<script setup lang="ts">
import { OTP, OTPItem } from '@dolanske/vui'
import { ref } from 'vue'

const otpValue = ref('')
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column gap="xs" x-center y-center>
        <OTP v-model="otpValue" mode="num">
          <OTPItem :i="0" />
          <OTPItem :i="1" />
          <OTPItem :i="2" />
          <OTPItem :i="3" />
          <OTPItem :i="4" />
          <OTPItem :i="5" />
        </OTP>
        <p>Output: {{ otpValue }}</p>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
