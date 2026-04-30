<script setup lang="ts">
import { ref } from 'vue'
import Avatar from './components/Avatar/Avatar.vue'
import Button from './components/Button/Button.vue'
import Card from './components/Card/Card.vue'
import Flex from './components/Flex/Flex.vue'
import Modal from './components/Modal/Modal.vue'
import ExampleAvatars from './examples/ExampleAvatars.vue'
import { setColorTheme } from './shared/theme'
import { useViewTransition } from './shared/viewTransition'

setColorTheme('light')

const profileOpen = ref(false)
const { isRunning, startTransition } = useViewTransition()

function openProfile() {
  startTransition(() => {
    profileOpen.value = true
  })
}

function closeProfile() {
  startTransition(() => {
    profileOpen.value = false
  })
}
</script>

<template>
  <main vaul-drawer-wrapper class="container-l">
    <div class="container container-m pt-xxl">
      <Card class="profile-preview" @click="openProfile">
        <Flex y-start gap="m">
          <Avatar
            :size="48"
            url="https://github.com/dolanske.png"
            alt="dolanske"
            :style="{ viewTransitionName: profileOpen ? 'none' : 'profile-avatar' }"
          />
          <div>
            <strong :style="{ viewTransitionName: profileOpen ? 'none' : 'profile-name' }">dolanske</strong>
            <p class="text-color-lighter" :style="{ viewTransitionName: profileOpen ? 'none' : 'profile-description' }">
              Building and documenting VUI components with a focus on clean APIs, accessibility, and expressive UI details.
            </p>
          </div>
        </Flex>
      </Card>

      <Modal
        :open="profileOpen"
        :card="{ separators: true }"
        :transition-name="isRunning ? 'none' : 'modal'"
        @close="closeProfile"
      >
        <template #header>
          <Flex y-start gap="m">
            <Avatar
              :size="88"
              url="https://github.com/dolanske.png"
              alt="dolanske"
              :style="{ viewTransitionName: profileOpen ? 'profile-avatar' : 'none' }"
            />
            <div>
              <h2 class="mb-xs" :style="{ viewTransitionName: profileOpen ? 'profile-name' : 'none' }">
                dolanske
              </h2>
              <p class="text-color-lighter">
                Frontend engineer
              </p>
            </div>
          </Flex>
        </template>

        <p :style="{ viewTransitionName: profileOpen ? 'profile-description' : 'none' }">
          Building and documenting VUI components with a focus on clean APIs, accessibility, and expressive UI details.
        </p>

        <template #footer>
          <Button @click="closeProfile">
            Close profile
          </Button>
        </template>
      </Modal>
    </div>

    <ExampleAvatars />
  </main>
</template>

<style>
.profile-preview {
  max-width: 420px;
  cursor: pointer;
}

::view-transition-old(profile-avatar),
::view-transition-new(profile-avatar),
::view-transition-old(profile-description),
::view-transition-new(profile-description),
::view-transition-old(profile-name),
::view-transition-new(profile-name) {
  animation-duration: 220ms;
}
</style>
