<script setup lang='ts'>
import Accordion from '../components/Accordion/Accordion.vue'
import AccordionGroup from '../components/Accordion/AccordionGroup.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Accordion
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Default</th>
          <td>
            <Accordion label="Open details">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
            </Accordion>
          </td>
        </tr>
        <tr>
          <th>Card layout</th>
          <td>
            <Accordion label="Open details" card>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi nostrum aspernatur nam earum vitae deleniti, odio atque esse sequi, in harum! Sint dolorum quis excepturi odio eum aspernatur aliquid harum.</p>
            </Accordion>
          </td>
        </tr>
        <tr>
          <th>Group</th>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>

    <div class="w-65" />
  </div>
</template>
