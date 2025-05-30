# Breadcrumbs

A navigation component that shows the current page's location within a navigational hierarchy. It consists of two components: `Breadcrumbs` and `BreadcrumbItem`.

::breadcrumbs-example

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem label="Home" href="#" />
    <BreadcrumbItem label="Products" href="#" />
    <BreadcrumbItem label="Electronics" />
  </Breadcrumbs>
</template>
```

::

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

### Examples

#### Custom Separator

::breadcrumbs-custom-separator-example

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
</script>

<template>
  <Breadcrumbs separator="///">
    <BreadcrumbItem label="Home" href="#" />
    <BreadcrumbItem label="Products" href="#" />
    <BreadcrumbItem label="Electronics" />
  </Breadcrumbs>
</template>
```

::

#### Custom Content

::breadcrumbs-custom-content-example

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem href="#">
      <Flex y-center>
        <Icon icon="mdi:home" />
        Home
      </Flex>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">
      <Flex y-center>
        <Icon icon="mdi:package" />
        Products
      </Flex>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <Flex y-center>
        <Icon icon="mdi:laptop" />
        Electronics
      </Flex>
    </BreadcrumbItem>
  </Breadcrumbs>
</template>
```

::
