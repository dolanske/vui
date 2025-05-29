# OTP

A One-Time Password (OTP) input component that provides a user-friendly way to enter verification codes. It supports both numeric and alphanumeric inputs, with features like paste support and redacted display.

## Usage

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
    <OTPItem :i="3" />
    <OTPItem :i="4" />
    <OTPItem :i="5" />
  </OTP>
</template>
```

## Components

### OTP

The main OTP container component that manages the input state and behavior.

#### Props

| Name       | Type                        | Default  | Description                                                   |
| ---------- | --------------------------- | -------- | ------------------------------------------------------------- |
| `mode`     | `'num' \| 'char' \| 'both'` | `'both'` | Type of input allowed: numbers only, characters only, or both |
| `redacted` | `boolean`                   | `false`  | Whether to show asterisks instead of the actual input         |

#### Events

| Name       | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| `change`   | `string` | Emitted when the OTP value changes     |
| `complete` | `string` | Emitted when all OTP fields are filled |

### OTPItem

Individual input field component for the OTP.

#### Props

| Name | Type     | Description                      |
| ---- | -------- | -------------------------------- |
| `i`  | `number` | Index of the OTP field (0-based) |

## Features

- Keyboard navigation (arrow keys)
- Paste support for the entire code
- Visual feedback for active field
- Support for both numeric and alphanumeric inputs
- Option to redact the input (show asterisks)
- Automatic focus management

## Examples

### Numeric OTP

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
    <OTPItem :i="3" />
    <OTPItem :i="4" />
    <OTPItem :i="5" />
  </OTP>
</template>
```

### Alphanumeric OTP

```vue
<script setup>
import { OTP, OTPItem } from '@dolanske/vui'
import { ref } from 'vue'

const otpValue = ref('')
</script>

<template>
  <OTP v-model="otpValue" mode="both">
    <OTPItem :i="0" />
    <OTPItem :i="1" />
    <OTPItem :i="2" />
    <OTPItem :i="3" />
  </OTP>
</template>
```

### Redacted OTP

```vue
<script setup>
import { OTP, OTPItem } from '@dolanske/vui'
import { ref } from 'vue'

const otpValue = ref('')
</script>

<template>
  <OTP v-model="otpValue" mode="num" redacted>
    <OTPItem :i="0" />
    <OTPItem :i="1" />
    <OTPItem :i="2" />
    <OTPItem :i="3" />
  </OTP>
</template>
```

### Custom Length OTP

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
    <OTPItem :i="3" />
    <OTPItem :i="4" />
    <OTPItem :i="5" />
    <OTPItem :i="6" />
    <OTPItem :i="7" />
  </OTP>
</template>
```
