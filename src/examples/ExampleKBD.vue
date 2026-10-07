<script setup lang='ts'>
import { whenever } from '@vueuse/core'
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import Input from '../components/Input/Input.vue'
import Kbd from '../components/Kbd/Kbd.vue'
import KbdGroup from '../components/Kbd/KbdGroup.vue'

const active = ref(false)
const triggers = ref(0)
const escapes = ref(0)
const typed = ref('')

whenever(active, () => {
  setTimeout(() => {
    active.value = false
  }, 1000)
})
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      KBD
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Flex>
              <Kbd keys="Ctrl" />
              <Kbd keys="Shift" />
              <Kbd keys="A" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Group</th>
          <td>
            <Flex :gap="2">
              <KbdGroup @trigger="active = true">
                <Kbd highlight keys="Shift" />
                <Kbd highlight keys="A" />
              </KbdGroup>
              {{ active ? 'Pressed' : '' }}
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Custom labels</th>
          <td>
            <Flex>
              <Kbd highlight keys="Shift" label="Shift bro" />
              <Kbd highlight keys="A" label="A key" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Multiple keys in one</th>
          <td>
            <Kbd keys="Shift+A" highlight />
          </td>
        </tr>
        <tr>
          <th>Trigger <br> Ignored while typing</th>
          <td>
            <Flex gap="m" y-center>
              <Kbd keys="K" highlight @trigger="triggers++" />
              <Kbd keys="Ctrl+K" highlight @trigger="triggers++" />
              <span>Triggered {{ triggers }}x</span>
            </Flex>
            <Input v-model="typed" class="mt-s" placeholder="Typing K here does not trigger" />
          </td>
        </tr>
        <tr>
          <th>Allow in inputs</th>
          <td>
            <Flex gap="m" y-center>
              <Kbd keys="Escape" highlight allow-in-inputs @trigger="escapes++" />
              <span>Escape pressed {{ escapes }}x, also inside inputs</span>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
