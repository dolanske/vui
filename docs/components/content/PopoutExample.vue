<script setup lang="ts">
import { Button, Flex, Popout } from '@dolanske/vui'
import { ref } from 'vue'

const isVisible = ref(false)
const anchorRef = ref(null)
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center>
        <Button ref="anchorRef" @click="isVisible = !isVisible">
          Toggle Popout
        </Button>

        <Popout
          :anchor="anchorRef"
          :visible="isVisible"
          placement="bottom"
          class="p-l"
          style="max-width: 256px"
          @click-outside="isVisible = false"
        >
          <h3>Popout content</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem facere eligendi ex, alias itaque molestiae, vero animi, vitae vel fuga corporis aut consectetur temporibus ipsum placeat dolores perferendis. Deleniti, et!</p>
        </Popout>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
