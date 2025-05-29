<script setup lang="ts">
import { Button, Dropdown, DropdownItem, DropdownTitle } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Basic dropdown -->
        <div>
          <h3 class="mb-sm">
            Basic Dropdown
          </h3>
          <Dropdown>
            <template #trigger>
              <Button>
                Open Menu
              </Button>
            </template>

            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </Dropdown>
        </div>

        <!-- Dropdown with icons and hints -->
        <div>
          <h3 class="mb-sm">
            Dropdown with Icons and Hints
          </h3>
          <Dropdown>
            <template #trigger>
              <Button>
                Actions
              </Button>
            </template>

            <DropdownItem icon="ph:edit">
              Edit
              <template #hint>
                Ctrl + E
              </template>
            </DropdownItem>
            <DropdownItem icon="ph:trash">
              Delete
              <template #hint>
                Del
              </template>
            </DropdownItem>
          </Dropdown>
        </div>

        <!-- Dropdown with title -->
        <div>
          <h3 class="mb-sm">
            Dropdown with Title
          </h3>
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
        </div>

        <!-- Expanded dropdown -->
        <div>
          <h3 class="mb-sm">
            Expanded Dropdown
          </h3>
          <Dropdown expand>
            <template #trigger>
              <Button class="w-[200px]">
                Select Option
              </Button>
            </template>

            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </Dropdown>
        </div>

        <!-- Custom placement -->
        <div>
          <h3 class="mb-sm">
            Custom Placement
          </h3>
          <Dropdown placement="right-start">
            <template #trigger>
              <Button>
                Open Menu
              </Button>
            </template>

            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
