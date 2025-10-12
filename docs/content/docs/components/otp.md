# OTP

A One-Time Password (OTP) input component that provides a user-friendly way to enter verification codes. It supports both numeric and alphanumeric inputs, with features like paste support and redacted display.

::one-time-password-example

```vue
<script setup>
import { OTP, OTPItem } from '@dolanske/vui'
import { ref } from 'vue'

const otpValue = ref('')
</script>

<template>
  <OTP v-model="otpValue" mode="num">
    <OTPItem :i="0" />
    <OTPItem :i="1" />
    <OTPItem :i="2" />
    <div class="px-m y-center">
      -
    </div>
    <OTPItem :i="3" />
    <OTPItem :i="4" />
    <OTPItem :i="5" />
  </OTP>
</template>
```

::

### Props

| Name       | Default | Type                                                                                   |
| ---------- | ------- | -------------------------------------------------------------------------------------- |
| `mode`     | `both`  | `num` `char` `both` <br> Type of input allowed: numbers only, characters only, or both |
| `redacted` | `false` | `boolean` <br> Whether to show asterisks instead of the actual input                   |

### Events

| Name       | Payload  | Type                                   |
| ---------- | -------- | -------------------------------------- |
| `change`   | `string` | Emitted when the OTP value changes     |
| `complete` | `string` | Emitted when all OTP fields are filled |
