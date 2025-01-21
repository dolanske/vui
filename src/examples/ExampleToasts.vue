<script setup lang="ts">
import Button from '../components/Button/Button.vue'
import { pushToast, removeToast } from '../components/Toast/toast'
import Toasts from '../components/Toast/Toasts.vue'
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
      </tbody>
    </table>
    <Toasts />
  </div>
</template>
