# Radio

The Radio component is a form control that allows users to select a single option from a list of choices. It can be used individually or as part of a `RadioGroup` for managing multiple related options.

::radio-example

```vue
<script setup>
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected" gap="xl" x-center>
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

::

### Props

| Name       | Default | Type                                                |
| ---------- | ------- | --------------------------------------------------- |
| `value`    | —       | `any` <br> The value of the radio button            |
| `label`    | —       | `string` <br> The label text for the radio button   |
| `disabled` | `false` | `boolean` <br> Whether the radio button is disabled |
| `accent`   | `false` | `boolean` <br> Whether to use the accent color      |

### Events

| Name     | Payload | Description                             |
| -------- | ------- | --------------------------------------- |
| `change` | `any`   | Emitted when the selected value changes |

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed as the label (overrides the `label` prop if provided) |

### Single Usage vs RadioGroup

The `Radio` component can be used individually or grouped together within a `RadioGroup`.

```vue
<template>
  <Radio
    v-model="selected"
    value="option1"
    label="Single Option"
  />
</template>
```

When grouping, do not put `v-model` on the individual `Radio` components, but instead use the wrapper `RadioGroup` to control the selected value.

```vue
<template>
  <RadioGroup v-model="selected">
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

#### RadioGroup Props

The `RadioGroup` component wraps its slot in a [Flex](/components/flex) component and also accepts all of its props to properly position the contents.

| Name       | Default | Type                                                               |
| ---------- | ------- | ------------------------------------------------------------------ |
| `disabled` | `false` | `boolean` <br> Whether all radio buttons in the group are disabled |
