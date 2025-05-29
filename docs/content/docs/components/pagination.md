# Pagination

The Pagination component provides a user interface for navigating through paginated content. It supports page numbers, previous/next buttons, and first/last page navigation.

::pagination-example

## Props

| Prop         | Type         | Default  | Description                                             |
| ------------ | ------------ | -------- | ------------------------------------------------------- |
| `pagination` | `Pagination` | required | The pagination state object containing page information |
| `numbers`    | `boolean`    | `true`   | Whether to show page numbers                            |
| `prevNext`   | `boolean`    | `true`   | Whether to show previous/next buttons                   |
| `firstLast`  | `boolean`    | `true`   | Whether to show first/last page buttons                 |
| `variant`    | `Variants`   | `'gray'` | The variant of the buttons                              |

## Events

| Event    | Type                     | Description                      |
| -------- | ------------------------ | -------------------------------- |
| `change` | `(page: number) => void` | Emitted when the page is changed |

## Examples

### Without Page Numbers

```vue
<Pagination
  :pagination="pagination"
  :numbers="false"
  @change="handlePageChange"
/>
```

### Without First/Last Buttons

```vue
<Pagination
  :pagination="pagination"
  :first-last="false"
  @change="handlePageChange"
/>
```

### Custom Variant

```vue
<Pagination
  :pagination="pagination"
  variant="primary"
  @change="handlePageChange"
/>
```

### Custom Navigation

```vue
<Pagination
  :pagination="pagination"
  @change="handlePageChange"
>
  <template #prev="{ disabled, setPage }">
    <Button
      :disabled="disabled"
      @click="setPage"
    >
      Previous
    </Button>
  </template>

  <template #next="{ disabled, setPage }">
    <Button
      :disabled="disabled"
      @click="setPage"
    >
      Next
    </Button>
  </template>
</Pagination>
```
