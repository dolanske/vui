<script setup lang='ts'>
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import Switch from '../components/Switch/Switch.vue'

const basic = ref(false)
const accent = ref(true)
const reversed = ref(false)
const notifications = ref(true)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Switches
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default</th>
          <td>
            <Flex gap="m" y-center>
              <Switch v-model="basic" label="You're awesome" />
              <span>{{ basic }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Without label</th>
          <td>
            <Switch v-model="basic" aria-label="Toggle without a label" />
          </td>
        </tr>
        <tr>
          <th>Accent</th>
          <td>
            <Switch v-model="accent" accent label="Accent switch" />
          </td>
        </tr>
        <tr>
          <th>Reversed</th>
          <td>
            <Switch v-model="reversed" reversed label="Label on the left" style="width: 240px" />
          </td>
        </tr>
        <tr>
          <th>Hint</th>
          <td>
            <Switch v-model="notifications" label="Notifications" hint="Receive an email when someone mentions you" />
          </td>
        </tr>
        <tr>
          <th>Disabled</th>
          <td>
            <Flex gap="l">
              <Switch disabled label="Off" />
              <Switch :model-value="true" disabled label="On" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Custom content</th>
          <td>
            <Switch v-model="basic">
              <strong>Bold</strong> and <em>italic</em> content
            </Switch>
          </td>
        </tr>
        <tr>
          <th>Long label</th>
          <td style="max-width: 280px">
            <Switch v-model="basic" label="A very long label which should wrap onto multiple lines without breaking the layout of the switch" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
