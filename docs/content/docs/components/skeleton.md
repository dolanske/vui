# Skeleton

The Skeleton component is a loading placeholder that can be used to indicate content is being loaded. It supports various shapes and sizes, making it versatile for different use cases.

::skeleton-example

## Props

| Prop     | Type               | Default                  | Description                           |
| -------- | ------------------ | ------------------------ | ------------------------------------- |
| `radius` | `string \| number` | `var(--border-radius-s)` | The border radius of the skeleton     |
| `width`  | `string \| number` | `'100%'`                 | The width of the skeleton             |
| `height` | `string \| number` | `'32px'`                 | The height of the skeleton            |
| `circle` | `boolean`          | `false`                  | Whether to make the skeleton circular |

## Examples

### Custom Size

```vue
<Skeleton
  width="200px"
  height="100px"
/>
```

### Custom Radius

```vue
<Skeleton
  radius="8px"
  width="200px"
  height="100px"
/>
```

### Circle

```vue
<Skeleton
  circle
  width="100px"
/>
```

### Multiple Skeletons

```vue
<div class="space-y-s">
  <Skeleton width="200px" height="24px" />
  <Skeleton width="150px" height="24px" />
  <Skeleton width="180px" height="24px" />
</div>
```

### Card Layout

```vue
<div class="card p-m">
  <Skeleton width="200px" height="24px" class="mb-s" />
  <Skeleton width="100%" height="100px" class="mb-s" />
  <Skeleton width="80px" height="32px" />
</div>
```
