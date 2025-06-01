<script setup lang="ts">
import { Badge, Button, Card, CopyClipboard, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <CopyClipboard
          text="Hello world!"
          confirm
          confirm-placement="bottom-end"
          :confirm-time="3500"
        >
          <Button>
            Click me
          </Button>
          <template #confirm>
            <Card separators>
              <template #header>
                <Badge variant="accent">
                  Copied
                </Badge>
              </template>
              <p class="m-0">
                Lorem ipsum dolor sit amet.
              </p>
            </Card>
          </template>
        </CopyClipboard>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
