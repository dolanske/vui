<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { searchString } from '../../shared/helpers'
import Flex from '../Flex/Flex.vue'
import Input from '../Input/Input.vue'
import Kbd from '../Kbd/Kbd.vue'
import Modal from '../Modal/Modal.vue'

export interface Command {
  title: string
  description?: string
  group?: string
  icon?: string
  shortcut?: string
  href?: string
  handler?: () => void
}

interface Props {
  open: boolean
  search?: string
  placeholder?: string
  commands: Command[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Write a command..',
})

const searchValue = ref(props.search)

const results = computed(() => {
  // TODO
  return props.commands.filter(item => searchString(
    [item.title, item.description, item.group, item.href],
    searchValue.value,
  ))
})
</script>

<template>
  <Modal :open="props.open" hide-close-button :card="{ separators: true }">
    <template #header>
      <div class="py-xs">
        <Input
          v-model="searchValue"
          focus
          expand
          :placeholder="props.placeholder"
        >
          <template #end>
            <IconX />
          </template>
        </Input>
      </div>
    </template>
    <template #footer>
      <Flex gap="xs">
        <span class="text-color-lighter">Move</span>
        <Kbd>
          <Icon icon="ph:arrow-up" />
        </Kbd>
        <Kbd>
          <Icon icon="ph:arrow-down" />
        </Kbd>
      </Flex>
    </template>
    <ul>
      <li v-for="result in results" :key="result.title">
        <button>
          {{ result.title }}
        </button>
      </li>
      <!-- <pre>{{ searchValue }}</pre> -->
    </ul>
  </Modal>
</template>
