<script setup lang='ts'>
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'

const variants = ['default', 'danger', 'success', 'link', 'blue', 'accent'] as const
</script>

<template>
  <ul class="flex flex-col g-l">
    <li>
      <h4 class="mb-s">
        Base
      </h4>
      <Flex gap="xs">
        <Button v-for="btn in variants" :key="btn" :variant="btn">
          Button
        </Button>
      </Flex>
    </li>
    <li>
      <h4 class="mb-s">
        Active
      </h4>
      <Flex gap="xs">
        <Button v-for="btn in variants" :key="btn" :variant="btn" active>
          Button
        </Button>
      </Flex>
    </li>
    <li>
      <h4>
        Plain
      </h4>
      <p class="mb-l text-color-lighter">
        Buttons are plain by default, but their hover state is by varaiant
      </p>
      <Flex gap="xs">
        <Button v-for="btn in variants" :key="btn" :variant="btn" plain>
          Button
        </Button>
      </Flex>
    </li>
    <li>
      <h4 class="mb-s">
        Disabled
      </h4>
      <Flex gap="xs">
        <Button v-for="btn in variants" :key="btn" :variant="btn" disabled>
          Button
        </Button>
      </Flex>
    </li>
  </ul>
</template>
