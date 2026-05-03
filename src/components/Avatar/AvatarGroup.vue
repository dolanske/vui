<script setup lang="ts">
import type { Sizes } from '../../shared/types'
import type { FlexProps } from '../Flex/Flex.vue'
import { computed } from 'vue'
import { useTopLevelSlots } from '../../shared/slots'
import Flex from '../Flex/Flex.vue'
import Avatar from './Avatar.vue'

// TODO: docs & example & release

type ClusterProps
  = | {
    /**
     * Groups the avatars closer together and adds a border to each avatar.
     */
    cluster: true
    gap?: never
  }
  | {
    cluster?: false
    gap?: FlexProps['gap']
  }

type LimitProps
  = | {
    /**
     * Limits the number of visible avatars and shows a counter with the remaining amount. Set to 0 to show all.
     */
    limit: number
    /**
     * Should match the size prop of the Avatar components. This is used to add size to the limit counter.
     */
    limitSize: Sizes | number
    /**
     * Picks users randomly instead of the first ones.
     */
    randomized?: boolean
  }
  | {
    limit?: undefined
    limitSize?: never
    randomized?: never
  }

type Props = Omit<FlexProps, 'gap'> & ClusterProps & LimitProps

const {
  limit,
  limitSize,
  randomized,
  cluster,
  ...flexProps
} = defineProps<Props>()

const slots = defineSlots()
const flattened = useTopLevelSlots(slots.default)

const formatted = computed(() => {
  if (!limit || flattened.value.length <= limit) {
    return {
      slots: flattened.value,
      remaining: 0,
    }
  }

  const slotsToShow = randomized
    ? [...flattened.value].sort(() => 0.5 - Math.random()).slice(0, limit)
    : flattened.value.slice(0, limit)

  return {
    slots: slotsToShow,
    remaining: flattened.value.length - limit,
  }
})
</script>

<template>
  <Flex v-bind="flexProps" class="vui-avatar-group" :class="{ cluster, column: !!flexProps?.column }">
    <Component
      :is="slot"
      v-for="slot in formatted.slots"
      :key="slot.key"
    />
    <slot name="remaining" :remaining="formatted.remaining">
      <Avatar v-if="formatted.remaining" :size="limitSize">
        {{ formatted.remaining > 99 ? '99+' : `+${formatted.remaining}` }}
      </Avatar>
    </slot>
  </Flex>
</template>

<style>
.vui-avatar-group {
  &.cluster {
    gap: 0 !important;

    &.column > *:not(:first-child) {
      margin-top: -8px;
      margin-left: 0;
    }

    & > * {
      z-index: 1;

      &:not(:first-child) {
        margin-left: -8px;
      }

      &:hover {
        z-index: 2;
      }

      &:is(.vui-avatar),
      .vui-avatar {
        border: 3px solid var(--color-bg) !important;
      }
    }
  }
}
</style>
