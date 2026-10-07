<script setup lang='ts'>
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Progress from '../components/Progress/Progress.vue'

const progress = ref(40)
const fake = ref(0)
const fakeRunning = ref(false)
const showFixed = ref(false)
const doneCount = ref(0)

function increment() {
  progress.value = Math.min(100, progress.value + 15)
}

function startFake() {
  fake.value = 0
  fakeRunning.value = true
}

function finishFake() {
  fake.value = 100
  fakeRunning.value = false
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Progress
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Controls</th>
          <td>
            <Flex gap="s" y-center>
              <Button size="s" @click="increment">
                Add 15%
              </Button>
              <Button size="s" @click="progress = 0">
                Reset
              </Button>
              <Button size="s" @click="showFixed = !showFixed">
                {{ showFixed ? 'Hide' : 'Show' }} fixed
              </Button>
              <span>{{ progress }}% <br> Done emitted {{ doneCount }}x</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Default</th>
          <td>
            <Progress v-model="progress" label="Upload progress" @done="doneCount++" />
          </td>
        </tr>
        <tr>
          <th>Custom color</th>
          <td>
            <Flex column gap="s">
              <Progress v-model="progress" color="var(--color-text-green)" />
              <Progress v-model="progress" color="var(--color-text-red)" />
              <Progress v-model="progress" color="var(--color-accent)" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Custom height</th>
          <td>
            <Flex column gap="s">
              <Progress v-model="progress" :height="2" />
              <Progress v-model="progress" height="8px" />
              <Progress v-model="progress" height="1rem" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Indeterminate</th>
          <td>
            <Progress indeterminate label="Loading" />
          </td>
        </tr>
        <tr>
          <th>Fake</th>
          <td>
            <Flex column gap="s">
              <Flex gap="s">
                <Button size="s" @click="startFake">
                  Start
                </Button>
                <Button size="s" @click="finishFake">
                  Finish
                </Button>
              </Flex>
              <Progress v-if="fakeRunning || fake === 100" v-model="fake" fake />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Out of range <br> Clamped to 0 - 100</th>
          <td>
            <Flex column gap="s">
              <Progress :model-value="-20" />
              <Progress :model-value="140" />
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>

    <Progress v-if="showFixed" v-model="progress" fixed />
  </div>
</template>
