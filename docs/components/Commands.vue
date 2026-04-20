<script setup lang="ts">
import { Button, Commands, Kbd, KbdGroup, Tooltip } from '@dolanske/vui'
import { useEventListener } from '@vueuse/core'

const props = defineProps<{
  large?: boolean
}>()

const open = ref(false)
const router = useRouter()

const commands = computed(() => {
  const createHandler = (path: string) => () => {
    router.push(path)
    open.value = false
  }

  const navigationCommands = [
    { title: 'Home', handler: createHandler('/'), group: 'Navigation', keywords: ['landing'] },
    { title: 'Installation', handler: createHandler('/docs'), group: 'Navigation', keywords: ['docs', 'documentation'] },
    { title: 'Projects', handler: createHandler('/docs/projects'), group: 'Navigation' },
    { title: 'Author', description: 'Who made this thing?', href: 'https://dolansky.dev/', group: 'Navigation' },
    { title: 'Components', handler: createHandler('/docs/components'), group: 'Navigation' },
    { title: 'Tokens', handler: createHandler('/docs/tokens'), group: 'Navigation' },
    { title: 'CSS Framework', handler: createHandler('/docs/framework'), group: 'Navigation' },
  ]

  const tokenCommands = tokenPages.map(({ label, path, keywords }) => ({ title: label, handler: createHandler(path), group: 'Tokens', keywords }))
  const frameworkCommands = frameworkPages.map(({ label, path, keywords }) => ({ title: label, handler: createHandler(path), group: 'Framework', keywords }))
  const componentCommands = componentList.map(({ name, path, keywords }) => ({ title: name, handler: createHandler(path), group: 'Components', keywords }))

  return [
    ...tokenCommands,
    ...frameworkCommands,
    ...componentCommands,
    ...navigationCommands,
  ]
})

useEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open.value = !open.value
  }
})

const isMac = import.meta.client && /Mac/i.test(navigator.platform)
</script>

<template>
  <Tooltip>
    <Button square outline :size="props.large ? 'l' : 'm'" @click="open = !open">
      <Icon name="ph:magnifying-glass" />
    </Button>
    <template #tooltip>
      <p>
        Search <KbdGroup>
          <Kbd :keys="isMac ? '⌘' : 'Ctrl'" class="mr-xxs" />
          <Kbd keys="K" />
        </KbdGroup>
      </p>
    </template>
  </Tooltip>
  <Commands :open :commands @close="open = false">
    <template #icon="{ command }">
      <Icon v-if="command.group === 'Tokens'" name="ph:brackets-curly" />
      <Icon v-else-if="command.group === 'Framework'" name="ph:file-css" />
      <Icon v-else-if="command.group === 'Components'" name="ph:rectangle-dashed" />
      <Icon v-else name="ph:compass" />
    </template>
  </Commands>
</template>
