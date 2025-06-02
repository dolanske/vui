<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Dropdown expand>
        <template #trigger>
          <Button class="w-[200px]">
            Select Option
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
