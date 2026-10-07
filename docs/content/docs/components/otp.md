# OTP

A One-Time Password (OTP) input component that provides a user-friendly way to enter verification codes. It supports both numeric and alphanumeric inputs, with features like paste support, SMS autofill (`autocomplete="one-time-code"`), virtual keyboards and redacted display.

The length is taken from the rendered `OTPItem` components, or from the `length` prop. With `length` and no items, the items are rendered automatically.

::one-time-password-example{sourcePath="OTP/OTP.vue"}

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

| Name       | Default         | Type                                                                                     |
| ---------- | --------------- | ---------------------------------------------------------------------------------------- |
| `mode`     | `both`          | `num` `char` `both` <br> Type of input allowed: numbers only, characters only, or both   |
| `redacted` | `false`         | `boolean` <br> Whether to show asterisks instead of the actual input                     |
| `length`   | —               | `number` <br> Amount of characters. Renders the items automatically when none are passed |
| `label`    | `One-time code` | `string` <br> Accessible label of the input                                              |
| `disabled` | `false`         | `boolean` <br> Disables the input                                                        |
| `invalid`  | `false`         | `boolean` <br> Marks the code as invalid, e.g. after a failed verification               |
| `name`     | —               | `string` <br> Native `name` for form submission                                          |

### Events

| Name       | Payload  | Type                                           |
| ---------- | -------- | ---------------------------------------------- |
| `change`   | `string` | Emitted when the OTP value changes             |
| `complete` | `string` | Emitted once when all OTP fields become filled |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                        | Default                                          | Description           |
| ---------------------------- | ------------------------------------------------ | --------------------- |
| `--vui-otp-background-color` | [`var(--color-bg-lowered)`](/docs/tokens/colors) | Input cell background |
