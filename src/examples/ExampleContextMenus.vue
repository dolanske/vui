<script setup lang="ts">
import { IconArrowRight, IconCommand, IconTrash, IconUser } from '@iconify-prerendered/vue-ph'
import Badge from '../components/Badge/Badge.vue'
import Card from '../components/Card/Card.vue'
import ContextMenu from '../components/ContextMenu/ContextMenu.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import DropdownTitle from '../components/Dropdown/DropdownTitle.vue'
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
  </div>
</template>
