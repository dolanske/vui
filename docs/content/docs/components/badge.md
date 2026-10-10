# Badge

Badges are used to display a status of an object or action that a component has performed. Often used inside tables and other data lists. Badges render a `<span>`, so they can be placed inside text.

::badge-example{sourcePath="Badge/Badge.vue"}

```vue
<script setup>
import { Badge } from '@dolanske/vui'
</script>

<template>
  <Badge size="s" variant="info">
    New
  </Badge>
  <Badge>
    Overview
  </Badge>
  <Badge variant="success" outline>
    <Icon name="ph:bell" />
    Subscribed
  </Badge>
  <Badge circle filled variant="warning">
    12
  </Badge>
  <Badge size="l" variant="accent">
    Admin
  </Badge>
</template>
```

::

### Props

| Name          | Default   | Type                                                                                             |
| ------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `variant`     | `neutral` | `neutral` `danger` `warning` `success` `info` `accent` `note` <br> The visual style of the badge |
| `outline`     | `false`   | `boolean` <br> Whether to show the badge with an outline style                                   |
| `filled`      | `false`   | `boolean` <br> Whether to show the badge with a filled background                                |
| `size`        | `m`       | `s` `m` `l` <br> Controls the size of the badge                                                  |
| `circle`      | `false`   | `boolean` <br> Renders the badge as a circle. Useful for numeric counters or status dots         |
| `removable`   | `false`   | `boolean` <br> Shows a remove button which emits `remove`, e.g. for filter chips                 |
| `removeLabel` | `Remove`  | `string` <br> Accessible label of the remove button                                              |

### Events

| Name     | Payload | Description                               |
| -------- | ------- | ----------------------------------------- |
| `remove` | —       | Emitted when the remove button is clicked |

### Slots

| Name      | Accepts | Description                         |
| --------- | ------- | ----------------------------------- |
| `default` | `any`   | Content to display inside the badge |

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                        | Default                                   | Description        |
| ---------------------------- | ----------------------------------------- | ------------------ |
| `--vui-badge-padding-block`  | `2px`                                     | Vertical padding   |
| `--vui-badge-padding-inline` | [`var(--space-s)`](/docs/tokens/spacing)  | Horizontal padding |
| `--vui-badge-font-size`      | [`var(--font-size-s)`](/docs/tokens/text) | Font size          |
| `--vui-badge-height`         | `26px` (`18px` small, `36px` large)       | Badge height       |
