<script setup lang="ts">
/**
 * TokenItem - A generic component for displaying design tokens
 *
 * This component can be used to display various types of design tokens:
 * - Text sizes (fontSize styling)
 * - Font weights (fontWeight styling)
 * - Colors (using the indicator slot for color cubes)
 * - Spacing, z-index, transitions, etc.
 *
 * Examples:
 * - Text size: <TokenItem name="Large" size="2rem" className="text-l" />
 * - Font weight: <TokenItem name="Bold" className="text-bold" :indicator-style="{ fontWeight: '700' }">
 *     <template #text>Bold text</template>
 *   </TokenItem>
 * - Color: <TokenItem name="Primary" className="color-primary">
 *     <template #indicator><div class="color-cube" :style="{ backgroundColor: '#007bff' }" /></template>
 *   </TokenItem>
 */
import { Badge, Button, CopyClipboard } from '@dolanske/vui'

interface Props {
  name: string
  size?: string
  className: string
  indicatorStyle?: Record<string, any>
  indicatorClassName?: string
  copyable?: boolean
}

const { copyable = true, ...props } = defineProps<Props>()

const computedStyle = computed(() => {
  const baseStyle = props.size ? { fontSize: props.size } : {}
  return { ...baseStyle, ...props.indicatorStyle }
})
</script>

<template>
  <div class="list-item">
    <div class="indicator-container">
      <slot name="indicator" :style="computedStyle" :class="props.indicatorClassName">
        <strong class="text-size-indicator" :class="props.indicatorClassName" :style="computedStyle">
          <slot name="text">Cute dog</slot>
        </strong>
      </slot>
    </div>

    <div class="flex-1">
      <strong class="list-item-name">{{ props.name }}</strong>
      <span v-if="props.size || $slots.value" class="list-item-value">
        <slot name="value">{{ props.size }}</slot>
      </span>
    </div>

    <slot name="actions">
      <CopyClipboard v-if="copyable" :text="props.className" confirm="Copied!">
        <Button plain expand>
          <template #start>
            <Badge>
              <slot name="badge-prefix">
                {{ `.` }}
              </slot>{{ props.className }}
            </Badge>
          </template>

          <template #end>
            <Icon name="ph:copy" size="18" />
          </template>
        </Button>
      </CopyClipboard>
    </slot>
  </div>
</template>

<style scoped lang="scss">
// .text-size-indicator {
//   width: 256px;
// }

.indicator-container {
  width: 256px;
}
</style>
