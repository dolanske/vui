<script setup lang="ts">
import { Badge, Button, CopyClipboard, Flex } from '@dolanske/vui'

interface Props {
  token:string
  name: string
  cssVariable: string
  hex: string
  rgb: string
}

const props = defineProps<Props>()

</script>

<template>
  <div class="list-item">
    <div class="flex-1">
      <strong class="list-item-name" :style="{color: props.hex}">{{ props.name }}</strong>

      <Flex gap="xl">
        <span class="list-item-value">{{ props.hex }}</span>
        <span class="list-item-value">{{ props.rgb }}</span>
      </Flex>
    </div>

    <CopyClipboard :text="props.token" confirm="Copied!">
      <Button plain expand>
        <template #start>
          <Badge>
            .{{ props.token }}
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
.list-item {
  display: flex;
  justify-content: space-between;
}
</style>
