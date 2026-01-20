<script setup>
import { Button, ButtonGroup, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center wrap>
        <ButtonGroup>
          <Button outline>
            Hello
          </Button>
          <Button outline>
            <Icon name="ph:caret-down" />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button square active>
            <Icon name="ph:text-b-bold" />
          </Button>
          <Button square>
            <Icon name="ph:text-bold" />
          </Button>
          <Button square>
            <Icon name="ph:text-italic" />
          </Button>
          <Button square>
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
