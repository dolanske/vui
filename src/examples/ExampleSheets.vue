<script setup lang='ts'>
import type { SelectOption } from '../components/Select/Select.vue'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Input from '../components/Input/Input.vue'
import Modal from '../components/Modal/Modal.vue'
import Select from '../components/Select/Select.vue'
import Sheet from '../components/Sheet/Sheet.vue'

const open1 = ref()
const open2 = ref()
const openLocked = ref(false)
const openForm = ref(false)
const openOuter = ref(false)
const openInner = ref(false)
const openModal = ref(false)
const openLong = ref(false)
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
            <Flex gap="m" x-start>
              <Button @click="open1 = !open1">
                Open
              </Button>
              <Sheet class="red" :open="open1" :position="option[0].value" :card="{ separators: true }" @close="open1 = false">
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
            <Flex gap="m" x-start y-center>
              <Input v-model="width">
                <template #start>
                  Width
                </template>
              </Input>
              <Button @click="open2 = !open2">
                Open
              </Button>
              <Sheet :open="open2" :position="option[0].value" :size="width" @close="open2 = false">
                <template #header>
                  <h2>Hello </h2>
                </template>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias consectetur obcaecati recusandae debitis voluptatum exercitationem. Nam facilis laudantium labore sint cum, veritatis autem asperiores consectetur possimus cumque beatae eveniet.</p>
              </Sheet>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Not dismissible <br> Escape and backdrop do nothing</th>
          <td>
            <Button @click="openLocked = true">
              Open
            </Button>
            <Sheet v-model:open="openLocked" :can-dismiss="false" :position="option[0].value">
              <template #header>
                <h3>Finish this first</h3>
              </template>
              <p class="mb-m">
                This sheet can only be closed with the button below.
              </p>
              <template #footer>
                <Button variant="accent" @click="openLocked = false">
                  Done
                </Button>
              </template>
            </Sheet>
          </td>
        </tr>
        <tr>
          <th>Hidden close button, form</th>
          <td>
            <Button @click="openForm = true">
              Edit profile
            </Button>
            <Sheet v-model:open="openForm" hide-close-button :position="option[0].value">
              <template #header>
                <h3>Edit profile</h3>
              </template>
              <Flex column gap="m">
                <Input label="Name" model-value="Jane Doe" />
                <Input label="Email" model-value="jane@example.com" type="email" />
              </Flex>
              <template #footer>
                <Flex gap="s" x-end>
                  <Button @click="openForm = false">
                    Cancel
                  </Button>
                  <Button variant="accent" @click="openForm = false">
                    Save
                  </Button>
                </Flex>
              </template>
            </Sheet>
          </td>
        </tr>
        <tr>
          <th>Nested <br> Sheet opens a modal and another sheet</th>
          <td>
            <Button @click="openOuter = true">
              Open
            </Button>
            <Sheet v-model:open="openOuter" :position="option[0].value">
              <template #header>
                <h3>Outer sheet</h3>
              </template>
              <Flex gap="s">
                <Button @click="openInner = true">
                  Open inner sheet
                </Button>
                <Button @click="openModal = true">
                  Open modal
                </Button>
              </Flex>
              <Sheet v-model:open="openInner" position="right" :size="280">
                <template #header>
                  <h3>Inner sheet</h3>
                </template>
                <p>Escape closes only this sheet.</p>
              </Sheet>
              <Modal v-model:open="openModal" size="s">
                <template #header>
                  <h3>Modal over a sheet</h3>
                </template>
                <p>Focus stays inside this modal.</p>
              </Modal>
            </Sheet>
          </td>
        </tr>
        <tr>
          <th>Long content</th>
          <td>
            <Button @click="openLong = true">
              Open
            </Button>
            <Sheet v-model:open="openLong" :position="option[0].value">
              <template #header>
                <h3>Scrolling content</h3>
              </template>
              <p v-for="i in 30" :key="i" class="mb-s">
                Paragraph {{ i }}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </Sheet>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
