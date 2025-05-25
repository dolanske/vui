<script setup lang="ts">
import { Accordion, AccordionGroup } from '@dolanske/vui'

const accordions = [
  'Hello world',
  'Hello dog',
  'Hello cat',
]

const content = `
\`\`\`vue
<AccordionGroup single>
  <Accordion v-for="item in accordions" :key="item" :label="item" card class="mb-xs">
    <p>I am the content of the accordion</p>
  </Accordion>
</AccordionGroup>
\`\`\`
`
</script>

<template>
  <div>
    <h1>Accordion</h1>
    <p class="mb-l">
      Vertical stack of interactive components, where each upon clicking reveals associated content within.
    </p>

    <DocsExample>
      <template #component>
        <AccordionGroup single>
          <Accordion v-for="item in accordions" :key="item" :label="item" class="mb-xs">
            <p>I am the content of the accordion</p>
          </Accordion>
        </AccordionGroup>
      </template>
      <template #code>
        <MDC :value="content" tag="div" />
      </template>
    </DocsExample>
  </div>
</template>
