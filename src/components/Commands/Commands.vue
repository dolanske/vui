<script lang="ts" setup>
import { IconArrowDown, IconArrowUp, IconKeyReturn, IconX } from '@iconify-prerendered/vue-ph'
import { computed, ref } from 'vue'
import { searchString } from '../../shared/helpers'
import Button from '../Button/Button.vue'
import Flex from '../Flex/Flex.vue'
import Input from '../Input/Input.vue'
import Kbd from '../Kbd/Kbd.vue'
import Modal from '../Modal/Modal.vue'
import './commands.scss'

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
  <Modal :open="props.open" hide-close-button :card="{ separators: true }" class="vui-commands">
    <template #header>
      <div class="py-xs">
        <Input
          v-model="searchValue"
          focus
          expand
          :placeholder="props.placeholder"
        >
          <template #end>
            <Button v-if="searchValue" plain square @click="searchValue = ''">
              <IconX />
            </Button>
          </template>
        </Input>
      </div>
    </template>
    <template #footer>
      <Flex gap="xs" y-center>
        <span class="text-color-lighter">Move</span>
        <Kbd>
          <IconArrowUp />
        </Kbd>
        <Kbd>
          <IconArrowDown />
        </Kbd>

        <span class="text-color-lighter">Select</span>
        <Kbd>
          <IconKeyReturn />
        </Kbd>
      </Flex>
    </template>
    <ul class="vui-commands-list" tabindex="-1">
      <li v-for="result in results" :key="result.title">
        <button>
          {{ result.title }}
        </button>
      </li>
      <!-- <pre>{{ searchValue }}</pre> -->
    </ul>
  </Modal>
</template>
