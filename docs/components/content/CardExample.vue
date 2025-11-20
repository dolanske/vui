<script setup lang="ts">
import { Button, Card, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Card separators>
          <template #header>
            <strong class="text-bold text-xl">Separators</strong>
          </template>
          <template #header-end>
            <Button plain size="s" square>
              <Icon name="ph:x" />
            </Button>
          </template>
          <p class="m-0">
            This card has separators and a header-end slot. All the cool stuff.
          </p>
          <template #footer>
            <Flex x-end>
              <Button size="s" variant="gray" outline>
                Cancel
              </Button>
              <Button size="s" variant="fill">
                Save
              </Button>
            </Flex>
          </template>
        </Card>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
