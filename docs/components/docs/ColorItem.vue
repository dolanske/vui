<script setup lang="ts">
import { Badge, Button, CopyClipboard, Flex } from '@dolanske/vui'
import { removeColorPrefix } from '~/utils/format'

interface Props {
  name: string
  token: string
  rgb: string | null
  hex: string | null
}

const props = defineProps<Props>()

const parsedToken = computed(() => {
  // console.log(props.token, removeColorPrefix(props.token))
  return removeColorPrefix(props.token)
})
</script>

<template>
  <div class="list-item">
    <div class="cube" :style="{ 'background-color': `${props.hex}` }" />

    <div class="flex-1">
      <strong class="list-item-name">{{ props.name }}</strong>

      <Flex gap="xl">
        <span v-if="props.rgb" class="list-item-value">{{ props.rgb }}</span>
        <span v-if="props.hex" class="list-item-value">{{ props.hex }}</span>
      </Flex>
    </div>

    <CopyClipboard :text="parsedToken" confirm="Copied!">
      <Button plain expand>
        <template #start>
          <Badge>
            {{ parsedToken }}
          </Badge>
        </template>

        <template #end>
          <Icon name="ph:copy" size="18" />
        </template>
      </Button>
    </CopyClipboard>
  </div>
</template>

<style scoped>
.cube {
  display: block;
  width: 96px;
  height: 40px;
}
</style>
