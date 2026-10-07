# Checkbox

A checkbox component that supports custom icons, labels, an indeterminate state and array models. It can be used with `v-model` or with the `checked` prop alone.

Attributes such as `name`, `aria-*` or `@focus` are forwarded to the native `<input>`, while `class` and `style` stay on the wrapper.

::checkbox-example{sourcePath="Checkbox/Checkbox.vue"}

```vue
<script setup>
import { Checkbox } from '@dolanske/vui'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <Checkbox v-model="checked" label="Basic checkbox" />
  <Checkbox label="Disabled checkbox" disabled />
  <Checkbox label="Initially checked, without v-model" checked />
  <Checkbox v-model="checked" accent>
    <template #icon-on>
      <IconToggleRightFill />
    </template>
    <template #icon-off>
      <IconToggleLeft />
    </template>
    <template #default>
      Custom icons with <code>accent</code> color
    </template>
  </Checkbox>
</template>
```

::

### Props

| Name            | Default | Type                                                                                                       |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `label`         | —       | `string` <br> Text label for the checkbox                                                                  |
| `disabled`      | `false` | `boolean` <br> Disables the checkbox                                                                       |
| `checked`       | —       | `boolean` <br> Checked state when `v-model` is not used                                                    |
| `indeterminate` | `false` | `boolean` <br> Shows a mixed state, e.g. when only some nested items are selected                          |
| `value`         | —       | `any` <br> Added to / removed from an array `v-model`. Also used as the native value when submitting forms |
| `name`          | —       | `string` <br> Native `name` used for form submission                                                       |
| `required`      | `false` | `boolean` <br> Marks the checkbox as required                                                              |
| `hint`          | —       | `string` <br> Helper text below the label, linked with `aria-describedby`                                  |
| `errors`        | `[]`    | `string[]` <br> Error messages. Marks the checkbox as invalid                                              |
| `accent`        | `false` | `boolean` <br> Uses accent color for the checkbox                                                          |

### Models

| Name         | Type                  | Description                                                                          |
| ------------ | --------------------- | ------------------------------------------------------------------------------------ |
| `modelValue` | `boolean` `unknown[]` | A boolean, or an array which gets the checkbox `value` added or removed when toggled |

### Events

| Name     | Payload   | Description                             |
| -------- | --------- | --------------------------------------- |
| `change` | `boolean` | Emitted when the checkbox state changes |

### Slots

| Name                 | Accepts | Description                                                                   |
| -------------------- | ------- | ----------------------------------------------------------------------------- |
| `default`            | `any`   | Content to be displayed as the label (overrides the `label` prop if provided) |
| `icon-on`            | `any`   | Icon shown while checked. Defaults to a filled check square                   |
| `icon-off`           | `any`   | Icon shown while unchecked. Defaults to an empty square                       |
| `icon-indeterminate` | `any`   | Icon shown while `indeterminate`. Defaults to a filled minus square           |

### Array model

```vue
<script setup>
import { Checkbox } from '@dolanske/vui'
import { ref } from 'vue'

const toppings = ref(['cheese'])
</script>

<template>
  <Checkbox v-model="toppings" value="cheese" label="Cheese" />
  <Checkbox v-model="toppings" value="ham" label="Ham" />
  <Checkbox v-model="toppings" value="olives" label="Olives" />
</template>
```

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                 | Default | Description               |
| --------------------- | ------- | ------------------------- |
| `--vui-checkbox-size` | `24px`  | Checkbox width and height |
