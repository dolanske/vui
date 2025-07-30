<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { Command } from '../components/Commands/Commands.vue'
import Commands from '../components/Commands/Commands.vue'

const commands: Command[] = [
  {
    title: 'Test brop',
    description: 'Test command we are testing',
    group: 'Test group',
    handler: () => {
      console.log('Command used')
    },
  },
  {
    title: 'We testing it up',
    description: 'Test Amon we are testing',
    group: 'Other group',
    href: '/',
  },
  {
    title: 'Among us',
    description: 'Test amon amon we are testing',
    group: 'Other group',
    href: '/',
  },
  {
    title: 'Create New Project',
    description: 'Start a new project from scratch',
    group: 'File Operations',
    handler: () => {
      console.log('Creating new project...')
    },
  },
  {
    title: 'Open Settings',
    description: 'Access application settings and preferences',
    group: 'Navigation',
    href: '/settings',
  },
  {
    title: 'Search Files',
    description: 'Find files across your entire project',
    group: 'Search',
    handler: () => {
      console.log('Opening file search...')
    },
  },
  {
    title: 'Toggle Dark Mode',
    description: 'Switch between light and dark themes',
    group: 'Appearance',
    handler: () => {
      console.log('Toggling dark mode...')
    },
  },
  {
    title: 'Export Data',
    description: 'Export your data in various formats',
    group: 'File Operations',
    handler: () => {
      console.log('Exporting data...')
    },
  },
  {
    title: 'View Documentation',
    description: 'Browse the complete documentation',
    group: 'Help',
    href: '/docs',
  },
  {
    title: 'Run Tests',
    description: 'Execute the test suite for your project',
    group: 'Development',
    handler: () => {
      console.log('Running tests...')
    },
  },
]
</script>

<template>
  <Commands open :commands />
</template>
