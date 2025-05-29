# Radio

The Radio component is a form control that allows users to select a single option from a list of choices. It can be used individually or as part of a RadioGroup for managing multiple related options.

## Usage

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected">
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

## Props

### Radio Props

| Prop         | Type      | Default | Description                          |
| ------------ | --------- | ------- | ------------------------------------ |
| `modelValue` | `any`     | -       | The selected value                   |
| `value`      | `any`     | -       | The value of the radio button        |
| `label`      | `string`  | -       | The label text for the radio button  |
| `disabled`   | `boolean` | `false` | Whether the radio button is disabled |
| `accent`     | `boolean` | `false` | Whether to use the accent color      |

### RadioGroup Props

| Prop         | Type                | Default | Description                                         |
| ------------ | ------------------- | ------- | --------------------------------------------------- |
| `modelValue` | `any`               | -       | The selected value                                  |
| `disabled`   | `boolean`           | `false` | Whether all radio buttons in the group are disabled |
| `direction`  | `'row' \| 'column'` | `'row'` | The direction of the radio group                    |
| `gap`        | `string`            | `'sm'`  | The gap between radio buttons                       |

## Features

- Support for both single and group selection
- Customizable appearance with accent color option
- Disabled state support
- Flexible layout options with direction and gap control
- Custom content support through slots

## Examples

### Basic Radio Group

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected">
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

### Vertical Radio Group

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected" direction="column">
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

### Disabled Radio Group

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected" disabled>
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

### Accent Radio Group

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected">
    <Radio value="option1" label="Option 1" accent />
    <Radio value="option2" label="Option 2" accent />
    <Radio value="option3" label="Option 3" accent />
  </RadioGroup>
</template>
```

### Custom Content Radio

```vue
<script setup lang="ts">
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected">
    <Radio value="option1">
      <div class="flex items-center gap-sm">
        <Icon icon="ph:star" />
        <span>Option 1</span>
      </div>
    </Radio>
    <Radio value="option2">
      <div class="flex items-center gap-sm">
        <Icon icon="ph:heart" />
        <span>Option 2</span>
      </div>
    </Radio>
  </RadioGroup>
</template>
```
