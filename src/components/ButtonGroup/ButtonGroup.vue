<script setup lang='ts'>
import Flex from '../Flex/Flex.vue'
import './button-group.scss'

interface Props {
  vertical?: boolean
}

const {
  vertical,
} = defineProps<Props>()
</script>

<template>
  <Flex
    :row="!vertical"
    :column="vertical"
    class="vui-button-group"
    :class="{ vertical }"
    :gap="0"
    inline
  >
    <slot />
  </Flex>
</template>
