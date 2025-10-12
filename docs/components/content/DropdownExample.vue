<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle, Flex } from '@dolanske/vui'
import { Icon } from '@iconify/vue'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Dropdown>
          <template #trigger="{ open }">
            <Button variant="fill" @click="open">
              Menu
            </Button>
          </template>
          <DropdownTitle>
            Actions
            <div class="counter">
              3
            </div>
          </DropdownTitle>

          <DropdownItem>
            New user
            <template #hint>
              <Icon icon="ph:command" />
              + C
            </template>
          </DropdownItem>
          <DropdownItem icon-end="ph:caret-right">
            Update
          </DropdownItem>
          <DropdownItem disabled icon="ph:x">
            Delete
          </DropdownItem>
        </Dropdown>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
