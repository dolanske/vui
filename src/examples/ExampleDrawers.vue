<script setup lang='ts'>
import type { Sizes } from '../shared/types'
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Card from '../components/Card/Card.vue'
import Drawer from '../components/Drawer/Drawer.vue'
import Flex from '../components/Flex/Flex.vue'

const open = ref(false)
const open2 = ref(false)
const open3 = ref(false)

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
            <Drawer
              :open
              title="Hello"
              :container-size="size"
              overlay
              @close="open = false"
            >
              <h2>Hello</h2>
              <Flex column gap="l">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, temporibus soluta. Maxime doloremque saepe hic voluptatum earum ipsam debitis consectetur quibusdam tempora omnis praesentium, inventore in distinctio non accusantium asperiores?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos accusamus earum saepe, molestiae labore ad voluptate impedit mollitia cumque optio ut nobis quam odit quae? Similique aliquam quia a dolore!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit deserunt sed quasi animi accusantium sapiente dolore nisi? Laborum cum aliquam reiciendis maiores recusandae sint! Porro voluptates quod ea dolore quasi!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam nemo fugit sequi assumenda illo veritatis eveniet pariatur laudantium, cupiditate, amet, nesciunt molestias nihil alias. Nemo iure eius pariatur eos corrupti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita officia fugit, repellat mollitia vero modi impedit enim distinctio incidunt earum quibusdam a, magnam provident minus quo veritatis similique aliquid molestias.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate laudantium maiores? Nesciunt harum doloribus accusantium architecto, quod rem porro iusto, quia dicta ex sapiente nulla earum voluptatibus, dolor veritatis?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem amet qui expedita suscipit eum? Culpa et repellat, dicta perspiciatis laboriosam atque eaque animi possimus, sit fugit fuga? Unde, aspernatur quibusdam.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, temporibus soluta. Maxime doloremque saepe hic voluptatum earum ipsam debitis consectetur quibusdam tempora omnis praesentium, inventore in distinctio non accusantium asperiores?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos accusamus earum saepe, molestiae labore ad voluptate impedit mollitia cumque optio ut nobis quam odit quae? Similique aliquam quia a dolore!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit deserunt sed quasi animi accusantium sapiente dolore nisi? Laborum cum aliquam reiciendis maiores recusandae sint! Porro voluptates quod ea dolore quasi!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam nemo fugit sequi assumenda illo veritatis eveniet pariatur laudantium, cupiditate, amet, nesciunt molestias nihil alias. Nemo iure eius pariatur eos corrupti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita officia fugit, repellat mollitia vero modi impedit enim distinctio incidunt earum quibusdam a, magnam provident minus quo veritatis similique aliquid molestias.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, temporibus soluta. Maxime doloremque saepe hic voluptatum earum ipsam debitis consectetur quibusdam tempora omnis praesentium, inventore in distinctio non accusantium asperiores?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos accusamus earum saepe, molestiae labore ad voluptate impedit mollitia cumque optio ut nobis quam odit quae? Similique aliquam quia a dolore!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit deserunt sed quasi animi accusantium sapiente dolore nisi? Laborum cum aliquam reiciendis maiores recusandae sint! Porro voluptates quod ea dolore quasi!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam nemo fugit sequi assumenda illo veritatis eveniet pariatur laudantium, cupiditate, amet, nesciunt molestias nihil alias. Nemo iure eius pariatur eos corrupti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita officia fugit, repellat mollitia vero modi impedit enim distinctio incidunt earum quibusdam a, magnam provident minus quo veritatis similique aliquid molestias.</p>
              </Flex>
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
        <tr>
          <th>Snap points</th>
          <td>
            <Button @click="open3 = true">
              Open
            </Button>
            <Drawer
              :open="open3"
              title="Snap points"
              :root-props="{ snapPoints: [0.2, 0.4, 0.8], modal: false, dismissible: false }"
              @close="open3 = false"
            >
              <Card>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ipsam atque magnam! Assumenda eveniet repellat delectus nihil ducimus, deserunt voluptatum error fugit quod nisi qui accusantium corrupti doloremque quam quasi.</p>
              </Card>
              <Flex column gap="l">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, temporibus soluta. Maxime doloremque saepe hic voluptatum earum ipsam debitis consectetur quibusdam tempora omnis praesentium, inventore in distinctio non accusantium asperiores?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos accusamus earum saepe, molestiae labore ad voluptate impedit mollitia cumque optio ut nobis quam odit quae? Similique aliquam quia a dolore!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit deserunt sed quasi animi accusantium sapiente dolore nisi? Laborum cum aliquam reiciendis maiores recusandae sint! Porro voluptates quod ea dolore quasi!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam nemo fugit sequi assumenda illo veritatis eveniet pariatur laudantium, cupiditate, amet, nesciunt molestias nihil alias. Nemo iure eius pariatur eos corrupti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita officia fugit, repellat mollitia vero modi impedit enim distinctio incidunt earum quibusdam a, magnam provident minus quo veritatis similique aliquid molestias.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate laudantium maiores? Nesciunt harum doloribus accusantium architecto, quod rem porro iusto, quia dicta ex sapiente nulla earum voluptatibus, dolor veritatis?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem amet qui expedita suscipit eum? Culpa et repellat, dicta perspiciatis laboriosam atque eaque animi possimus, sit fugit fuga? Unde, aspernatur quibusdam.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, temporibus soluta. Maxime doloremque saepe hic voluptatum earum ipsam debitis consectetur quibusdam tempora omnis praesentium, inventore in distinctio non accusantium asperiores?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos accusamus earum saepe, molestiae labore ad voluptate impedit mollitia cumque optio ut nobis quam odit quae? Similique aliquam quia a dolore!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit deserunt sed quasi animi accusantium sapiente dolore nisi? Laborum cum aliquam reiciendis maiores recusandae sint! Porro voluptates quod ea dolore quasi!</p>
              </Flex>
            </Drawer>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
