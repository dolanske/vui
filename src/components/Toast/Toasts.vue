<script setup lang="ts">
import { Teleport, TransitionGroup } from 'vue'
import Button from '../Button/Button.vue'
import { toasts } from './toast'
import './toast.scss'
</script>

<template>
  <Teleport to="body">
    <div class="vui-toast-wrapper">
      <TransitionGroup name="toast" tag="ul" class="vui-toast-list">
        <li v-for="[toastId, toast] in toasts" :key="toastId" class="vui-toast-item">
          <div class="vui-toast-item-content">
            <strong>{{ toast.title }}</strong>
            <p v-if="toast.description">
              {{ toast.description }}
            </p>
          </div>
          <Button v-if="toast.action" @click="toast.action.handler(toast.id)">
            {{ toast.action.label }}
          </Button>
        </li>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: var(--transition);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-24px) scale(0.95);
}

.toast-leave-active {
  position: absolute;
}
</style>
