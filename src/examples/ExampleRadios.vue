<script setup lang='ts'>
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import Radio from '../components/Radio/Radio.vue'
import RadioGroup from '../components/Radio/RadioGroup.vue'

const basic = ref('option1')
const vertical = ref<string>()
const objectValue = ref<{ id: number }>()
const accent = ref('b')
const plans = [
  { id: 1, name: 'Hobby', price: 'Free' },
  { id: 2, name: 'Pro', price: '$12 / month' },
  { id: 3, name: 'Team', price: '$40 / month' },
]
const plan = ref(2)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Radios
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default, horizontal</th>
          <td>
            <Flex column gap="xs">
              <RadioGroup v-model="basic" gap="l" label="Choose an option">
                <Radio value="option1" label="Option 1" />
                <Radio value="option2" label="Option 2" />
                <Radio value="option3" label="Option 3" />
              </RadioGroup>
              <span>Selected: {{ basic }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Vertical, none selected</th>
          <td>
            <RadioGroup v-model="vertical" column gap="s">
              <Radio value="email" label="Email" />
              <Radio value="sms" label="SMS" />
              <Radio value="push" label="Push notification" />
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <th>Accent</th>
          <td>
            <RadioGroup v-model="accent" gap="l">
              <Radio value="a" label="Accent A" accent />
              <Radio value="b" label="Accent B" accent />
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <th>Disabled item</th>
          <td>
            <RadioGroup v-model="basic" gap="l">
              <Radio value="option1" label="Enabled" />
              <Radio value="option2" label="Disabled" disabled />
              <Radio value="option3" label="Enabled" />
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <th>Disabled group</th>
          <td>
            <RadioGroup model-value="x" disabled gap="l">
              <Radio value="x" label="Selected" />
              <Radio value="y" label="Other" />
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <th>Object values</th>
          <td>
            <Flex column gap="xs">
              <RadioGroup v-model="objectValue" gap="l">
                <Radio :value="{ id: 1 }" label="Object 1" />
                <Radio :value="{ id: 2 }" label="Object 2" />
              </RadioGroup>
              <span>Selected: {{ objectValue ?? '-' }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Custom content</th>
          <td>
            <RadioGroup v-model="plan" column gap="s" name="plan" required>
              <Radio v-for="item in plans" :key="item.id" :value="item.id">
                <strong>{{ item.name }}</strong>
                <span class="text-color-light"> - {{ item.price }}</span>
              </Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <th>Without a group</th>
          <td>
            <Flex gap="l">
              <Radio v-model="basic" value="option1" name="loose" label="Loose 1" />
              <Radio v-model="basic" value="option2" name="loose" label="Loose 2" />
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
