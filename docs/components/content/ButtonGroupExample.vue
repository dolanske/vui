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
          <Button outline icon="ph:caret-down" />
        </ButtonGroup>

        <ButtonGroup>
          <Button square icon="ph:text-b-bold" active />
          <Button square icon="ph:text-bold" />
          <Button square icon="ph:text-italic" />
          <Button square icon="ph:text-a-underline" />
        </ButtonGroup>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
