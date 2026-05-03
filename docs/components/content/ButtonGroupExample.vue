<script setup>
import { Button, ButtonGroup, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center wrap>
        <ButtonGroup :gap="2">
          <Button size="s">
            Hello
          </Button>
          <Button size="s">
            <Icon name="ph:caret-down" />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button outline square active>
            <Icon name="ph:text-b-bold" />
          </Button>
          <Button outline square>
            <Icon name="ph:text-bold" />
          </Button>
          <Button outline square>
            <Icon name="ph:text-italic" />
          </Button>
          <Button outline square>
            <Icon name="ph:text-a-underline" />
          </Button>
        </ButtonGroup>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
