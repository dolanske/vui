<script setup lang="ts">
import { Button, Divider, Dropdown, DropdownItem, DropdownTitle, Flex, PopoutHover } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Dropdown>
          <template #trigger="{ open }">
            <Button variant="fill" @click="open">
              File
            </Button>
          </template>

          <DropdownTitle>File</DropdownTitle>

          <DropdownItem>
            New file
            <template #hint>
              <Icon name="ph:command" />
              + N
            </template>
          </DropdownItem>

          <PopoutHover placement="right-start">
            <template #trigger>
              <DropdownItem>
                <template #icon>
                  <Icon name="ph:clock-counter-clockwise" />
                </template>
                Open recent
                <template #iconEnd>
                  <Icon name="ph:caret-right" />
                </template>
              </DropdownItem>
            </template>
            <div class="vui-dropdown">
              <DropdownTitle>Recent</DropdownTitle>
              <DropdownItem>dashboard.vue</DropdownItem>
              <DropdownItem>settings.vue</DropdownItem>
              <DropdownItem>index.vue</DropdownItem>
              <Divider />
              <PopoutHover placement="right-start">
                <template #trigger>
                  <DropdownItem>
                    More files
                    <template #iconEnd>
                      <Icon name="ph:caret-right" />
                    </template>
                  </DropdownItem>
                </template>
                <div class="vui-dropdown">
                  <DropdownItem>profile.vue</DropdownItem>
                  <DropdownItem>auth.vue</DropdownItem>
                  <DropdownItem>404.vue</DropdownItem>
                </div>
              </PopoutHover>
            </div>
          </PopoutHover>

          <Divider />

          <DropdownItem>
            <template #icon>
              <Icon name="ph:trash" />
            </template>
            Move files
          </DropdownItem>
        </Dropdown>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
