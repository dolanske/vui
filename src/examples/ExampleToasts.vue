<script setup lang="ts">
import { defineComponent, h, markRaw } from 'vue'
import Button from '../components/Button/Button.vue'
import { pushToast, removeToast } from '../components/Toast/toast'
import Toasts from '../components/Toast/Toasts.vue'

const testBody = markRaw(defineComponent((props) => {
  return () => h('h2', `${props.data.title} ${props.toastId}`)
}, {
  props: {
    data: Object,
    toastId: Number,
  },
}))
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Toasts
    </h3>

    <table>
      <tbody>
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
          <th>+ Action</th>
          <td>
            <Button
              @click="pushToast('Hello', {
                action: {
                  label: 'Close',
                  handler: (id) => {
                    removeToast(id)
                  },
                },
              })"
            >
              Push toast
            </Button>
          </td>
        </tr>
        <tr>
          <th>+ persist</th>
          <td>
            <Button
              @click="pushToast('Read the description!!', {
                description: 'So when you add an action, the handler exposes the ID of the toast. And you can then manually remove it. This toast will also stay up until you close it. It persists!!',
                action: {
                  label: 'Close',
                  handler: (id) => {
                    removeToast(id)
                  },
                },
                persist: true,
              })"
            >
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
    <Toasts />
  </div>
</template>
