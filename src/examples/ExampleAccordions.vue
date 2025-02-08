<script setup lang='ts'>
import Accordion from '../components/Accordion/Accordion.vue'
import AccordionGroup from '../components/Accordion/AccordionGroup.vue'
import Grid from '../components/Grid/Grid.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Accordion
    </h3>

    <Grid :columns="2" gap="xl">
      <div>
        <strong class="block mb-s">Base</strong>
        <Accordion label="Open details" class="mb-xl">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
        </Accordion>

        <div class="mb-xl" />

        <strong class="block mb-s">Group</strong>
        <AccordionGroup single>
          <Accordion label="First">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.
          </Accordion>
          <Accordion label="Second">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.
          </Accordion>
          <Accordion label="Third">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.
          </Accordion>
        </AccordionGroup>
      </div>
      <div>
        <strong class="block mb-s">Card</strong>
        <Accordion label="Open details" card>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
        </Accordion>

        <div class="mb-xl" />

        <strong class="block mb-s">Card group</strong>
        <AccordionGroup single>
          <Accordion card label="First" class="mb-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.
          </Accordion>
          <Accordion card label="Second" class="mb-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.
          </Accordion>
          <Accordion card label="Third" class="mb-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aliquam ad dicta nesciunt exercitationem? Quas vitae suscipit aliquam numquam incidunt corporis ullam, nihil dolores perferendis ipsa velit tempora accusantium cupiditate.
          </Accordion>
        </AccordionGroup>
      </div>
    </Grid>
  </div>
</template>
