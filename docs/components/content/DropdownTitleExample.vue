<script setup>
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Dropdown>
        <template #trigger>
          <Button>
            Settings
          </Button>
        </template>

        <DropdownTitle>
          User Settings
          <template #end>
            <span class="text-sm text-gray-500">v1.0.0</span>
          </template>
        </DropdownTitle>

        <DropdownItem icon="ph:user">
          Profile
        </DropdownItem>
        <DropdownItem icon="ph:bell">
          Notifications
        </DropdownItem>
        <DropdownItem icon="ph:lock">
          Security
        </DropdownItem>
      </Dropdown>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
