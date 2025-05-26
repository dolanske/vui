# Accordion

An accordion is an interactive heading that reveals an associated section of content when clicked. It can be grouped together with multiple accordions using the [AccordionGroup](/docs/components/accordion-group) component.

::accordion-example

```vue
<script setup>
import { Accordion } from '@dolanske/vui'
</script>

<template>
  <Accordion label="About Vui" card class="mb-xs">
    <p>Vui is a vu3 component library</p>
  </Accordion>
</template>
```

::

### Props

| Name    | Default | Type                                                                                                    |
| ------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `open`  | —       | `boolean` <br> Controls whether the accordion is open from the outside                                  |
| `label` | —       | `string` <br> If provided, the accordion will display the text in the header                            |
| `card`  | —       | `boolean` <br> If set as true, the accordion will look like the [card component](/docs/components/card) |

### Events

| Name    | Payload | Type                                |
| ------- | ------- | ----------------------------------- |
| `open`  | —       | Called whenever the accordion opens |
| `close` | —       | Called when the accordion closes    |

### Slots

| Name      | Accepts | Description                                                                                                                                                                                                    |
| --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default` | `any`   | The content inside the accordion                                                                                                                                                                               |
| `trigger` | `any`   | Allows user to define custom header which opens the accordion when clicked. It will replace the `label` prop if provided. This slot also exposes all the properties defined in the [Exposes](#exposes) section |

Here's a simple example of how to define a custom header.

```vue
<script>
import { Accordion, Button, Icon } from '@dolanske/vui'
</script>

<template>
  <Accordion>
    <template #trigger="{ isOpen, toggle }">
      <Button @click="toggle">
        Details
        <Icon :name="isOpen ? 'chevron-up' : 'chevron-down'" />
      </Button>
    </template>
    <p>Vui provides a lot of customization.</p>
  </Accordion>
</template>
```

### Exposes

When queries via `useTemplateRef`, this component exposes

| Name     | Type          | Usage                                               |
| -------- | ------------- | --------------------------------------------------- |
| `open`   | `method`      | When called, the accordion will open                |
| `close`  | `method`      | When called, the accordion will close               |
| `toggle` | `method`      | Toggles between opened and closed state             |
| `isOpen` | `Ref<boolean` | Ref which tracks whether the boolean is open or not |
