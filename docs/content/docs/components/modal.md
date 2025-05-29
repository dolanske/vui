# Modal

A modal component that displays content in a floating window over the main content. It supports various sizes, customization options, and can be used for dialogs, forms, or any other content that needs to be displayed in a focused context.

## Usage

```vue
<template>
  <Modal v-model:open="isOpen" title="Example Modal">
    <p>This is the modal content</p>
  </Modal>
</template>
```

## Props

| Name         | Type                                                      | Default | Description                                                    |
| ------------ | --------------------------------------------------------- | ------- | -------------------------------------------------------------- |
| `open`       | `boolean`                                                 | `false` | Controls the visibility of the modal                           |
| `size`       | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'full' \| 'screen'` | `'m'`   | Controls the width of the modal                                |
| `card`       | `CardProps`                                               | `{}`    | Props to pass to the underlying Card component                 |
| `scrollable` | `boolean`                                                 | `false` | Makes the modal content scrollable instead of the modal itself |
| `centered`   | `boolean`                                                 | `false` | Centers the modal vertically on the screen                     |
| `canDismiss` | `boolean`                                                 | `true`  | Whether the modal can be closed by clicking the X button       |

## Events

| Name    | Description                      |
| ------- | -------------------------------- |
| `close` | Emitted when the modal is closed |

## Slots

| Name      | Props                   | Description                   |
| --------- | ----------------------- | ----------------------------- |
| `default` | `{ close: () => void }` | The main content of the modal |
| `header`  | `{ close: () => void }` | Custom header content         |
| `footer`  | `{ close: () => void }` | Custom footer content         |

## Examples

### Basic Modal

```vue
<template>
  <Modal v-model:open="isOpen" title="Basic Modal">
    <p>This is a basic modal with default settings.</p>
  </Modal>
</template>
```

### Custom Sized Modal

```vue
<template>
  <Modal v-model:open="isOpen" size="l" title="Large Modal">
    <p>This is a large modal with custom size.</p>
  </Modal>
</template>
```

### Centered Modal with Custom Header

```vue
<template>
  <Modal v-model:open="isOpen" centered>
    <template #header="{ close }">
      <h2>Custom Header</h2>
      <Button @click="close" />
    </template>
    <p>This modal is centered and has a custom header.</p>
  </Modal>
</template>
```

### Scrollable Modal

```vue
<template>
  <Modal v-model:open="isOpen" scrollable title="Scrollable Content">
    <p v-for="i in 20" :key="i">
      This is a scrollable modal with lots of content.
    </p>
  </Modal>
</template>
```
