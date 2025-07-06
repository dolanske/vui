<script setup lang="ts">
import { Accordion, AccordionGroup } from '@dolanske/vui'

const accordions = [
  ['About Vui', 'Vui is a vu3 component library'],
  ['How to contribute?', 'Just clone the repo and submit a PR!'],
]
</script>

<template>
  <DocsExample>
    <template #component>
      <AccordionGroup single>
        <Accordion v-for="item in accordions" :key="item[0]" :label="item[0]" class="mb-xs" card>
          <p class="m-0">
            {{ item[1] }}
          </p>
        </Accordion>
      </AccordionGroup>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
