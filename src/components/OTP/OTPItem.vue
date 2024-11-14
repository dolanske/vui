<script setup lang='ts'>
import type { Ref } from 'vue'
import { inject } from 'vue'

interface Props {
  i: number
}

const props = defineProps<Props>()

const value = inject('otp-value') as Ref<string>
</script>

<template>
  <div
    class="vui-otp-item" :class="{
      'active': props.i === value.length - 1,
      'has-value': !!value.at(props.i),
    }"
  >
    {{ value.at(props.i) }}
  </div>
</template>
