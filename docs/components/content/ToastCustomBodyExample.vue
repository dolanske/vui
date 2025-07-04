<script setup>
import { Button, Flex, pushToast } from '@dolanske/vui'
import { defineComponent, markRaw } from 'vue'

const CustomBody = markRaw(defineComponent({
  props: {
    data: Object,
    toastId: Number,
  },
  render() {
    return h('div', { class: 'custom-toast-body' }, [
      h('p', `Custom content for toast id: ${this.toastId}`),
      h('pre', JSON.stringify(this.data, null, 2)),
    ])
  },
}))

function showCustomToast() {
  pushToast('Custom Toast', {
    body: CustomBody,
    bodyProps: {
      data: { customData: 'This is a custom data prop' },
    },
  })
}
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" x-center>
        <Button @click="showCustomToast">
          Show Custom Toast
        </Button>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
