<script setup lang="ts">
import { Button, Card, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center column gap="m" class="w-100">
        <Card separators class="w-100">
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

        <Card header-align="center" class="w-100" separators>
          <template #header>
            <strong class="text-bold text-xl mb-s block">Centered Header</strong>
            <p>Use <code>header-align</code> to vertically align header content. This is useful when you the header contains more than just the card title.</p>
          </template>
          <template #header-end>
            <Button plain size="s" square>
              <Icon name="ph:x" />
            </Button>
          </template>
          <p class="m-0">
            Hello I'm a description and completely unrelated to this example.
          </p>
        </Card>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
