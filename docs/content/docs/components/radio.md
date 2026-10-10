# Radio

The Radio component is a form control that allows users to select a single option from a list of choices. It can be used individually or as part of a `RadioGroup` for managing multiple related options.

::radio-example{sourcePath="Radio/Radio.vue"}

```vue
<script setup>
import { Radio, RadioGroup } from '@dolanske/vui'
import { ref } from 'vue'

const selected = ref('option1')
</script>

<template>
  <RadioGroup v-model="selected" label="Choose an option" gap="xl" x-center>
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
</template>
```

::

### Props

| Name       | Default | Type                                                                             |
| ---------- | ------- | -------------------------------------------------------------------------------- |
| `value`    | —       | `any` <br> The value of the radio button                                         |
| `label`    | —       | `string` <br> The label text for the radio button                                |
| `disabled` | `false` | `boolean` <br> Whether the radio button is disabled                              |
| `accent`   | `false` | `boolean` <br> Whether to use the accent color                                   |
| `name`     | —       | `string` <br> Native `name`. Inherited from the parent `RadioGroup` when omitted |

### Events

| Name     | Payload | Description                                          |
| -------- | ------- | ---------------------------------------------------- |
| `change` | `any`   | Emitted with the radio `value` when it gets selected |

### Slots

| Name      | Accepts | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| `default` | `any`   | Content to be displayed as the label (overrides the `label` prop if provided) |

## Single vs Grouped

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

### RadioGroup Props

The `RadioGroup` component wraps its slot in a [Flex](/docs/components/flex) component and also accepts all of its props to properly position the contents.

| Name       | Default | Type                                                                              |
| ---------- | ------- | --------------------------------------------------------------------------------- |
| `disabled` | `false` | `boolean` <br> Disables every radio in the group (a native disabled `<fieldset>`) |
| `label`    | —       | `string` <br> Accessible group label, rendered as the fieldset legend             |
| `name`     | —       | `string` <br> Native `name` shared by all radios. Generated when omitted          |
| `required` | `false` | `boolean` <br> Requires a selection when submitting a form                        |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token              | Default | Description       |
| ------------------ | ------- | ----------------- |
| `--vui-radio-size` | `24px`  | Radio button size |
