# Alert

Alert banners are full width components used to display important messages or notifications to users.

::alert-example

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

| Name          | Default   | Type                                                                                           |
| ------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `variant`     | `neutral` | `neutral`, `info`, `success`, `warning`, `danger` <br> The visual style of the alert           |
| `icon`        | —         | `string` <br> Override the variant's default icon                                              |
| `title`       | —         | `string` <br> Optional title for the alert. When provided, uses a different styling than slots |
| `filled`      | —         | `boolean` <br> When true, uses a stronger color variant with colored background                |
| `description` | —         | `string` <br> Optional description text for the alert                                          |

### Slots

| Name      | Accepts | Description                   |
| --------- | ------- | ----------------------------- |
| `default` | `any`   | The main content of the alert |

Please note. Unless you're using the `description` prop, the Alert component does not style the default slot at all. If you are passing in simple text, please wrap it in a `<p>` for consistent typography.

### Examples

#### Custom Icon, Title and Description

::alert-custom-example

```vue
<script setup>
import { Alert } from '@dolanske/vui'
</script>

<template>
  <Alert
    variant="info"
    icon="ph:info"
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
      <Button variant="warning" size="sm">
        Extend Session
      </Button>
    </Flex>
  </Alert>
</template>
```

::
