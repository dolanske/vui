<script setup lang="ts">
import type { Props } from './Popout.vue'
import { computed, ref, useAttrs, useId, useTemplateRef, watch } from 'vue'
import Popout from './Popout.vue'

type PopoutHoverProps = Omit<Props, 'anchor' | 'visible'> & {
  /**
   * If set to true, Popout will not be rendered on hover. Trigger stays
   */
  disabled?: boolean
}

defineOptions({ inheritAttrs: false })

const {
  enterDelay = 200,
  leaveDelay = 200,
  disabled,
  ...remainingProps
} = defineProps<PopoutHoverProps>()

const attrs = useAttrs()
const anchor = useTemplateRef('anchorRef')
const popout = useTemplateRef<InstanceType<typeof Popout>>('popoutRef')

const popoutId = useId()
const visible = ref(false)

function handleFocusOut(event: FocusEvent) {
  const relatedTarget = event.relatedTarget as Node | null

  if (relatedTarget && popout.value?.el()?.contains(relatedTarget))
    return

  visible.value = false
}

function setVisibility(visibleState: boolean) {
  if (disabled)
    return

  visible.value = visibleState
}

// Use the first child element as the actual anchor for Popout positioning so that
// the wrapper's display type does not affect offset calculations.
const anchorElement = computed(() =>
  (anchor.value?.firstElementChild as HTMLElement | null) ?? anchor.value,
)

// Whenever anchor changes, we need to make sure to make it focusable in case it
// isn't a button/clickable element. This improves accessibility for keyboard users
watch(anchor, () => {
  if (!anchor.value)
    return

  anchor.value.firstElementChild?.setAttribute('tabindex', '0')
}, {
  flush: 'post',
  immediate: true,
})
</script>

<template>
  <span
    ref="anchorRef"
    class="popout-hover-anchor"
    tabindex="-1"
    aria-haspopup="true"
    :aria-expanded="visible"
    :aria-controls="popoutId"
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
    @focusin="setVisibility(true)"
    @focusout="handleFocusOut"
  >
    <slot name="trigger" />
  </span>
  <Popout
    :id="popoutId"
    ref="popoutRef"
    v-bind="{ ...attrs, ...remainingProps }"
    :anchor="anchorElement"
    :visible
    :enter-delay
    :leave-delay
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
    @focusout="setVisibility(false)"
  >
    <slot />
  </Popout>
</template>
