<script setup lang="ts">
import { Button, Sidebar } from '@dolanske/vui'
import { ref } from 'vue'

const isOpen = ref(true)
const isMini = ref(false)
const isAppear = ref(false)
const isFloaty = ref(false)

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function toggleMini() {
  isMini.value = !isMini.value
}

function toggleAppear() {
  isAppear.value = !isAppear.value
  if (isAppear.value) {
    isOpen.value = false
  }
}

function toggleFloaty() {
  isFloaty.value = !isFloaty.value
}
</script>

<template>
  <DocsExample>
    <template #component>
      <div class="flex flex-col gap-md">
        <!-- Controls -->
        <div class="flex gap-sm">
          <Button @click="toggleSidebar">
            {{ isOpen ? 'Close' : 'Open' }} Sidebar
          </Button>
          <Button @click="toggleMini">
            {{ isMini ? 'Full' : 'Mini' }} Mode
          </Button>
          <Button @click="toggleAppear">
            {{ isAppear ? 'Disable' : 'Enable' }} Hover
          </Button>
          <Button @click="toggleFloaty">
            {{ isFloaty ? 'Disable' : 'Enable' }} Floaty
          </Button>
        </div>

        <!-- Sidebar -->
        <div class="relative h-[400px] border border-gray-200 rounded-lg">
          <Sidebar
            v-model="isOpen"
            :mini="isMini"
            :appear="isAppear"
            :floaty="isFloaty"
          >
            <template #header>
              <div class="p-md">
                <h2 class="text-lg font-semibold">
                  {{ isMini ? 'VUI' : 'Vue UI Library' }}
                </h2>
              </div>
            </template>

            <div class="p-md">
              <nav>
                <ul class="space-y-sm">
                  <li class="flex items-center gap-sm">
                    <span>🏠</span>
                    <span v-if="!isMini">Home</span>
                  </li>
                  <li class="flex items-center gap-sm">
                    <span>📝</span>
                    <span v-if="!isMini">Documents</span>
                  </li>
                  <li class="flex items-center gap-sm">
                    <span>⚙️</span>
                    <span v-if="!isMini">Settings</span>
                  </li>
                  <li class="flex items-center gap-sm">
                    <span>👤</span>
                    <span v-if="!isMini">Profile</span>
                  </li>
                </ul>
              </nav>
            </div>

            <template #footer>
              <div class="p-md">
                <p class="text-sm text-gray-500">
                  {{ isMini ? '© 2024' : '© 2024 Vue UI Library' }}
                </p>
              </div>
            </template>
          </Sidebar>
        </div>
      </div>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
