<script setup lang="ts">
import { Button, Card } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Card header-align="center" class="w-100" separators>
        <template #header>
          <strong class="text-bold text-xl mb-s block">Centered Header</strong>
          <p>Use <code>header-align</code> to vertically align header content. This is useful when the header contains more than just the card title.</p>
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
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
