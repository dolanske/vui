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
    title: 'Toggle Dark Mode',
    description: 'Switch between light and dark themes',
    group: 'Appearance',
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
        >
          <template #icon="{ command }">
            <span style="font-size: 1.2em;">
              {{ command.group === 'File' ? '📄' : command.group === 'Navigation' ? '🧭' : '🎨' }}
            </span>
          </template>

          <template #command="{ command }">
            <button style="display: flex; align-items: center; gap: var(--space-s); width: 100%; padding: var(--space-xs) var(--space-xxs); border-radius: 0;">
              <span style="font-size: 1.1em;">
                {{ command.group === 'File' ? '📄' : command.group === 'Navigation' ? '🧭' : '🎨' }}
              </span>
              <span style="flex: 1; text-align: left;">
                <strong>{{ command.title }}</strong>
                <p v-if="command.description" style="margin: 0; font-size: var(--font-size-xs); opacity: 0.6;">
                  {{ command.description }}
                </p>
              </span>
              <span v-if="command.group" style="font-size: var(--font-size-xs); opacity: 0.4; font-style: italic;">
                {{ command.group }}
              </span>
            </button>
          </template>
        </Commands>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
