# Sheet

The Sheet component is a slide-out panel that can be positioned on any side of the screen. It's commonly used for displaying additional content, forms, or navigation menus.

::sheet-example

## Props

| Prop        | Type                                     | Default   | Description                                                             |
| ----------- | ---------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `open`      | `boolean`                                | `false`   | Controls the visibility of the sheet                                    |
| `position`  | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Controls the position of the sheet                                      |
| `size`      | `number \| string`                       | `398`     | Sets the width of the sheet (for left/right) or height (for top/bottom) |
| `separator` | `boolean`                                | `false`   | Whether to show a divider between header and content                    |

## Events

| Event   | Type         | Description                      |
| ------- | ------------ | -------------------------------- |
| `close` | `() => void` | Emitted when the sheet is closed |

## Slots

| Slot      | Props                   | Description                     |
| --------- | ----------------------- | ------------------------------- |
| `default` | `{ close: () => void }` | The main content of the sheet   |
| `header`  | `{ close: () => void }` | The header content of the sheet |
| `footer`  | `{ close: () => void }` | The footer content of the sheet |

## Examples

### Left Position

```vue
<Sheet
  :open="isOpen"
  position="left"
  @close="isOpen = false"
>
  <template #header>
    <h2>Left Sheet</h2>
  </template>

  <p>Content</p>
</Sheet>
```

### Custom Size

```vue
<Sheet
  :open="isOpen"
  size="500px"
  @close="isOpen = false"
>
  <template #header>
    <h2>Wide Sheet</h2>
  </template>

  <p>Content</p>
</Sheet>
```

### With Separator

```vue
<Sheet
  :open="isOpen"
  separator
  @close="isOpen = false"
>
  <template #header>
    <h2>Sheet with Separator</h2>
  </template>

  <p>Content</p>
</Sheet>
```

### Top Position

```vue
<Sheet
  :open="isOpen"
  position="top"
  size="300px"
  @close="isOpen = false"
>
  <template #header>
    <h2>Top Sheet</h2>
  </template>

  <p>Content</p>
</Sheet>
```
