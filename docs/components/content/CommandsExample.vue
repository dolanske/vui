<script setup lang="ts">
import { Button, Commands, Flex } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)

const commands = [
  {
    title: 'Create New Project',
    description: 'Start a new project from scratch',
    group: 'File',
    handler: () => {},
  },
  {
    title: 'Open Settings',
    description: 'Access application settings and preferences',
    group: 'Navigation',
    handler: () => {},
  },
  {
    title: 'Search Files',
    description: 'Find files across your entire project',
    group: 'Navigation',
    handler: () => {},
  },
  {
    title: 'Toggle Dark Mode',
    description: 'Switch between light and dark themes',
    group: 'Appearance',
    handler: () => {},
  },
  {
    title: 'Export Data',
    description: 'Export your data in various formats',
    group: 'File',
    handler: () => {},
  },
  {
    title: 'Show Shortcuts',
    description: 'Display all available keyboard shortcuts',
    group: 'Help',
    shortcut: 'Ctrl+/',
    handler: () => {},
  },
]
</script>

<template>
  <DocsExample full>
    <template #component>
      <Flex x-center y-center style="padding: var(--space-xl);">
        <Button @click="isOpen = true">
          Open Commands
        </Button>
        <Commands
          :open="isOpen"
          :commands="commands"
          @close="isOpen = false"
        />
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
