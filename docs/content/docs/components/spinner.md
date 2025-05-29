# Spinner

The Spinner component is a loading indicator that shows an animated circular progress. It's commonly used to indicate that a process is ongoing or that content is being loaded.

::spinner-example

## Props

| Prop   | Type                | Default | Description             |
| ------ | ------------------- | ------- | ----------------------- |
| `size` | `'s' \| 'm' \| 'l'` | `'m'`   | The size of the spinner |

## Examples

### Different Sizes

```vue
<div class="flex gap-m items-center">
  <Spinner size="s" />
  <Spinner size="m" />
  <Spinner size="l" />
</div>
```

### In Button

```vue
<Button disabled>
  <Spinner size="s" class="mr-s" />
  Loading...
</Button>
```

### In Card

```vue
<div class="card p-m flex items-center justify-center">
  <Spinner size="l" />
</div>
```

### With Text

```vue
<div class="flex items-center gap-s">
  <Spinner />
  <span>Loading content...</span>
</div>
```

### Centered in Container

```vue
<div class="h-200px flex items-center justify-center">
  <Spinner size="l" />
</div>
```
