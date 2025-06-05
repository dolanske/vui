<script setup>
import { Flex, Kbd, KbdGroup } from '@dolanske/vui'
import { useEventListener } from '@vueuse/core'

const isActive = ref(false)

useEventListener(document, 'keyup', () => {
  isActive.value = false
})
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex column y-center>
        <Flex x-center gap="xs">
          <KbdGroup @trigger="isActive = true">
            <Kbd keys="Shift" highlight />
            <Kbd keys="S" highlight />
          </KbdGroup>
        </Flex>
        <p :style="{ color: isActive ? 'var(--color-text-green)' : 'var(--color-text)' }">
          {{ isActive ? 'Yay!!!!' : 'Press both keys.' }}
        </p>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
p {
  margin: 0;
}
</style>
