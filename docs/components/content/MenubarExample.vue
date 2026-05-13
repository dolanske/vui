<script setup lang="ts">
import { Button, Card, Divider, DropdownItem, Menubar, MenuItem } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Card centered>
        <Menubar gap="xs">
          <MenuItem>
            <Button plain size="s">
              File
            </Button>
            <template #menu>
              <div class="vui-dropdown">
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:file" />
                  </template>
                  New File
                  <template #hint>
                    <Icon name="ph:command" />N
                  </template>
                </DropdownItem>
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:folder-open" />
                  </template>
                  Open...
                  <template #hint>
                    <Icon name="ph:command" />O
                  </template>
                </DropdownItem>
                <DropdownItem size="s">
                  Save As
                  <template #hint>
                    <Icon name="ph:command" />S
                  </template>
                </DropdownItem>
                <Divider class="my-xxxs" />
                <DropdownItem size="s" disabled>
                  <template #icon>
                    <Icon name="ph:door-open" />
                  </template>
                  Exit
                </DropdownItem>
              </div>
            </template>
          </MenuItem>
          <MenuItem>
            <Button plain size="s">
              Edit
            </Button>
            <template #menu>
              <div class="vui-dropdown">
                <DropdownItem size="s">
                  Undo
                  <template #hint>
                    <Icon name="ph:command" />Z
                  </template>
                </DropdownItem>
                <DropdownItem size="s">
                  Redo
                  <template #hint>
                    <Icon name="ph:command" />Y
                  </template>
                </DropdownItem>
                <Divider class="my-xxxs" />
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:scissors" />
                  </template>
                  Cut
                </DropdownItem>
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:copy" />
                  </template>
                  Copy
                </DropdownItem>
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:clipboard" />
                  </template>
                  Paste
                </DropdownItem>
              </div>
            </template>
          </MenuItem>
          <MenuItem>
            <Button plain size="s">
              View
            </Button>
            <template #menu>
              <div class="vui-dropdown">
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:arrows-out" />
                  </template>
                  Full Screen
                </DropdownItem>
                <DropdownItem size="s">
                  Hide Sidebar
                </DropdownItem>
                <DropdownItem size="s">
                  Toggle Terminal
                </DropdownItem>
              </div>
            </template>
          </MenuItem>
          <MenuItem>
            <Button plain size="s">
              Help
            </Button>
            <template #menu>
              <div class="vui-dropdown">
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:book-open" />
                  </template>
                  Documentation
                </DropdownItem>
                <DropdownItem size="s">
                  <template #icon>
                    <Icon name="ph:github-logo" />
                  </template>
                  View on GitHub
                </DropdownItem>
                <Divider class="my-xxxs" />
                <DropdownItem size="s" disabled>
                  <template #icon>
                    <Icon name="ph:info" />
                  </template>
                  About
                </DropdownItem>
              </div>
            </template>
          </MenuItem>
        </Menubar>
      </Card>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
