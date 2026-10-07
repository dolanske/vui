<script setup lang='ts'>
import { IconCaretDown } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Accordion from '../components/Accordion/Accordion.vue'
import AccordionGroup from '../components/Accordion/AccordionGroup.vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'

const dynamicAccordions = ref(['Item 1', 'Item 2', 'Item 3'])
const controlledOpen = ref(false)
const groupOpen = ref<string[]>(['b'])
const lorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.'

function addItem() {
  dynamicAccordions.value.push(`Item ${dynamicAccordions.value.length + 1}`)
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Accordion
    </h3>
    <Grid :columns="2" gap="xl">
      <div>
        <strong class="block mb-s text-semibold">Base</strong>
        <Accordion label="Open details" class="mb-s">
          <p>{{ lorem }}</p>
        </Accordion>
        <Accordion label="Disabled" disabled class="mb-xl">
          <p>{{ lorem }}</p>
        </Accordion>

        <strong class="block mb-s text-semibold">Controlled</strong>
        <Flex gap="s" class="mb-s">
          <Button size="s" @click="controlledOpen = !controlledOpen">
            Toggle from outside ({{ controlledOpen ? 'open' : 'closed' }})
          </Button>
        </Flex>
        <Accordion v-model:open="controlledOpen" label="Controlled accordion" class="mb-xl">
          <p>{{ lorem }}</p>
        </Accordion>

        <strong class="block mb-s text-semibold">Single group, dynamic items</strong>
        <Flex gap="s" class="mb-s">
          <Button size="s" @click="addItem">
            Add
          </Button>
          <Button size="s" @click="dynamicAccordions.pop()">
            Remove
          </Button>
        </Flex>
        <AccordionGroup single>
          <Accordion v-for="item in dynamicAccordions" :key="item" :label="item">
            <p>{{ lorem }}</p>
          </Accordion>
        </AccordionGroup>
      </div>

      <div>
        <strong class="block mb-s text-semibold">Card</strong>
        <Accordion label="Open details" card class="mb-xl">
          <p>{{ lorem }}</p>
        </Accordion>

        <strong class="block mb-s text-semibold">Card group, v-model</strong>
        <p class="mb-s">
          Open: {{ groupOpen.join(', ') || '-' }}
        </p>
        <AccordionGroup v-model="groupOpen" class="mb-xl">
          <Accordion value="a" label="A" card class="mb-xs">
            <p>{{ lorem }}</p>
          </Accordion>
          <Accordion value="b" label="B" card class="mb-xs">
            <p>{{ lorem }}</p>
          </Accordion>
          <Accordion value="c" label="C" card>
            <p>{{ lorem }}</p>
          </Accordion>
        </AccordionGroup>

        <strong class="block mb-s text-semibold">Default open</strong>
        <AccordionGroup :default-open="['second']" class="mb-xl">
          <Accordion value="first" label="First">
            <p>{{ lorem }}</p>
          </Accordion>
          <Accordion value="second" label="Second, open by default">
            <p>{{ lorem }}</p>
          </Accordion>
        </AccordionGroup>

        <strong class="block mb-s text-semibold">Nested</strong>
        <Accordion label="Outer" card class="mb-xl">
          <Accordion label="Inner">
            <p>{{ lorem }}</p>
          </Accordion>
        </Accordion>
      </div>

      <div>
        <strong class="block mb-s text-semibold">Custom header content</strong>
        <Accordion class="mb-xl">
          <template #header>
            <strong>Custom <em>header</em> content</strong>
          </template>
          <p>{{ lorem }}</p>
        </Accordion>

        <strong class="block mb-s text-semibold">Custom trigger</strong>
        <Accordion class="mb-xl">
          <template #trigger="{ toggle, isOpen, attrs }">
            <Button v-bind="attrs" class="mb-s" @click="toggle">
              {{ isOpen ? 'Hide' : 'Show' }} content
              <template #end>
                <IconCaretDown :style="{ transform: isOpen ? 'rotate(180deg)' : undefined }" />
              </template>
            </Button>
          </template>
          <p>{{ lorem }}</p>
        </Accordion>
      </div>

      <div>
        <strong class="block mb-s text-semibold">Unstyled</strong>
        <p class="mb-m">
          In some cases, we need a fully custom animated component which hides content.
        </p>
        <Accordion class="mb-xl" unstyled>
          <template #header>
            <p>Open details</p>
          </template>
          <p>{{ lorem }}</p>
        </Accordion>
      </div>
    </Grid>
  </div>
</template>
