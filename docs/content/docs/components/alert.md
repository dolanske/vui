# Alert

Alert banners are full width components used to display important messages or notifications to users.

Alerts are announced to screen readers when they appear. `danger` and `warning` alerts use `role="alert"` (interrupting), all other variants use `role="status"` (polite). Use `live="none"` for static content which is part of the page from the start.

::alert-example{sourcePath="Alert/Alert.vue"}

```vue
<script setup>
import { Alert } from '@dolanske/vui'
</script>

<template>
  <Alert variant="neutral" filled>
    <p>This is a neutral alert</p>
  </Alert>

  <Alert variant="info" filled>
    <p>This is an info alert</p>
  </Alert>

  <Alert variant="success" filled>
    <p>This is a success alert</p>
  </Alert>

  <Alert variant="warning" filled>
    <p>This is a warning alert</p>
  </Alert>

  <Alert variant="danger" filled>
    <p>This is a danger alert</p>
  </Alert>
</template>
```

::

### Props

| Name            | Default   | Type                                                                                                                                    |
| --------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | `neutral` | `neutral` `info` `success` `warning` `danger` `accent` `note` <br> The visual style of the alert                                        |
| `title`         | —         | `string` <br> Optional title for the alert                                                                                              |
| `description`   | —         | `string` <br> Optional description rendered under the title                                                                             |
| `filled`        | `false`   | `boolean` <br> When true, uses a stronger color variant with colored background                                                         |
| `filled-strong` | `false`   | `boolean` <br> When true, uses a high visibility colored background                                                                     |
| `icon-align`    | `center`  | `start` `center` `end` <br> Controls the vertical alignment of the alert icon                                                           |
| `hide-icon`     | `false`   | `boolean` <br> Hides the default icon completely. If hiding the icon, prefer using the `filled` variant to preserve color-coding        |
| `dismissible`   | `false`   | `boolean` <br> Shows a close button which emits `dismiss`                                                                               |
| `dismiss-label` | `Dismiss` | `string` <br> Accessible label of the close button                                                                                      |
| `live`          | —         | `alert` `status` `none` <br> How screen readers announce the alert. Defaults to `alert` for `danger` / `warning` and `status` otherwise |

### Events

| Name      | Payload | Description                              |
| --------- | ------- | ---------------------------------------- |
| `dismiss` | —       | Emitted when the close button is clicked |

### Slots

| Name      | Accepts | Description                                                             |
| --------- | ------- | ----------------------------------------------------------------------- |
| `default` | `any`   | The main content of the alert. Rendered below `title` and `description` |
| `icon`    | `any`   | Custom icon that replaces the default variant icon                      |
| `end`     | `any`   | Optional content rendered at the end of the alert                       |

`title`, `description` and the default slot can be combined. When only the default slot is used, it is not styled. If you are passing in simple text, wrap it in a `<p>` for consistent typography.

### Examples

#### Custom Title and Description

::alert-custom-example

```vue
<script setup>
import { Alert } from '@dolanske/vui'
</script>

<template>
  <Alert
    variant="info"
    title="System Update"
    description="A new version of the system is available. Please update to the latest version to ensure optimal performance and security."
  />
</template>
```

::

#### Components in Slots

::alert-components-example

```vue
<script setup>
import { Alert, Button, Flex } from '@dolanske/vui'
</script>

<template>
  <Alert variant="warning" filled>
    <Flex y-center x-between>
      <p class="m-0">
        Your session will expire in 5 minutes
      </p>
      <Button variant="warning" size="s">
        Extend Session
      </Button>
    </Flex>
  </Alert>
</template>
```

::

#### Dismissible

```vue
<script setup>
import { Alert } from '@dolanske/vui'
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <Alert v-if="visible" variant="success" title="Saved" dismissible @dismiss="visible = false" />
</template>
```

### Tokens

CSS variable tokens used for global or per-instance manipulation of certain styling.

| Token                 | Default                                  | Description                  |
| --------------------- | ---------------------------------------- | ---------------------------- |
| `--vui-alert-padding` | [`var(--space-s)`](/docs/tokens/spacing) | Alert inner padding          |
| `--vui-alert-gap`     | [`var(--space-s)`](/docs/tokens/spacing) | Gap between icon and content |
