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

| Name        | Default            | Type                                                                                      |
| ----------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `separator` | `'ph:caret-right'` | `string` <br> Icon name from Iconify or text to use as separator between breadcrumb items |

#### BreadcrumbItem

| Name    | Default | Type                                                      |
| ------- | ------- | --------------------------------------------------------- |
| `label` | —       | `string` <br> Text to display in the breadcrumb item      |
| `href`  | —       | `string` <br> URL to navigate to when the item is clicked |

### Slots

#### Breadcrumbs

| Name      | Accepts          | Description                   |
| --------- | ---------------- | ----------------------------- |
| `default` | `BreadcrumbItem` | Accepts only breadcrumb items |

#### BreadcrumbItem

| Name      | Accepts | Description                                                                 |
| --------- | ------- | --------------------------------------------------------------------------- |
| `default` | `any`   | Custom content for the breadcrumb item. Falls back to `label` prop if empty |

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
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem href="#">
      <Flex y-center>
        <IconHome />
        Home
      </Flex>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">
      <Flex y-center>
        <IconPackage />
        Products
      </Flex>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <Flex y-center>
        <IconLaptop />
        Electronics
      </Flex>
    </BreadcrumbItem>
  </Breadcrumbs>
</template>
```

::
