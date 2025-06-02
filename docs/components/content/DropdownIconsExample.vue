<script setup>
import { Button, Dropdown, DropdownItem } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Dropdown>
        <template #trigger>
          <Button>
            Actions
          </Button>
        </template>

        <DropdownItem icon="ph:edit">
          Edit
          <template #hint>
            Ctrl + E
          </template>
        </DropdownItem>
        <DropdownItem icon="ph:trash">
          Delete
          <template #hint>
            Del
          </template>
        </DropdownItem>
      </Dropdown>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
