# Breadcrumbs

A navigation component that shows the current page's location within a navigational hierarchy. It consists of two components: `Breadcrumbs` and `BreadcrumbItem`.

::breadcrumbs-example

### Props

#### Breadcrumbs

| Name        | Default            | Type     | Description                                                                 |
| ----------- | ------------------ | -------- | --------------------------------------------------------------------------- |
| `separator` | `'ph:caret-right'` | `string` | Icon name from Iconify or text to use as separator between breadcrumb items |

#### BreadcrumbItem

| Name    | Default | Type     | Description                                 |
| ------- | ------- | -------- | ------------------------------------------- |
| `label` | —       | `string` | Text to display in the breadcrumb item      |
| `href`  | —       | `string` | URL to navigate to when the item is clicked |

### Slots

#### Breadcrumbs

| Name      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `default` | Content slot for `BreadcrumbItem` components. Must contain `BreadcrumbItem` |

#### BreadcrumbItem

| Name      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `default` | Custom content for the breadcrumb item. Falls back to `label` prop if empty |

### Custom Separator Example

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
</script>

<template>
  <Breadcrumbs separator="/">
    <BreadcrumbItem label="Home" href="/" />
    <BreadcrumbItem label="Products" href="/products" />
    <BreadcrumbItem label="Electronics" />
  </Breadcrumbs>
</template>
```

### Custom Content Example

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem href="/">
      <template #default>
        <span class="flex items-center">
          <Icon icon="mdi:home" class="mr-xs" />
          Home
        </span>
      </template>
    </BreadcrumbItem>
    <BreadcrumbItem href="/products">
      <template #default>
        <span class="flex items-center">
          <Icon icon="mdi:package" class="mr-xs" />
          Products
        </span>
      </template>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <template #default>
        <span class="flex items-center">
          <Icon icon="mdi:laptop" class="mr-xs" />
          Electronics
        </span>
      </template>
    </BreadcrumbItem>
  </Breadcrumbs>
</template>
```
