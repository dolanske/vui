<script setup lang="ts">
import { Avatar, Badge, Flex, PopoutHover, pushToast } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex x-center y-center gap="l">
        <PopoutHover class="popout-hover-example">
          <template #trigger>
            <Badge variant="success" filled>
              Online
            </Badge>
          </template>
          <Flex y-start gap="m">
            <button class="pointer" @click="pushToast('boop :3')">
              <Avatar url="https://github.com/dolanske.png" />
            </button>
            <div>
              <span class="text-bold block mb-xxs">dolanske</span>
              <p class="text-color-light text-s block mb-xs">
                Frontend engineer. The guy who made all of this yayyy!
              </p>
              <p class="text-color-light text-s">
                Checkout my <a href="https://github.com/dolanske" target="_blank" rel="noopener noreferrer">Github</a>!
              </p>
            </div>
          </Flex>
        </PopoutHover>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style>
.popout-hover-example {
  padding: var(--space-m);
  max-width: 292px;
}

.pointer {
  cursor: pointer;
}
</style>
