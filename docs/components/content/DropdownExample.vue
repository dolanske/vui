<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Dropdown>
        <template #trigger="{ toggle }">
          <Button class="btn btn-primary" @click="toggle">
            Menu
          </Button>
        </template>

        <DropdownTitle>
          Actions
          <template #end>
            3
          </template>
        </DropdownTitle>

        <DropdownItem icon="ph:user">
          New user
          <template #hint>
            <Icon icon="ic:round-keyboard-command-key" />
            + C
          </template>
        </DropdownItem>
        <DropdownItem icon-end="ph:arrow-right">
          Update
        </DropdownItem>
        <DropdownItem>Cancel</DropdownItem>

        <DropdownTitle>Yourself</DropdownTitle>
        <DropdownItem icon="ph:x" disabled>
          Disabled option
        </DropdownItem>
        <DropdownItem icon="ph:x">
          Delete
        </DropdownItem>
      </Dropdown>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
