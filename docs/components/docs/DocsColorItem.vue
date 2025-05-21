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
  // Remove dark / light prefix when copying
  return removeColorPrefix(props.token)
})
</script>

<template>
  <div class="docs-color-item">
    <div class="cube" :style="{ 'background-color': `${props.hex}` }" />

    <div class="flex-1">
      <strong class="color-name">{{ props.name }}</strong>

      <Flex>
        <span v-if="props.rgb" class="color-value">{{ props.rgb }}</span>
        <span v-if="props.hex" class="color-value">{{ props.hex }}</span>
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

.docs-color-item {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: var(--space-xl);
  align-items: center;
  margin-bottom: var(--space-l);
  padding-bottom: var(--space-l);
  border-bottom: 1px solid var(--color-border-weak);

  &:last-of-type {
    border-bottom: none;
  }

  .color-name {
    display: block;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-xs);
  }

  .color-value {
    color: var(--color-text-lighter);
    font-size: var(--font-size-s);
    width: 128px;

    &:only-child {
      width: 100%;
    }
  }
}
</style>
