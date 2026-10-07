<script setup lang='ts'>
import { ref } from 'vue'
import Card from '../components/Card/Card.vue'
import Flex from '../components/Flex/Flex.vue'
import Resizable from '../components/Resizable/Resizable.vue'

const sizes = ref<number[]>()
const showMiddle = ref(true)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Resizeable
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Mixed directions</th>
          <td>
            <Card :padding="false">
              <Resizable>
                <Flex class="example-panel" x-center y-center>
                  <p>Panel 1</p>
                </Flex>
                <Flex class="example-panel" x-center y-center>
                  <p>Panel 2</p>
                </Flex>
                <Resizable class="example-panel" vertical>
                  <Flex class="h-100" x-center y-center>
                    <p>Panel 3</p>
                  </Flex>
                  <Flex class="h-100" x-center y-center>
                    <p>Panel 4</p>
                  </Flex>
                </Resizable>
              </Resizable>
            </Card>
          </td>
        </tr>
        <tr>
          <th>Sizes model, min / max</th>
          <td>
            <Card :padding="false">
              <Resizable v-model:sizes="sizes" :panels="[{ minSize: 120 }, { minSize: 80, maxSize: 240 }, {}]">
                <Flex class="example-panel" x-center y-center>
                  <p>Min 120px</p>
                </Flex>
                <Flex class="example-panel" x-center y-center>
                  <p>80 - 240px</p>
                </Flex>
                <Flex class="example-panel" x-center y-center>
                  <p>Free</p>
                </Flex>
              </Resizable>
            </Card>
            <p class="mt-s">
              Sizes: {{ sizes?.map(size => Math.round(size)).join(', ') ?? '-' }}
            </p>
          </td>
        </tr>
        <tr>
          <th>Remembered in local storage</th>
          <td>
            <Card :padding="false">
              <Resizable storage-key="vui-example-resizable">
                <Flex class="example-panel-s" x-center y-center>
                  <p>Reload the page</p>
                </Flex>
                <Flex class="example-panel-s" x-center y-center>
                  <p>Sizes persist</p>
                </Flex>
              </Resizable>
            </Card>
          </td>
        </tr>
        <tr>
          <th>Hidden handles</th>
          <td>
            <Card :padding="false">
              <Resizable hide-handles>
                <Flex class="example-panel-s" x-center y-center>
                  <p>A</p>
                </Flex>
                <Flex class="example-panel-s" x-center y-center>
                  <p>B</p>
                </Flex>
              </Resizable>
            </Card>
          </td>
        </tr>
        <tr>
          <th>Conditional panel <br> Keyboard: focus a handle, use arrows</th>
          <td>
            <label class="mb-s block">
              <input v-model="showMiddle" type="checkbox"> Show middle panel
            </label>
            <Card :padding="false">
              <Resizable handle-label="Resize sidebar">
                <Flex class="example-panel-s" x-center y-center>
                  <p>Left</p>
                </Flex>
                <Flex v-if="showMiddle" class="example-panel-s" x-center y-center>
                  <p>Middle</p>
                </Flex>
                <Flex class="example-panel-s" x-center y-center>
                  <p>Right</p>
                </Flex>
              </Resizable>
            </Card>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.example-panel {
  height: 256px;
}

.example-panel-s {
  height: 128px;
}
</style>
