<script setup lang="ts">
import type { Props } from './Popout.vue'
import { ref, useAttrs, useId, useTemplateRef } from 'vue'
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

  if (relatedTarget && popout.value?.el?.contains(relatedTarget))
    return

  visible.value = false
}

function setVisibility(visibleState: boolean) {
  if (disabled)
    return

  visible.value = visibleState
}
</script>

<template>
  <div
    ref="anchorRef"
    class="popout-hover-anchor"
    tabindex="0"
    aria-haspopup="true"
    :aria-expanded="visible"
    :aria-controls="popoutId"
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
    @focusin="setVisibility(true)"
    @focusout="handleFocusOut"
  >
    <slot name="trigger" />
  </div>
  <Popout
    :id="popoutId"
    ref="popoutRef"
    v-bind="{ ...attrs, ...remainingProps }"
    :anchor
    :visible
    :enter-delay
    :leave-delay
    @mouseenter="setVisibility(true)"
    @mouseleave="setVisibility(false)"
  >
    <slot />
  </Popout>
</template>

<style scoped>
.popout-hover-anchor {
  width: fit-content;
}
</style>
