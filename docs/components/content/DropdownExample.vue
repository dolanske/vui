<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle, Flex } from '@dolanske/vui'
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
              <Icon name="ph:command" />
              + C
            </template>
          </DropdownItem>
          <DropdownItem>
            Update
            <template #icon-end>
              <Icon name="ph:arrow-up-right" />
            </template>
          </DropdownItem>
          <DropdownItem disabled>
            Delete
            <template #icon-end>
              <Icon name="ph:trash" />
            </template>
          </DropdownItem>
        </Dropdown>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
