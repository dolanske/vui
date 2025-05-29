# CopyClipboard

A component that provides a simple way to copy text to the clipboard with a confirmation tooltip. It uses the Clipboard API and provides a flexible way to customize the copy confirmation UI.

## Usage

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard :text="textToCopy" confirm>
    <Button>
      Copy Text
    </Button>
  </CopyClipboard>
</template>
```

## Props

| Name               | Type                | Default | Description                                                                            |
| ------------------ | ------------------- | ------- | -------------------------------------------------------------------------------------- |
| `text`             | `string`            | -       | The text to copy to the clipboard                                                      |
| `confirm`          | `string \| boolean` | `false` | Whether to show a confirmation tooltip. If string, uses it as the confirmation message |
| `confirmTime`      | `number`            | -       | How long the confirmation tooltip should be visible in milliseconds                    |
| `confirmPlacement` | `Placement`         | `'top'` | Position of the confirmation tooltip (from @floating-ui/vue)                           |

## Slots

| Name      | Props                                   | Description                         |
| --------- | --------------------------------------- | ----------------------------------- |
| `default` | `{ copy: () => void, copied: boolean }` | Main content of the copy button     |
| `confirm` | -                                       | Custom confirmation tooltip content |

## Examples

### Basic Usage

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard :text="textToCopy" confirm>
    <Button>
      Copy Text
    </Button>
  </CopyClipboard>
</template>
```

### Custom Confirmation Message

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard :text="textToCopy" confirm="Text copied!">
    <Button>
      Copy Text
    </Button>
  </CopyClipboard>
</template>
```

### Custom Confirmation UI

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard :text="textToCopy" confirm>
    <Button>
      Copy Text
    </Button>
    <template #confirm>
      <div class="p-sm bg-green-500 text-white rounded">
        Successfully copied!
      </div>
    </template>
  </CopyClipboard>
</template>
```

### Different Tooltip Placement

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard :text="textToCopy" confirm confirm-placemen="bottom">
    <Button>
      Copy Text
    </Button>
  </CopyClipboard>
</template>
```

### Custom Duration

```vue
<script setup>
import { Button, CopyClipboard } from '@dolanske/vui'

const textToCopy = 'Hello, World!'
</script>

<template>
  <CopyClipboard :text="textToCopy" confirm :confirm-time="2000">
    <Button>
      Copy Text
    </Button>
  </CopyClipboard>
</template>
```
