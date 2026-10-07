<script setup lang="ts">
import type { Sizes } from '../../lib/types.ts'
import type { FlexProps } from '../Flex/Flex.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useTopLevelSlots } from '../../lib/slots.ts'
import Flex from '../Flex/Flex.vue'
import Avatar from './Avatar.vue'
import './avatar-group.scss'

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
const flattened = useTopLevelSlots(slots)

// Random order of the avatars. Generated once after mount (never during SSR,
// which would cause a hydration mismatch) and only regenerated when the
// amount of avatars changes, so re-renders do not reshuffle.
const randomOrder = ref<number[] | null>(null)

function shuffle(length: number): number[] {
  const order = Array.from({ length }, (_, index) => index)
  // Fisher-Yates, unlike sort(() => Math.random() - 0.5) it is unbiased
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

onMounted(() => {
  watch(() => flattened.value.length, (length) => {
    randomOrder.value = randomized ? shuffle(length) : null
  }, { immediate: true })
})

const formatted = computed(() => {
  if (!limit || flattened.value.length <= limit) {
    return {
      slots: flattened.value,
      remaining: 0,
    }
  }

  const order = randomOrder.value
  const slotsToShow = randomized && order && order.length === flattened.value.length
    ? order.slice(0, limit).map(index => flattened.value[index])
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
      <Avatar v-if="formatted.remaining" :size="limitSize" role="img" :aria-label="`${formatted.remaining} more`">
        {{ formatted.remaining > 99 ? '99+' : `+${formatted.remaining}` }}
      </Avatar>
    </slot>
  </Flex>
</template>
