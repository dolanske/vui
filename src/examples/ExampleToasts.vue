<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'
import type { ToastVariant } from '../components/Toast/toast'
import { defineComponent, h, markRaw, ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Select from '../components/Select/Select.vue'
import { pushToast, removeToast, toasts, updateToast } from '../components/Toast/toast'
import Toasts from '../components/Toast/Toasts.vue'

const testBody = markRaw(defineComponent((props) => {
  return () => h('h2', `${props.data.title} ${props.toastId}`)
}, {
  props: {
    data: Object,
    toastId: Number,
  },
}))

const variants: ToastVariant[] = ['neutral', 'info', 'success', 'warning', 'danger']

const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'].map(value => ({ value, label: value }))
const placement = ref([placements[5]])
const max = ref([{ value: 5, label: '5' }])
const maxOptions = [1, 3, 5, 10].map(value => ({ value, label: String(value) }))

function pushUpload() {
  const toast = pushToast('Uploading file...', { persist: true, dismissible: false, description: '0%' })
  let progress = 0
  const interval = setInterval(() => {
    progress += 20
    if (progress >= 100) {
      clearInterval(interval)
      updateToast(toast.id, { title: 'Upload complete', description: 'photo.jpg was uploaded', variant: 'success', persist: false, dismissible: true })
      return
    }
    updateToast(toast.id, { description: `${progress}%` })
  }, 600)
}

function clearAll() {
  for (const id of [...toasts.value.keys()])
    removeToast(id)
}
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Toasts
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Container settings</th>
          <td>
            <Flex gap="s" y-end>
              <Select v-model="placement" :options="placements" label="Placement" style="width: 160px" />
              <Select v-model="max" :options="maxOptions" label="Max visible" style="width: 120px" />
              <Button @click="clearAll">
                Clear all ({{ toasts.size }})
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Base</th>
          <td>
            <Button @click="pushToast('Hello')">
              Push toast
            </Button>
          </td>
        </tr>
        <tr>
          <th>+ Description</th>
          <td>
            <Button @click="pushToast('Hello', { description: 'Lorem ipsum dolor sit amet and others stuff but I never learned it past that.' })">
              Push toast
            </Button>
          </td>
        </tr>
        <tr>
          <th>Variants</th>
          <td>
            <Flex gap="s" wrap>
              <Button v-for="variant in variants" :key="variant" @click="pushToast(`A ${variant} toast`, { variant, description: 'Something happened.' })">
                {{ variant }}
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>+ Action</th>
          <td>
            <Flex gap="s">
              <Button @click="pushToast('Message archived', { action: { label: 'Undo', handler: () => pushToast('Restored', { variant: 'success' }) } })">
                Dismisses on action
              </Button>
              <Button @click="pushToast('Message archived', { action: { label: 'Log', keepOpen: true, handler: id => pushToast(`Action of toast ${id}`) } })">
                Keeps open
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Persist, not dismissible</th>
          <td>
            <Flex gap="s">
              <Button
                @click="pushToast('Read the description!!', {
                  description: 'This toast stays up until you close it. It persists!!',
                  persist: true,
                })"
              >
                Persistent
              </Button>
              <Button
                @click="pushToast('Must use the action', {
                  persist: true,
                  dismissible: false,
                  action: { label: 'Got it', handler: () => {} },
                })"
              >
                Persistent, no close button
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Timeout</th>
          <td>
            <Flex gap="s">
              <Button @click="pushToast('Gone in a second', { timeout: 1000 })">
                1 second
              </Button>
              <Button @click="pushToast('Ten seconds', { timeout: 10000 })">
                10 seconds
              </Button>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Update a toast</th>
          <td>
            <Button @click="pushUpload">
              Simulate upload
            </Button>
          </td>
        </tr>
        <tr>
          <th>Many at once</th>
          <td>
            <Button @click="() => { for (let i = 1; i <= 8; i++) pushToast(`Toast ${i}`) }">
              Push 8 toasts
            </Button>
          </td>
        </tr>
        <tr>
          <th>Long content</th>
          <td>
            <Button @click="pushToast('A rather long title which should wrap nicely onto multiple lines in the toast', { description: 'And an even longer description. '.repeat(6) })">
              Push toast
            </Button>
          </td>
        </tr>
        <tr>
          <th>Custom body</th>
          <td>
            <Button
              @click="pushToast('uhhh', {
                bodyProps: {
                  title: 'Bro im a custom component and my id is',
                },
                body: testBody,
              })"
            >
              Push toast
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
    <Toasts :placement="placement?.[0]?.value as Placement" :max="max?.[0]?.value" />
  </div>
</template>
