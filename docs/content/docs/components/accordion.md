# Accordion

An accordion is an interactive heading that reveals an associated section of content when clicked. It can be grouped together with multiple accordions using the [AccordionGroup](/docs/components/accordion-group) component.

The header is a button with `aria-expanded` and `aria-controls`, and the content is a labelled region. Collapsed content is `inert`, so links inside of it can not be reached with the keyboard.

::accordion-example{sourcePath="Accordion/Accordion.vue"}

```vue
<script setup>
import { Accordion } from '@dolanske/vui'
</script>

<template>
  <Accordion label="About Vui" card class="mb-xs">
    <p>Vui is a Vue 3 component library</p>
  </Accordion>
</template>
```

::

### Props

| Name       | Default | Type                                                                                                    |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `open`     | `false` | `boolean` <br> Whether the accordion is open. Supports `v-model:open`                                   |
| `label`    | —       | `string` <br> If provided, the accordion will display the text in the header                            |
| `card`     | `false` | `boolean` <br> If set as true, the accordion will look like the [card component](/docs/components/card) |
| `unstyled` | `false` | `boolean` <br> Removes default styling and allows fully custom trigger/content styling                  |
| `value`    | —       | `string` <br> Identifies the accordion inside an `AccordionGroup` `v-model`. Generated automatically    |
| `disabled` | `false` | `boolean` <br> Prevents the accordion from being toggled                                                |

### Events

| Name          | Payload   | Description                                                 |
| ------------- | --------- | ----------------------------------------------------------- |
| `open`        | —         | Emitted when the accordion opens. Never emitted on mount    |
| `close`       | —         | Emitted when the accordion closes. Never emitted on mount   |
| `update:open` | `boolean` | Emitted when the open state changes, used by `v-model:open` |

### Slots

| Name      | Accepts | Description                                                                                                                                                                    |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `default` | `any`   | The content inside the accordion                                                                                                                                               |
| `header`  | `any`   | Custom content of the default header button, replacing the `label` prop                                                                                                        |
| `trigger` | `any`   | Replaces the whole header. Receives `open`, `close`, `toggle`, `isOpen` and `attrs`. Bind `attrs` to your trigger element to keep `aria-expanded` and `aria-controls` in place |

### Exposes

When queried via `useTemplateRef`, this component exposes

| Name     | Type           | Usage                                                 |
| -------- | -------------- | ----------------------------------------------------- |
| `open`   | `method`       | When called, the accordion will open                  |
| `close`  | `method`       | When called, the accordion will close                 |
| `toggle` | `method`       | Toggles between opened and closed state               |
| `isOpen` | `Ref<boolean>` | Ref which tracks whether the accordion is open or not |

### Examples

The following example shows the implementation of an unstyled element with a custom header. The `attrs` slot prop wires up the accessibility attributes.

::accordion-custom-header-example

```vue
<script setup>
import { Accordion, Button } from '@dolanske/vui'
import { IconCaretDown, IconCaretUp } from '@iconify-prerendered/vue-ph'
</script>

<template>
  <Accordion unstyled>
    <template #trigger="{ isOpen, toggle, attrs }">
      <Button v-bind="attrs" @click="toggle">
        Details
        <IconCaretUp v-if="isOpen" />
        <IconCaretDown v-else />
      </Button>
    </template>
    <p class="m-0">
      Vui provides a lot of customization.
    </p>
  </Accordion>
</template>
```

::
