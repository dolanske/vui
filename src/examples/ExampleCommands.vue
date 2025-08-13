<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { Command } from '../components/Commands/Commands.vue'
import { IconCommand, IconFile, IconGear, IconPlus, IconSun } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Commands from '../components/Commands/Commands.vue'

const open = ref(true)

const commands: Command[] = [
  {
    title: 'Test brop',
    shortcut: 'Shift+K',
    icon: IconCommand(),
    handler: () => {
      console.log('lol')
    },
  },
  {
    title: 'We testing it up',
    href: '/',
    icon: IconCommand(),
  },
  {
    title: 'Among us',
    href: '/',
    icon: IconCommand(),
  },
  {
    title: 'Create New Project',
    description: 'Start a new project from scratch',
    group: 'File Operations',
    handler: () => {
      console.log('Creating new project...')
    },
    icon: IconPlus(),
  },
  {
    title: 'Open Settings',
    description: 'Access application settings and preferences',
    group: 'Navigation',
    href: '/settings',
    icon: IconGear(),
  },
  {
    title: 'Search Files',
    description: 'Find files across your entire project',
    group: 'Navigation',
    handler: () => {
      console.log('Opening file search...')
    },
    icon: IconFile(),
  },
  {
    title: 'Toggle Dark Mode',
    description: 'Switch between light and dark themes',
    group: 'Appearance',
    handler: () => {
      console.log('Toggling dark mode...')
    },
    icon: IconSun(),
  },
  {
    title: 'Export Data',
    description: 'Export your data in various formats',
    group: 'File Operations',
    handler: () => {
      console.log('Exporting data...')
    },
    icon: IconFile(),
  },
  {
    title: 'View Documentation',
    description: 'Browse the complete documentation',
    group: 'File Operations',
    href: '/docs',
    icon: IconFile(),
  },
  {
    title: 'Run Tests',
    description: 'Execute the test suite for your project',
    group: 'File Operations',
    handler: () => {
      console.log('Running tests...')
    },
    icon: IconCommand(),
  },
  {
    title: 'Show Keyboard Shortcuts',
    description: 'Display all available keyboard shortcuts',
    group: 'Help',
    handler: () => {
      console.log('Showing keyboard shortcuts...')
    },
    icon: IconCommand(),
    shortcut: 'Ctrl+/',
  },
  {
    title: 'Switch Workspace',
    description: 'Change to a different workspace',
    group: 'Navigation',
    handler: () => {
      console.log('Switching workspace...')
    },
    icon: IconCommand(),
  },
  {
    title: 'Duplicate File',
    description: 'Create a copy of the current file',
    group: 'File Operations',
    handler: () => {
      console.log('Duplicating file...')
    },
    icon: IconFile(),
  },
  {
    title: 'Check for Updates',
    description: 'Check if a new version is available',
    group: 'Help',
    handler: () => {
      console.log('Checking for updates...')
    },
    icon: IconGear(),
  },
]
</script>

<template>
  <Commands :open :commands @close="open = false" />
</template>
