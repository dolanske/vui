# Counter

A specialized input component for numeric values that includes increment and decrement buttons. It extends the base Input component with counter-specific functionality.

::counter-example

```vue
<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <Counter
    v-model="count"
    hint="Choose a number between 0 and 10"
    label="Counter"
    :increment-enabled="count < 10"
    :decrement-enabled="count > 0"
  />
</template>
```

::

### Props

The Counter component accepts all props from the base [Input](/docs/components/input) component, with the following additions:

| Name                | Default | Type                                                                              |
| ------------------- | ------- | --------------------------------------------------------------------------------- |
| `increment-by`      | `1`     | `number` <br> Amount to increment the value by when clicking the increment button |
| `increment-enabled` | `true`  | `boolean` <br> Whether the increment button is enabled                            |
| `hide-increment`    | `false` | `boolean` <br> Whether to hide the increment button                               |
| `decrement-by`      | `1`     | `number` <br> Amount to decrement the value by when clicking the decrement button |
| `decrement-enabled` | `true`  | `boolean` <br> Whether the decrement button is enabled                            |
| `hide-decrement`    | `false` | `boolean` <br> Whether to hide the decrement button                               |
