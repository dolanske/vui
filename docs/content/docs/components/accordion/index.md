# Accordion

TODO: move this example to AccordionGroup. This page should be only for the singular accordion

Vertical stack of interactive component(s), where each upon clicking reveals associated content within. These can be configured to work standalone and controlled via props or put inside a group which manages their state.

::accordion-example

```vue
<template>
  <AccordionGroup single>
    <Accordion label="About Vui" card class="mb-xs">
      <p>Vui is a vu3 component library</p>
    </Accordion>
    <Accordion label="About Vui" card class="mb-xs">
      <p>Just clone the repo and submit a PR!</p>
    </Accordion>
  </AccordionGroup>
</template>
```

::

### Props

When not used within a group, accordions just add as simple collapsible content with a header and content.

| Name    | Default | Type                                                                                                    |
| ------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `open`  | —       | `boolean` <br> Controls whether the accordion is open from the outside                                  |
| `label` | —       | `string` <br> If provided, the acordion will display the text in the header                             |
| `card`  | —       | `boolean` <br> If set as true, the accordion will look like the [card component](/docs/components/card) |

### Events

| Name    | Payload | Type                                |
| ------- | ------- | ----------------------------------- |
| `open`  | —       | Called whenever the accordion opens |
| `close` | —       | Called when the accordion closes    |

### Slots

TBA

### Exposes

When queries via `useTemplateRef`, this component exposes

| Name     | Type          | Usage                                               |
| -------- | ------------- | --------------------------------------------------- |
| `open`   | `method`      | When called, the accordion will open                |
| `close`  | `method`      | When called, the accordion will close               |
| `toggle` | `method`      | Toggles between opened and closed state             |
| `isOpen` | `Ref<boolean` | Ref which tracks whether the boolean is open or not |
