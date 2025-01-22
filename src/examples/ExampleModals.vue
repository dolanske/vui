<script setup lang='ts'>
import type { Sizes } from '../shared/types'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Modal from '../components/Modal/Modal.vue'

const open = ref(false)
const open2 = ref(false)
const open3 = ref(false)
const open4 = ref(false)

const size = ref<Sizes | 'full'>('s')
function setSize(s: any) {
  size.value = s
  open2.value = true
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Modals
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Button @click="open = !open">
              Open
            </Button>
            <Modal v-model="open">
              <template #header>
                <h4>Modal </h4>
              </template>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum id, distinctio voluptatum repellat eveniet repellendus saepe velit rem illo facere aspernatur iste nam, quasi dolores expedita consectetur enim autem?</p>
              <template #footer="{ close }">
                <Button @click="close">
                  Close
                </Button>
              </template>
            </Modal>
          </td>
        </tr>
        <tr>
          <th>Sizes</th>
          <td>
            <Flex>
              <Button square @click="setSize('s')">
                S
              </Button>
              <Button square @click="setSize('l')">
                L
              </Button>
              <Button square @click="setSize('full')">
                Full
              </Button>
            </Flex>
            <Modal v-model="open2" :size>
              <template #header>
                <h4>Modal </h4>
              </template>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum id, distinctio voluptatum repellat eveniet repellendus saepe velit rem illo facere aspernatur iste nam, quasi dolores expedita consectetur enim autem?</p>
              <template #footer="{ close }">
                <Button @click="close">
                  Close
                </Button>
              </template>
            </Modal>
          </td>
        </tr>
        <tr>
          <th>Centered + separators + can't dismiss</th>
          <td>
            <Button @click="open3 = !open3">
              Open
            </Button>
            <Modal v-model="open3" centered :card="{ separators: true }" :can-dismiss="false">
              <template #header>
                <h4>What is this?</h4>
              </template>
              <p>Non dismissable modal means that it can only be closed via a provided button. Like a confirmation etc. No chance of closing it by clicking the x buttton, pressing escape or clicking the backdrop.</p>
              <template #footer="{ close }">
                <Button @click="close">
                  Close
                </Button>
              </template>
            </Modal>
          </td>
        </tr>
        <tr>
          <th>
            Scrollable
          </th>
          <td>
            <Button @click="open4 = !open4">
              Open
            </Button>
            <Modal v-model="open4" :card="{ separators: true }" scrollable>
              <template #header>
                <h4>What is this?</h4>
              </template>
              <p class="text-xxxxl">
                Non dismissable modal means that it can only be closed via a provided button. Like a confirmation etc. No chance of closing it by clicking the x buttton, pressing escape or clicking the backdrop. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nisi eos dolores ipsa perspiciatis ullam voluptates quos. Recusandae quod atque, laudantium quis, ad quaerat cumque vero quibusdam facilis, blanditiis eius.
              </p>
              <template #footer="{ close }">
                <Button @click="close">
                  Close
                </Button>
              </template>
            </Modal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
