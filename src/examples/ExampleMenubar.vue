<script setup lang="ts">
import Button from '../components/Button/Button.vue'
import Card from '../components/Card/Card.vue'
import Divider from '../components/Divider/Divider.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import Menubar from '../components/Menubar/Menubar.vue'
import MenuItem from '../components/Menubar/MenuItem.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Menubar
    </h3>

    <Card centered>
      <Menubar>
        <MenuItem>
          <Button plain size="s">
            File
          </Button>
          <template #menu>
            <div class="vui-dropdown">
              <DropdownItem size="s">
                New File
              </DropdownItem>
              <DropdownItem size="s">
                Save As
              </DropdownItem>
              <Divider class="my-xxxs" />
              <DropdownItem size="s">
                Exit
              </DropdownItem>
            </div>
          </template>
        </MenuItem>
        <MenuItem>
          <Button plain size="s">
            View
          </Button>
          <template #menu>
            <div class="vui-dropdown">
              <DropdownItem size="s">
                Full screen
              </DropdownItem>
              <DropdownItem size="s">
                Hide sidebar
              </DropdownItem>
              <Divider class="my-xxxs" />
              <DropdownItem size="s">
                Exit
              </DropdownItem>
            </div>
          </template>
        </MenuItem>
        <MenuItem>
          <Button plain size="s">
            Help
          </Button>
          <template #menu>
            <div class="vui-dropdown">
              <DropdownItem size="s">
                Open Documentation
              </DropdownItem>
              <DropdownItem size="s">
                Call Support
              </DropdownItem>
              <DropdownItem size="s">
                Give Up
              </DropdownItem>
            </div>
          </template>
        </MenuItem>
      </Menubar>
    </Card>
  </div>
</template>
