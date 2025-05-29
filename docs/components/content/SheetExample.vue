<script setup>
import { Button, Sheet } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(false)
const isLeftOpen = ref(false)
const isTopOpen = ref(false)
const isSeparatorOpen = ref(false)
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Button @click="isOpen = true">
        Open Sheet
      </Button>

      <Sheet
        :open="isOpen"
        @close="isOpen = false"
      >
        <template #header>
          <h2>Sheet Title</h2>
        </template>

        <p>Sheet content goes here</p>

        <template #footer>
          <Button @click="isOpen = false">
            Close
          </Button>
        </template>
      </Sheet>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Left Position
      </h3>
      <Button @click="isLeftOpen = true">
        Open Left Sheet
      </Button>

      <Sheet
        :open="isLeftOpen"
        position="left"
        @close="isLeftOpen = false"
      >
        <template #header>
          <h2>Left Sheet</h2>
        </template>

        <p>Content</p>
      </Sheet>
    </div>

    <div>
      <h3 class="text-m mb-s">
        Top Position
      </h3>
      <Button @click="isTopOpen = true">
        Open Top Sheet
      </Button>

      <Sheet
        :open="isTopOpen"
        position="top"
        size="300px"
        @close="isTopOpen = false"
      >
        <template #header>
          <h2>Top Sheet</h2>
        </template>

        <p>Content</p>
      </Sheet>
    </div>

    <div>
      <h3 class="text-m mb-s">
        With Separator
      </h3>
      <Button @click="isSeparatorOpen = true">
        Open Sheet with Separator
      </Button>

      <Sheet
        :open="isSeparatorOpen"
        separator
        @close="isSeparatorOpen = false"
      >
        <template #header>
          <h2>Sheet with Separator</h2>
        </template>

        <p>Content</p>
      </Sheet>
    </div>
  </div>
</template>
