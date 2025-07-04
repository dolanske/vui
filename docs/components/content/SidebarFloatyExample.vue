<script setup lang="ts">
import { DropdownItem, Sidebar } from '@dolanske/vui'
</script>

<template>
  <DocsExample full>
    <template #component>
      <div class="vui-sidebar-layout" :style="{ height: '420px' }">
        <Sidebar appear :width="128" floaty>
          <template #header>
            <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="" style="filter: invert(1);">
          </template>
          <DropdownItem icon="ph:house">
            Home
          </DropdownItem>
          <DropdownItem icon="ph:user">
            About
          </DropdownItem>
          <DropdownItem icon="ph:phone">
            Contact
          </DropdownItem>
        </Sidebar>
        <main class="p-l typeset">
          <h4>
            Appear sidebar
          </h4>
          <p>This sidebar will appear automatically whenever the curosor is close to the edge of the sidebar wrapper on the left side.</p>

          <p>The sidebar uses the following configurations:</p>
          <ul>
            <li>
              <code>appear</code> - The sidebar will appear automatically whenever the curosor is close to the edge of the sidebar wrapper.
            </li>
            <li>
              <code>floaty</code> - The sidebar will float over the main content.
            </li>
            <li>
              <code>width</code> - The width of the sidebar in pixels when in full mode.
            </li>
          </ul>
        </main>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
