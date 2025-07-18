<script setup lang='ts'>
import type { InputProps } from './Input.vue'
import { IconEye, IconEyeSlash } from '@iconify-prerendered/vue-ph'

import { ref } from 'vue'
import Button from '../Button/Button.vue'
import Input from './Input.vue'

type Props = Omit<InputProps, 'type'> & {
  showPassword?: boolean
}

const {
  showPassword = false,
  // @ts-expect-error Don't want to actually provide type as we handle that in
  // this component manually
  type,
  ...inputProps
} = defineProps<Props>()

const show = ref(showPassword)
</script>

<template>
  <Input v-bind="inputProps" :type="show ? 'text' : 'password'" autocomplete="off">
    <template #end>
      <Button
        square
        :aria-label="show ? 'Hide' : 'Reveal'"
        @click="show = !show"
      >
        <IconEyeSlash v-if="show" width="18" height="18" />
        <IconEye v-else width="18" height="18" />
      </Button>
    </template>
  </Input>
</template>
