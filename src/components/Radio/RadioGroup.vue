<script setup lang='ts'>
import type { FlexProps } from '../Flex/Flex.vue'
import { computed, provide, useId } from 'vue'
import Flex from '../Flex/Flex.vue'
import { RADIO_GROUP_KEY } from './radio'

interface Props extends FlexProps {
  /**
   * Disables every radio inside the group
   */
  disabled?: boolean
  /**
   * Accessible group label, rendered as the fieldset legend
   */
  label?: string
  /**
   * Native `name` shared by all radios. Generated automatically if omitted.
   */
  name?: string
  required?: boolean
}

const {
  disabled,
  label,
  name,
  required,
  ...flexProps
} = defineProps<Props>()

const checked = defineModel<any>()
const fallbackName = useId()

provide(RADIO_GROUP_KEY, {
  model: checked,
  name: computed(() => name ?? fallbackName),
  disabled: computed(() => !!disabled),
  required: computed(() => !!required),
})

// Template note:
// A disabled fieldset natively disables every control inside of it
</script>

<template>
  <fieldset class="vui-radio-group" :disabled="disabled" :class="{ disabled }">
    <legend v-if="label" class="vui-label vui-radio-group-legend">
      {{ label }}
    </legend>
    <Flex v-bind="flexProps">
      <slot />
    </Flex>
  </fieldset>
</template>
