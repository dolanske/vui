# Counter Input

A specialized input component for numeric values that includes increment and decrement buttons. It extends the base Input component with counter-specific functionality.

::counter-example

```vue
<script setup>
import { Counter } from '@dolanske/vui'
</script>

<template>
  <Counter v-model="count" />
</template>
```

::

### Props

The Counter component accepts all props from the base Input component, with the following additions:

| Name               | Default | Type      | Description                                                         |
| ------------------ | ------- | --------- | ------------------------------------------------------------------- |
| `incrementBy`      | `1`     | `number`  | Amount to increment the value by when clicking the increment button |
| `incrementEnabled` | `true`  | `boolean` | Whether the increment button is enabled                             |
| `hideIncrement`    | `false` | `boolean` | Whether to hide the increment button                                |
| `decrementBy`      | `1`     | `number`  | Amount to decrement the value by when clicking the decrement button |
| `decrementEnabled` | `true`  | `boolean` | Whether the decrement button is enabled                             |
| `hideDecrement`    | `false` | `boolean` | Whether to hide the decrement button                                |

### Basic Usage

```vue
<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <Counter v-model="count" />
</template>
```

### With Custom Increment/Decrement Values

```vue
<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <Counter
    v-model="count"
    :increment-by="5"
    :decrement-by="5"
  />
</template>
```

### With Disabled Buttons

```vue
<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <Counter
    v-model="count"
    :increment-enabled="count < 10"
    :decrement-enabled="count > 0"
  />
</template>
```

### With Hidden Buttons

```vue
<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <Counter
    v-model="count"
    :hide-increment="true"
    :hide-decrement="true"
  />
</template>
```

### With Label and Placeholder

```vue
<script setup>
import { Counter } from '@dolanske/vui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <Counter
    v-model="count"
    label="Quantity"
    placeholder="Enter quantity"
  />
</template>
```
