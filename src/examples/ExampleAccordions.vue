<script setup lang='ts'>
import { ref } from 'vue'
import Accordion from '../components/Accordion/Accordion.vue'
import AccordionGroup from '../components/Accordion/AccordionGroup.vue'
import Grid from '../components/Grid/Grid.vue'

const dynamicAccordions = ref([
  'First',
  'Second',
  'Third',
])
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Accordion
    </h3>

    <Grid :columns="2" gap="xl">
      <div>
        <strong class="block mb-s text-semibold">Base</strong>
        <Accordion label="Open details" class="mb-xl">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
        </Accordion>
        <Accordion label="Open Two" class="mb-xl">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
        </Accordion>

        <div class="mb-xl" />

        <strong class="block mb-s text-semibold">Group</strong>
        <AccordionGroup single>
          <Accordion v-for="item in dynamicAccordions" :key="item" :label="item">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.</p>
          </Accordion>
        </AccordionGroup>
      </div>
      <div>
        <strong class="block mb-s text-semibold">Card</strong>
        <Accordion label="Open details" card>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
        </Accordion>

        <div class="mb-xl" />

        <strong class="block mb-s text-semibold">Card group</strong>
        <AccordionGroup single>
          <Accordion v-for="item in dynamicAccordions" :key="item" :label="item" card class="mb-xs">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.</p>
          </Accordion>
        </AccordionGroup>
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
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
        </Accordion>
      </div>
    </Grid>
  </div>
</template>
