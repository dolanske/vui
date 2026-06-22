<script setup lang="ts">
import Card from '../../../src/components/Card/Card.vue'
import EmojiPicker from '../../../src/components/EmojiPicker/EmojiPicker.vue'
</script>

<template>
  <DocsExample>
    <template #component>
      <Card :padding="false" inline>
        <EmojiPicker />
      </Card>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
