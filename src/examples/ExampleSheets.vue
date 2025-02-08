<script setup lang='ts'>
import type { SelectOption } from '../components/Select/Select.vue'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Input from '../components/Input/Input.vue'
import Select from '../components/Select/Select.vue'
import Sheet from '../components/Sheet/Sheet.vue'

const open1 = ref()
const open2 = ref()
const width = ref(328)
const options: SelectOption[] = [{ value: 'left', label: 'Left' }, { value: 'right', label: ' Right' }, { value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }]
const option = ref([options[0]])
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Sheets
    </h3>

    <Select v-model="option" expand label="Position" :options class="mb-l" required />

    <table>
      <tbody>
        <tr>
          <th>Base + divider + footer</th>
          <td>
            <Flex gap="m" justify-start>
              <Button @click="open1 = !open1">
                Open
              </Button>
              <Sheet v-model="open1" :position="option[0].value" separator>
                <template #header>
                  <h2>Hello </h2>
                </template>
                <h2 class="text-color-lighter">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias consectetur obcaecati recusandae debitis voluptatum exercitationem. Nam facilis laudantium labore sint cum, veritatis autem asperiores consectetur possimus cumque beatae eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit rem quod quisquam laborum sed excepturi, eum nisi nostrum, totam nihil magni voluptatum rerum culpa voluptatibus velit, sapiente fuga similique eius?
                </h2>
                <template #footer="{ close }">
                  <p class="mb-s">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis placeat nisi, in velit temporibus at esse error et iusto vero odit illo veritatis rem cum delectus autem minus quod reiciendis.
                  </p>
                  <Button @click="close">
                    Close
                  </Button>
                </template>
              </Sheet>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Width</th>
          <td>
            <Flex gap="m" justify-start align-center>
              <Input v-model="width">
                <template #start>
                  Width
                </template>
              </Input>
              <Button @click="open2 = !open2">
                Open
              </Button>
              <Sheet v-model="open2" :position="option[0].value" :size="width">
                <template #header>
                  <h2>Hello </h2>
                </template>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias consectetur obcaecati recusandae debitis voluptatum exercitationem. Nam facilis laudantium labore sint cum, veritatis autem asperiores consectetur possimus cumque beatae eveniet.</p>
              </Sheet>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
