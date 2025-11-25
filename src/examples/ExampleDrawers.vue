<script setup lang='ts'>
import type { Sizes } from '../shared/types'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Drawer from '../components/Drawer/Drawer.vue'
import Flex from '../components/Flex/Flex.vue'

const open = ref(false)
const open2 = ref(false)

const size = ref<Sizes | 'full'>('s')
function setSize(s: any) {
  size.value = s
  open.value = true
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Drawers
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Flex>
              <Button square @click="setSize('s')">
                S
              </Button>
              <Button square @click="setSize('m')">
                M
              </Button>
              <Button square @click="setSize('l')">
                L
              </Button>
              <Button square @click="setSize('xl')">
                XL
              </Button>
              <Button square @click="setSize('full')">
                Full
              </Button>
            </Flex>
            <Drawer :open title="Hello" :container-size="size" @close="open = false">
              <h2>Hello</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate laudantium maiores? Nesciunt harum doloribus accusantium architecto, quod rem porro iusto, quia dicta ex sapiente nulla earum voluptatibus, dolor veritatis?</p>
            </Drawer>
          </td>
        </tr>
        <tr>
          <th>With animation + no handle</th>
          <td>
            <Button @click="open2 = !open2">
              Open
            </Button>
            <Drawer :open="open2" :handle="false" title="Hello" :container-size="size" @close="open2 = false">
              <h2>Hello</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate laudantium maiores? Nesciunt harum doloribus accusantium architecto, quod rem porro iusto, quia dicta ex sapiente nulla earum voluptatibus, dolor veritatis?</p>
            </Drawer>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
