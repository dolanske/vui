<script setup lang="ts">
import { IconArrowRight, IconCommand, IconTrash, IconUser } from '@iconify-prerendered/vue-ph'
import { ref } from 'vue'
import Badge from '../components/Badge/Badge.vue'
import Button from '../components/Button/Button.vue'
import Card from '../components/Card/Card.vue'
import Checkbox from '../components/Checkbox/Checkbox.vue'
import ContextMenu from '../components/ContextMenu/ContextMenu.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import DropdownTitle from '../components/Dropdown/DropdownTitle.vue'
import Grid from '../components/Grid/Grid.vue'
import Modal from '../components/Modal/Modal.vue'

const disabled = ref(true)
const modalOpen = ref(false)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Context menu
    </h3>

    <ContextMenu>
      <Card separators>
        <template #header>
          <h4>Right click</h4>
          <p>You can right click anywhere on this card to get a specific set of controls</p>
        </template>

        <template #header-end>
          <Badge variant="accent">
            New Feature!
          </Badge>
        </template>

        <p class="mb-m text-color-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sint eum delectus facere! Corporis, incidunt, commodi minima quo, tempore maxime asperiores architecto id qui laboriosam ab ea! Dignissimos, voluptates exercitationem.
        </p>

        <p class="text-color-light">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit cum eaque similique perspiciatis beatae animi nobis neque dolorum porro tenetur doloremque et deserunt assumenda optio ex soluta, odit sint dignissimos!
        </p>
      </Card>
      <template #menu>
        <div class="p-xxs">
          <DropdownTitle>
            Actions
            <template #end>
              3
            </template>
          </DropdownTitle>
          <DropdownItem>
            <template #icon>
              <IconUser />
            </template>
            New user
            <template #hint>
              <IconCommand />
              + C
            </template>
          </DropdownItem>
          <DropdownItem>
            <template #icon>
              <IconArrowRight />
            </template>
            Update
          </DropdownItem>
          <DropdownItem>
            <template #icon>
              <IconTrash />
            </template>
            Delete
          </DropdownItem>
        </div>
      </template>
    </ContextMenu>

    <ContextMenu class="mt-l">
      <Card separators>
        <template #header>
          <h4>Right click</h4>
          <p>You can right click anywhere on this card to get a specific set of controls</p>
        </template>

        <template #header-end>
          <Badge variant="accent">
            New Feature!
          </Badge>
        </template>

        <p class="mb-m text-color-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sint eum delectus facere! Corporis, incidunt, commodi minima quo, tempore maxime asperiores architecto id qui laboriosam ab ea! Dignissimos, voluptates exercitationem.
        </p>

        <p class="text-color-light">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit cum eaque similique perspiciatis beatae animi nobis neque dolorum porro tenetur doloremque et deserunt assumenda optio ex soluta, odit sint dignissimos!
        </p>
      </Card>
      <template #menu>
        <div class="p-xxs">
          <DropdownTitle>
            Actions
            <template #end>
              3
            </template>
          </DropdownTitle>
          <DropdownItem>
            <template #icon>
              <IconUser />
            </template>
            New user
            <template #hint>
              <IconCommand />
              + C
            </template>
          </DropdownItem>
          <DropdownItem>
            <template #icon>
              <IconArrowRight />
            </template>
            Update
          </DropdownItem>
          <DropdownItem>
            <template #icon>
              <IconTrash />
            </template>
            Delete
          </DropdownItem>
        </div>
      </template>
    </ContextMenu>

    <Grid :columns="2" gap="m" class="mt-l">
      <ContextMenu>
        <Card class="h-100">
          <h4>Nested context menus</h4>
          <p class="mb-m">
            Right clicking the inner area only opens the inner menu.
          </p>
          <ContextMenu>
            <div class="inner-target">
              Inner area
            </div>
            <template #menu>
              <DropdownTitle>Inner menu</DropdownTitle>
              <DropdownItem>Inner action</DropdownItem>
            </template>
          </ContextMenu>
        </Card>
        <template #menu>
          <DropdownTitle>Outer menu</DropdownTitle>
          <DropdownItem>Outer action</DropdownItem>
        </template>
      </ContextMenu>

      <Card>
        <h4>Disabled</h4>
        <p class="mb-m">
          The native browser menu opens instead.
        </p>
        <Checkbox v-model="disabled" label="Disable the context menu" class="mb-s" />
        <ContextMenu :disabled>
          <div class="inner-target">
            Right click me
          </div>
          <template #menu>
            <DropdownItem>Action</DropdownItem>
          </template>
        </ContextMenu>
      </Card>

      <Card>
        <h4>Inside a modal</h4>
        <p class="mb-m">
          Escape closes only the menu, then the modal.
        </p>
        <Button @click="modalOpen = true">
          Open modal
        </Button>
        <Modal v-model:open="modalOpen">
          <template #header>
            <h3>Modal</h3>
          </template>
          <ContextMenu>
            <div class="inner-target">
              Right click inside the modal
            </div>
            <template #menu>
              <DropdownItem>Copy</DropdownItem>
              <DropdownItem>Paste</DropdownItem>
            </template>
          </ContextMenu>
        </Modal>
      </Card>

      <Card>
        <h4>Long press</h4>
        <p class="mb-m">
          On touch devices, press and hold for 300ms.
        </p>
        <ContextMenu :long-press-delay="300">
          <div class="inner-target">
            Press and hold
          </div>
          <template #menu>
            <DropdownItem>Share</DropdownItem>
            <DropdownItem disabled>
              Disabled item
            </DropdownItem>
          </template>
        </ContextMenu>
      </Card>
    </Grid>
  </div>
</template>

<style scoped>
.inner-target {
  padding: var(--space-l);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--border-radius-m);
  text-align: center;
}
</style>
