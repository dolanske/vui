<script setup lang='ts'>
import { IconMinus, IconPause, IconPlay, IconPlus } from '@iconify-prerendered/vue-ph'
import { ref, watch } from 'vue'
import Button from '../components/Button/Button.vue'
import Checkbox from '../components/Checkbox/Checkbox.vue'
import Flex from '../components/Flex/Flex.vue'
import Progress from '../components/Progress/Progress.vue'
import Spinner from '../components/Spinner/Spinner.vue'

const paused = ref(true)
const progress = ref(25)

const fakeProgress = ref(15)
const showFixed = ref(false)
const variants = ['s', 'm', 'l'] as const

watch(paused, () => fakeProgress.value = 0)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      <Flex y-center gap="m">
        Loading
        <Button square size="s" plain @click="paused = !paused">
          <IconPlay v-if="paused" />
          <IconPause v-else />
        </Button>
      </Flex>
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Spinners</th>
          <td>
            <Flex
              gap="l" :style="{
                'animation-play-state': 'paused',
              }"
            >
              <Spinner
                v-for="size in variants" :key="size" :size :style="{
                  'animation-play-state': paused ? 'paused' : 'running',
                }"
              />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Progress bar</th>
          <td class="w-80">
            <Flex gap="s" y-center>
              <Button square size="s" @click="progress -= 5">
                <IconMinus />
              </Button>
              <Progress v-model="progress" class="w-full" />
              <Button square size="s" @click="progress += 5">
                <IconPlus />
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Progress bar tall</th>
          <td class="w-80">
            <Flex gap="s" y-center>
              <Progress v-model="progress" :height="8" class="w-full" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Fake</th>
          <td>
            <Progress v-model="fakeProgress" :fake="!paused" />
          </td>
        </tr>
        <tr>
          <th>Fixed</th>
          <td>
            <Checkbox v-model="showFixed" label="Show fixed progress bar (look up)" />

            <Progress v-if="showFixed" v-model="fakeProgress" :fake="!paused" fixed />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
