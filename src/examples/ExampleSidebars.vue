<script setup lang='ts'>
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import Avatar from '../components/Avatar/Avatar.vue'
import Button from '../components/Button/Button.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import Flex from '../components/Flex/Flex.vue'
import Grid from '../components/Grid/Grid.vue'
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Switch from '../components/Switch/Switch.vue'

const s1 = useStorage('sidebar-open', false)
const s1Mini = useStorage('sidebar-mini', true)

const s2 = ref(true)
const s3 = ref(true)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Sidebars
    </h3>

    <Grid :columns="2" gap="xl">
      <div>
        <span class="mb-m block">Base + slots</span>
        <div class="vui-sidebar-layout" :style="{ height: '512px' }">
          <Sidebar>
            <template #header>
              <Flex y-center>
                <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="">
                <h3>ABC</h3>
              </Flex>
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
              <Flex y-center>
                <Avatar size="m" />
                <span class="flex-1">dolanske</span>
                <Button plain size="s" icon="ph:sign-out" />
              </Flex>
            </template>
          </Sidebar>
          <main class="p-l typeset">
            <h4>My page</h4>
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
      </div>

      <div>
        <span class="mb-m block">Toggleable + floaty</span>
        <div class="vui-sidebar-layout" :style="{ height: '512px' }">
          <Sidebar v-model="s1" floaty>
            <template #header="{ close }">
              <Flex y-center>
                <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="">
                <h3 class="flex-1">
                  ABC
                </h3>
                <Button plain size="s" icon="ph:x" @click="close" />
              </Flex>
            </template>
            <DropdownItem icon="ph:house">
              Outside
            </DropdownItem>
            <DropdownItem icon="ph:user">
              About You
            </DropdownItem>
            <DropdownItem icon="ph:phone">
              No contact
            </DropdownItem>
          </Sidebar>
          <main class="p-l">
            <Flex y-center class="mb-m">
              <Button plain size="s" icon="ph:sidebar-simple" @click="s1 = !s1" />
              <h4>
                My page
              </h4>
            </Flex>

            <div class="typeset">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque deleniti asperiores quibusdam et commodi deserunt libero officia doloremque. Possimus ipsum sunt odit culpa consequatur hic reiciendis doloremque consequuntur tempore excepturi?</p>
              <hr>
              <p>Yes that's correct</p>
              <ul>
                <li>Secure</li>
                <li>Reliant</li>
                <li>Ublumf</li>
              </ul>
            </div>
          </main>
        </div>
      </div>

      <div>
        <Flex y-center x-star class="mb-m">
          <span class="block">Mini</span>
          <Switch v-model="s1Mini" />
        </Flex>
        <div class="vui-sidebar-layout" :style="{ height: '512px' }">
          <Sidebar v-model="s2" :mini="s1Mini">
            <template #header>
              <Flex y-center>
                <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="">
              </Flex>
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

            <template #footer="{ close }">
              <Flex x-center>
                <Button plain icon="ph:x" @click="close" />
              </Flex>
            </template>
          </Sidebar>
          <main class="p-l">
            <Flex y-center class="mb-m">
              <Button plain size="s" icon="ph:sidebar-simple" @click="s2 = !s2" />
              <h4>
                My page
              </h4>
            </Flex>

            <div class="typeset">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque deleniti asperiores quibusdam et commodi deserunt libero officia doloremque. Possimus ipsum sunt odit culpa consequatur hic reiciendis doloremque consequuntur tempore excepturi?</p>
              <hr>
              <p>Yes that's correct</p>
              <ul>
                <li>Secure</li>
                <li>Reliant</li>
                <li>Ublumf</li>
              </ul>
            </div>
          </main>
        </div>
      </div>

      <div>
        <span class="mb-m block">Mini & floaty </span>
        <div class="vui-sidebar-layout" :style="{ height: '512px' }">
          <Sidebar v-model="s3" mini floaty>
            <template #header>
              <Flex y-center>
                <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="">
              </Flex>
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

            <template #footer="{ close }">
              <Flex x-center>
                <Button plain icon="ph:x" @click="close" />
              </Flex>
            </template>
          </Sidebar>
          <main class="p-l">
            <Flex y-center class="mb-m">
              <Button plain size="s" icon="ph:sidebar-simple" @click="s3 = !s3" />
              <h4>
                My page
              </h4>
            </Flex>

            <div class="typeset">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque deleniti asperiores quibusdam et commodi deserunt libero officia doloremque. Possimus ipsum sunt odit culpa consequatur hic reiciendis doloremque consequuntur tempore excepturi?</p>
              <hr>
              <p>Yes that's correct</p>
              <ul>
                <li>Secure</li>
                <li>Reliant</li>
                <li>Ublumf</li>
              </ul>
            </div>
          </main>
        </div>
      </div>

      <div>
        <span class="mb-m block">Appear + custom width</span>
        <div class="vui-sidebar-layout" :style="{ height: '512px' }">
          <Sidebar appear :width="300">
            <template #header>
              <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="">
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
            <p>This sidebar will appear automatically whenever the curosor is close to the edge of the sidebar wrapper.</p>
          </main>
        </div>
      </div>

      <div>
        <span class="mb-m block">Appear + mini + floaty</span>
        <div class="vui-sidebar-layout" :style="{ height: '512px' }">
          <Sidebar appear mini floaty>
            <template #header>
              <img src="https://dolansky.dev/backgrounds/star.png" class="sidebar-logo" width="40" alt="">
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
            <p>This sidebar will appear automatically whenever the curosor is close to the edge of the sidebar wrapper.</p>
          </main>
        </div>
      </div>
    </Grid>
  </div>
</template>

<style scoped>
.vui-sidebar-layout {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-m);
  overflow: hidden;
}

html.dark {
  .sidebar-logo {
    filter: invert() !important;
  }
}
</style>
