<script lang="ts" setup>
import Commands, { type Command } from '../components/Commands/Commands.vue'

const commands: Command[] = [
  {
    title: 'Test brop',
    description: 'Test command we are testing',
    group: 'Test group',
    handler: () => {
      console.log("Command used")
    }
  },
  {
    title: 'We testing it up',
    description: 'Test Amon we are testing',
    group: 'Other group',
    href: '/'
  },
  {
    title: 'Among us',
    description: 'Test amon amon we are testing',
    group: 'Other group',
    href: '/'
  }
]
</script>

<template>
  <Commands open :commands />
</template>
