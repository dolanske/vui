<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import { TABS_KEY } from './tabs'
import './tabs.scss'

interface Props {
  variant?: 'default' | 'filled'
  expand?: boolean
  disabled?: boolean
  /**
   * By default, elements with transition already use a default fade transition. This can be replaced by a custom vue transition class name.
   *
   * Setting the value to `none` will not apply any transition. This is useful when using the View Transitions API to prevent conflicts between the default animation and the view transition.
   */
  transitionName?: string | 'none'
  /**
   * Id of the tab list. Setting it links every Tab with a matching TabPanel
   * (`<TabPanel :tabs="id" value="..." />`) via `aria-controls`.
   */
  id?: string
}

const {
  expand,
  disabled,
  variant = 'default',
  transitionName = 'fade',
  id,
} = defineProps<Props>()

const active = defineModel<string>()

// Bumped whenever tabs are added, removed or change value
const version = ref(0)

provide(TABS_KEY, {
  active,
  disabled: computed(() => !!disabled),
  linkedId: computed(() => id),
  select: (value: string) => {
    if (!disabled)
      active.value = value
  },
  register: () => {
    version.value++
    return () => version.value++
  },
  notify: () => version.value++,
})

// Underline calculation
const underlineRef = useTemplateRef('underline')
const tabsRef = useTemplateRef('tabs')

// Tabs belonging to this list, in DOM order. Nested tab lists are ignored.
function getTabElements(): HTMLElement[] {
  if (!tabsRef.value)
    return []

  return Array
    .from(tabsRef.value.querySelectorAll<HTMLElement>('.vui-tab'))
    .filter(el => el.closest('.vui-tabs') === tabsRef.value)
}

function computeUnderlinePosition() {
  if (!tabsRef.value || !underlineRef.value)
    return

  const activeBounds = getTabElements().find(el => el.classList.contains('active'))?.getBoundingClientRect()
  const parentBounds = tabsRef.value.getBoundingClientRect()

  if (!activeBounds) {
    underlineRef.value.style.width = '0px'
  }
  else {
    underlineRef.value.style.width = `${activeBounds.width}px`
    underlineRef.value.style.left = `${activeBounds.left - parentBounds.left}px`
  }
}

// If the active tab no longer exists (or none was selected), select the first
// enabled one
function ensureValidActive() {
  const tabs = getTabElements()
  if (tabs.length === 0)
    return

  const exists = tabs.some(el => el.dataset.value === active.value)
  if (!exists) {
    const firstEnabled = tabs.find(el => !el.classList.contains('disabled')) ?? tabs[0]
    active.value = firstEnabled.dataset.value
  }
}

onMounted(() => {
  useResizeObserver(tabsRef, computeUnderlinePosition)

  watch(
    [active, () => expand, version],
    async () => {
      // Tabs render their `active` class after this list, wait for them
      await nextTick()
      ensureValidActive()
      computeUnderlinePosition()
    },
    {
      immediate: true,
      flush: 'post',
    },
  )
})

// Keyboard navigation between tabs. Selection follows focus.
function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  // Modified arrows are left to consumers, e.g. ResizableView moves tabs with Alt
  if (!target.classList.contains('vui-tab') || event.altKey || event.ctrlKey || event.metaKey)
    return

  const tabs = getTabElements().filter(el => !el.classList.contains('disabled'))
  const index = tabs.indexOf(target)
  if (index === -1)
    return

  let next: HTMLElement | undefined
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      next = tabs[(index + 1) % tabs.length]
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      next = tabs[(index - 1 + tabs.length) % tabs.length]
      break
    case 'Home':
      next = tabs[0]
      break
    case 'End':
      next = tabs.at(-1)
      break
    default:
      return
  }

  event.preventDefault()
  if (next) {
    next.focus()
    if (next.dataset.value !== undefined && !disabled)
      active.value = next.dataset.value
  }
}

const hasActive = computed(() => active.value !== undefined && active.value !== null)
</script>

<template>
  <div
    :id
    ref="tabs"
    class="vui-tabs"
    role="tablist"
    :class="[
      { expand, disabled },
      variant === 'default'
        ? ''
        : `vui-tabs-variant-${variant}`,
    ]"
    @keydown="onKeydown"
  >
    <slot name="start" />
    <slot />
    <template v-if="$slots.end">
      <div v-if="!expand" class="flex-1" />
      <slot name="end" />
    </template>

    <Transition :name="transitionName === 'none' ? undefined : transitionName" :css="transitionName !== 'none'" appear>
      <div v-if="hasActive" ref="underline" class="vui-tab-underline" />
    </Transition>
  </div>
</template>
