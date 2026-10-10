<script setup lang="ts">
import type { Component } from 'vue'
import type { SelectOption } from './components/Select/Select.vue'
import { useEventListener } from '@vueuse/core'
import { computed, defineAsyncComponent, ref, watch, watchEffect } from 'vue'
import Flex from './components/Flex/Flex.vue'
import Select from './components/Select/Select.vue'
import Switch from './components/Switch/Switch.vue'
import { setColorTheme } from './lib/theme.ts'

// `?theme=light` starts the playground in light mode
const isLight = ref(new URLSearchParams(window.location.search).get('theme') === 'light')
watchEffect(() => {
  setColorTheme(isLight.value ? 'light' : 'dark')
})

// Every file in ./examples is selectable. The choice is kept in the URL hash,
// so a reload or a shared link opens the same example.
const modules = import.meta.glob<{ default: Component }>('./examples/Example*.vue')

const examples = Object.keys(modules)
  .map(path => ({
    value: path,
    label: path.replace('./examples/Example', '').replace('.vue', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

const DEFAULT_EXAMPLE = './examples/ExampleThemeSample.vue'

function fromHash(): SelectOption {
  const name = decodeURIComponent(window.location.hash.slice(1))
  return examples.find(example => example.label.replaceAll(' ', '') === name)
    ?? examples.find(example => example.value === DEFAULT_EXAMPLE)
    ?? examples[0]
}

const selected = ref<SelectOption[]>([fromHash()])

watch(selected, (value) => {
  const label = value?.[0]?.label
  if (label)
    window.location.hash = label.replaceAll(' ', '')
})

useEventListener(window, 'hashchange', () => {
  const next = fromHash()
  if (next.value !== selected.value?.[0]?.value)
    selected.value = [next]
})

const components = new Map<string, Component>()
const activeComponent = computed(() => {
  const path = selected.value?.[0]?.value as string | undefined
  if (!path)
    return null
  if (!components.has(path))
    components.set(path, defineAsyncComponent(modules[path]))
  return components.get(path)!
})
</script>

<template>
  <main vaul-drawer-wrapper class="container-l py-xxxl">
    <Flex gap="l" y-center class="mb-xxl" wrap>
      <Select v-model="selected" :options="examples" search aria-label="Example" style="width: 240px" />
      <Switch v-model="isLight" label="Light theme" />
    </Flex>

    <component :is="activeComponent" v-if="activeComponent" :key="selected?.[0]?.value" />
  </main>
</template>
