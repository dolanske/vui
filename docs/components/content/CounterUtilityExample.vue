<script setup lang="ts">
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="counter-examples">
        <p>
          Inbox <span class="counter">3</span>
        </p>
        <p>
          Notifications <span class="counter">12</span>
        </p>
        <p>
          New Messages <span class="counter">99+</span>
        </p>
        <div class="menu-item">
          <span>Settings</span>
          <span class="counter">2</span>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
.counter-examples {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.counter-examples p {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-xs) var(--space-s);
  background-color: var(--color-bg);
  border-radius: var(--border-radius-s);
  border: 1px solid var(--color-border);
}
</style>
