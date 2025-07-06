<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Dropdown>
        <template #trigger>
          <Button>
            Open Menu
          </Button>
        </template>

        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
