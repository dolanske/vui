<script setup lang='ts'>
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'

interface Props {
  buttonStart?: boolean
  buttonEnd?: boolean
  buttonPrev?: boolean
  buttonNext?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <Flex inline>
    <Button square icon="ph:arrow-left" />
  </Flex>
</template>
