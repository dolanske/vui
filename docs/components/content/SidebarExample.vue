<script setup lang="ts">
import { Button, DropdownItem, Flex, Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
  <DocsExample full>
    <template #component>
      <div class="vui-sidebar-layout" :style="{ height: '456px' }">
        <Sidebar :mini="!isOpen">
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
          <template #footer>
            <Flex y-center x-centerd>
              <Avatar v-show="isOpen" size="m" />
              <span v-show="isOpen" class="flex-1">dolanske</span>
              <Button plain size="s" icon="ph:sign-out" />
            </Flex>
          </template>
        </Sidebar>
        <main class="p-xl">
          <Flex y-center class="mb-l">
            <Button plain size="s" icon="ph:sidebar-simple" @click="isOpen = !isOpen" />
            <h4 style="margin: 0;">
              My page
            </h4>
          </Flex>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque deleniti asperiores quibusdam et commodi deserunt libero officia doloremque. Possimus ipsum sunt odit culpa consequatur hic reiciendis doloremque consequuntur tempore excepturi?</p>
          <hr>
          <p>Yes that's correct</p>
          <ul>
            <li>Secure</li>
            <li>Reliant</li>
            <li>Ublumf</li>
          </ul>
        </main>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
