<script setup>
import { DropdownItem, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Flex x-center column gap="0">
          <DropdownItem>
            Create
            <template #icon-end>
              <Icon name="ph:plus" />
            </template>
          </DropdownItem>
          <DropdownItem>
            <template #icon>
              <Icon name="ph:user" />
            </template>
            Update
            <template #hint>
              <Icon name="ph:command" />
              + U
            </template>
          </DropdownItem>
          <DropdownItem disabled>
            <template #icon-end>
              <Icon name="ph:trash" />
            </template>
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
