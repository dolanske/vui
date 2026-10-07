# Breadcrumbs

A navigation component that shows the current page's location within a navigational hierarchy. It consists of two components: `Breadcrumbs` and `BreadcrumbItem`.

Breadcrumbs render a `<nav>` landmark containing an ordered list. Separators are hidden from screen readers and the last item is marked with `aria-current="page"`.

::breadcrumbs-example{sourcePath="Breadcrumbs/Breadcrumbs.vue"}

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem label="Home" href="/" />
    <BreadcrumbItem label="Products" href="/products" />
    <BreadcrumbItem label="Electronics" />
  </Breadcrumbs>
</template>
```

::

### Props

#### Breadcrumbs

| Name        | Default      | Type                                                                                                           |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `separator` | —            | `string` <br> Custom separator text/symbol between breadcrumb items. If omitted, a default caret icon is shown |
| `label`     | `Breadcrumb` | `string` <br> Accessible name of the navigation landmark                                                       |

#### BreadcrumbItem

| Name      | Default | Type                                                                                                            |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `label`   | —       | `string` <br> Text to display in the breadcrumb item                                                            |
| `href`    | —       | `string` <br> URL to navigate to when the item is clicked                                                       |
| `as`      | —       | `string` `Component` <br> Element or component to render, e.g. `RouterLink` or `NuxtLink` with a `to` attribute |
| `current` | —       | `boolean` <br> Marks the item as the current page. Defaults to `true` for the last item                         |

An item with an `@click` listener and no `href` renders as a button.

### Slots

#### Breadcrumbs

| Name        | Accepts          | Description                                                    |
| ----------- | ---------------- | -------------------------------------------------------------- |
| `default`   | `BreadcrumbItem` | Breadcrumb items, directly or nested in other elements         |
| `separator` | `any`            | Custom separator content, used instead of the `separator` prop |

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
    <BreadcrumbItem label="Home" href="/" />
    <BreadcrumbItem label="Products" href="/products" />
    <BreadcrumbItem label="Electronics" />
  </Breadcrumbs>
</template>
```

::

#### Custom Content

::breadcrumbs-custom-content-example

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs, Flex } from '@dolanske/vui'
import { IconHouse, IconLaptop, IconPackage } from '@iconify-prerendered/vue-ph'
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem href="/">
      <Flex y-center>
        <IconHouse />
        Home
      </Flex>
    </BreadcrumbItem>
    <BreadcrumbItem href="/products">
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

#### Router links

```vue
<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
import { RouterLink } from 'vue-router'
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbItem :as="RouterLink" to="/" label="Home" />
    <BreadcrumbItem label="Settings" />
  </Breadcrumbs>
</template>
```
