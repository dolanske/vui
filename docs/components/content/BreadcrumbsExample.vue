<script setup>
import { BreadcrumbItem, Breadcrumbs } from '@dolanske/vui'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Breadcrumbs>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Electronics" />
      </Breadcrumbs>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Separator
      </h3>
      <Breadcrumbs separator="/">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Electronics" />
      </Breadcrumbs>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Icons
      </h3>
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
    </div>
  </div>
</template>
