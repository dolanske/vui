<script setup lang='ts'>
import { IconPencil, IconTrash } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Avatar from '../components/Avatar/Avatar.vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Modal from '../components/Modal/Modal.vue'
import Tooltip from '../components/Tooltip/Tooltip.vue'

const modalOpen = ref(false)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Tooltips
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Tooltip>
              <span>Hover me</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minus labore commodi aliquid molestiae non voluptas, veritatis nesciunt. Nihil quod necessitatibus veritatis nam enim eius deleniti unde recusandae reprehenderit voluptate?</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Disabled</th>
          <td>
            <Tooltip disabled>
              <span>Hover me</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minus labore commodi aliquid molestiae non voluptas, veritatis nesciunt. Nihil quod necessitatibus veritatis nam enim eius deleniti unde recusandae reprehenderit voluptate?</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Enter delay</th>
          <td>
            <Tooltip :enter-delay="500">
              <span>Hover me (500ms open delay)</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Leave delay</th>
          <td>
            <Tooltip :leave-delay="500">
              <span>Hover me (500ms close delay)</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Both delays</th>
          <td>
            <Tooltip :enter-delay="300" :leave-delay="600">
              <span>Hover me (300ms open / 600ms close)</span>
              <template #tooltip>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Custom placement</th>
          <td>
            <Flex>
              <Tooltip placement="top">
                <span>Above</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
              <Tooltip placement="right">
                <span>Right</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
              <Tooltip placement="left">
                <span>Left</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
              <Tooltip placement="bottom">
                <span>Bottom</span>
                <template #tooltip>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </template>
              </Tooltip>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Arrow</th>
          <td>
            <Flex gap="l">
              <Tooltip v-for="placement in (['top', 'right', 'bottom', 'left'] as const)" :key="placement" arrow :placement>
                <span>{{ placement }}</span>
                <template #tooltip>
                  <p>Tooltip with an arrow</p>
                </template>
              </Tooltip>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>On buttons <br> Shows on keyboard focus, Escape hides</th>
          <td>
            <Flex gap="s">
              <Tooltip>
                <Button square aria-label="Edit">
                  <IconPencil />
                </Button>
                <template #tooltip>
                  <p>Edit</p>
                </template>
              </Tooltip>
              <Tooltip>
                <Button square aria-label="Delete" variant="danger">
                  <IconTrash />
                </Button>
                <template #tooltip>
                  <p>Delete forever</p>
                </template>
              </Tooltip>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Rich content</th>
          <td>
            <Tooltip>
              <span>Hover for a profile</span>
              <template #tooltip>
                <Flex gap="s" y-center>
                  <Avatar :size="32" fallback="JD" />
                  <div>
                    <strong class="block">Jane Doe</strong>
                    <span class="text-color-light">Designer</span>
                  </div>
                </Flex>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Long text</th>
          <td>
            <Tooltip>
              <span>Hover me</span>
              <template #tooltip>
                <p>{{ 'A very long tooltip text which should wrap within a sensible maximum width. '.repeat(3) }}</p>
              </template>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <th>Inside a modal</th>
          <td>
            <Button @click="modalOpen = true">
              Open modal
            </Button>
            <Modal v-model:open="modalOpen">
              <Tooltip>
                <Button>Hover me</Button>
                <template #tooltip>
                  <p>Tooltip above the modal</p>
                </template>
              </Tooltip>
            </Modal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
