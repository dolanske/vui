<script setup>
import { DropdownItem, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Flex x-center column gap="0">
          <DropdownItem icon-end="ph:plus">
            Create
          </DropdownItem>
          <DropdownItem icon="ph:user">
            Update
            <template #hint>
              <Icon name="ph:command" />
              + U
            </template>
          </DropdownItem>
          <DropdownItem disabled icon-end="ph:trash">
            Delete
          </DropdownItem>
        </Flex>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
