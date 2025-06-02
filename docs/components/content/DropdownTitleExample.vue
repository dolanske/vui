<script setup>
import { DropdownTitle, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="container container-xs">
        <Flex x-center column gap="0">
          <DropdownTitle>
            Points
            <div class="counter">
              10
            </div>
          </DropdownTitle>
          <DropdownTitle class="w-100">
            Manage
            <template #end>
              <Icon name="ph:plus" />
            </template>
          </DropdownTitle>
        </Flex>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
