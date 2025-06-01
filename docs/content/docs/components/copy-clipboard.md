# Copy Clipboard

A component that provides a simple way to copy text to the clipboard with a confirmation tooltip. It uses the Clipboard API and provides a flexible way to customize the copy confirmation UI.

::copy-clipboard-example

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'
</script>

<template>
  <CopyClipboard text="Hello world!" confirm>
    <Button>
      Copy Text
    </Button>
  </CopyClipboard>
</template>
```

::

### Props

| Name                | Default | Type                                                                                                                   |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `text`              | -       | `string` <br> The text to copy to the clipboard                                                                        |
| `confirm`           | `false` | `string \| boolean` <br> Whether to show a confirmation tooltip. If set to string, uses it as the confirmation message |
| `confirm-time`      | `1500`  | `number` <br> How long the confirmation tooltip should be visible in milliseconds                                      |
| `confirm-placement` | `top`   | `Placement` <br> Position of the confirmation tooltip (from `@floating-ui/vue` library)                                |

## Slots

| Name      | Accepts | Props              | Description                         |
| --------- | ------- | ------------------ | ----------------------------------- |
| `default` | `any`   | `DefaultSlotProps` | Main content of the copy button     |
| `confirm` | `any`   | -                  | Custom confirmation tooltip content |

```ts
interface DefaultSlotProps {
  // Manually call the copying function
  copy: () => void
  // Tracks whether the text has been copied
  // for the set amount of duration by confirm-time
  copied: Ref<boolean>
}
```

### Customized

Here's a heavily customized copy-clipboard using all the props

::copy-clipboard-custom-example

```vue
<script setup>
import { Badge, Button, Card, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard
    text="Hello world!"
    confirm
    confirm-placement="bottom-end"
    :confirm-time="3500"
  >
    <Button>
      Click me
    </Button>
    <template #confirm>
      <Card separators>
        <template #header>
          <Badge variant="accent">
            Copied
          </Badge>
        </template>
        <p class="m-0">
          Lorem ipsum dolor sit amet.
        </p>
      </Card>
    </template>
  </CopyClipboard>
</template>
```

::
