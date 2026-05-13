<script setup lang="ts">
import { Card, ContextMenu, DropdownItem, DropdownTitle, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <ContextMenu>
          <Card separators style="max-width: 380px">
            <template #header>
              <h4 class="m-0">
                Right click anywhere
              </h4>
            </template>
            <p class="text-color-light">
              Right click anywhere on this card to open a context menu with a set of actions. You can close it by clicking outside or by pressing the Escape key.
            </p>
          </Card>
          <template #menu>
            <div class="p-xxs">
              <DropdownItem>
                <template #icon>
                  <Icon name="ph:user" />
                </template>
                New user
                <template #hint>
                  <Icon name="ph:command" />
                  + C
                </template>
              </DropdownItem>
              <DropdownItem>
                <template #icon>
                  <Icon name="ph:arrow-up-right" />
                </template>
                Update
              </DropdownItem>
              <DropdownItem>
                <template #icon>
                  <Icon name="ph:trash" />
                </template>
                Delete
              </DropdownItem>
            </div>
          </template>
        </ContextMenu>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
