<script setup lang="ts">
import { IconCircle, IconCircleFill } from '@iconify-prerendered/vue-ph'
import { ref, useTemplateRef } from 'vue'
import Avatar from '../components/Avatar/Avatar.vue'
import Badge from '../components/Badge/Badge.vue'
import Button from '../components/Button/Button.vue'
import Divider from '../components/Divider/Divider.vue'
import Dropdown from '../components/Dropdown/Dropdown.vue'
import DropdownItem from '../components/Dropdown/DropdownItem.vue'
import Flex from '../components/Flex/Flex.vue'
import Modal from '../components/Modal/Modal.vue'
import Popout from '../components/Popout/Popout.vue'
import PopoutHover from '../components/Popout/PopoutHover.vue'
import Tooltip from '../components/Tooltip/Tooltip.vue'

const anchRef = useTemplateRef('anch')
const open = ref(false)
const anchDelayRef = useTemplateRef('anchDelay')
const openDelay = ref(false)

// Layer ordering demos
const layerPopoutAnchorRef = useTemplateRef('layerPopoutAnchor')
const layerPopoutOpen = ref(false)
const layerModalOpen = ref(false)

const tooltipModalOpen = ref(false)

const stackedModal1Open = ref(false)
const stackedModal2Open = ref(false)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Popout hover
    </h3>

    <p>Similarly to tooltip, popout can be triggered by hover events and allow interacting with content inside</p>

    <PopoutHover class="test-popout">
      <template #trigger>
        <Badge variant="success">
          <IconCircleFill size="12px" />
          Online
        </Badge>
      </template>
      <Flex y-start>
        <Avatar size="l" url="https://github.com/dolanske.png" />
        <div>
          <span class="text-bold text-l block mb-xxs">dolanske</span>
          <p class="block mb-s">
            Lorem ipsum dolor sit!!
          </p>

          <Button size="s" variant="danger">
            Delete
          </Button>
        </div>
      </Flex>
      <!-- <h3>Popout hover content</h3> -->
      <!-- <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem facere eligendi ex, alias itaque molestiae, vero animi, vitae vel fuga corporis aut consectetur temporibus ipsum placeat dolores perferendis. Deleniti, et!</p> -->
    </PopoutHover>

    <Divider class="mt-l" />

    <h3 class="mb-l mt-xl">
      Popout
    </h3>

    <p class="mb-l">
      Popout is a simpler version of dropdown. By default, it only provides functionality to float an element to the anchor. It is up to the developer to style it and set its placement / offset. Both dropdown & tooltip use the popout base.
    </p>

    <Flex>
      <Button ref="anch" class="mb-xxs" @click="open = !open">
        Open popout
      </Button>
      <p class="text-s text-color-light w-50">
        This popout has offset of <code>32</code> and its placement is <code>bottom-start</code>. It also has an attached event to <code>clickOutside</code> which is fired when user clicks outside of the popout. In that case, we manually close it.
      </p>
    </Flex>
    <Popout :visible="open" :anchor="anchRef" class="test-popout" :offset="32" placement="bottom-start" @click-outside="open = false">
      <h3>Popout content</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem facere eligendi ex, alias itaque molestiae, vero animi, vitae vel fuga corporis aut consectetur temporibus ipsum placeat dolores perferendis. Deleniti, et!</p>
    </Popout>

    <Divider class="mt-l" />

    <h4 class="mt-xl mb-m">
      With enter &amp; leave delay
    </h4>
    <Flex>
      <Button ref="anchDelay" class="mb-xxs" @click="openDelay = !openDelay">
        Open popout (300ms open / 600ms close)
      </Button>
    </Flex>
    <Popout :visible="openDelay" :anchor="anchDelayRef" class="test-popout" placement="bottom-start" :enter-delay="300" :leave-delay="600" @click-outside="openDelay = false">
      <h3>Delayed popout</h3>
      <p>This popout opens after 300ms and closes after 600ms.</p>
    </Popout>

    <Divider class="mt-l" />

    <h4 class="mt-xl mb-s">
      Layer ordering — Popout then Modal
    </h4>
    <p class="mb-m text-s text-color-light">
      Open the popout first, then open the modal. The modal must stack <strong>above</strong> the popout even though the popout was opened first. Both use the layer manager, so open order determines z-index.
    </p>
    <Flex align="center">
      <Button ref="layerPopoutAnchor" @click="layerPopoutOpen = !layerPopoutOpen">
        {{ layerPopoutOpen ? 'Close popout' : 'Open popout' }}
      </Button>
      <Button @click="layerModalOpen = true">
        Open modal on top
      </Button>
    </Flex>
    <Popout :visible="layerPopoutOpen" :anchor="layerPopoutAnchorRef" class="test-popout" placement="bottom-start" @click-outside="layerPopoutOpen = false">
      <p>I was opened first — the modal should still appear above me.</p>
    </Popout>
    <Modal :open="layerModalOpen" transition-name="none" @close="layerModalOpen = false">
      <template #header>
        <h4>Modal opened after the popout</h4>
      </template>
      <p>This modal was opened <em>after</em> the popout. Thanks to the layer manager it received a higher z-index and correctly sits on top.</p>
      <template #footer="{ close }">
        <Button @click="close">
          Close
        </Button>
      </template>
    </Modal>

    <Divider class="mt-l" />

    <h4 class="mt-xl mb-s">
      Tooltip inside a Modal — no overflow or scrollbar
    </h4>
    <p class="mb-m text-s text-color-light">
      Previously, hovering a tooltip near the edge of a modal caused a horizontal scrollbar. The backdrop's implicit <code>overflow-x</code> is now <code>hidden</code> and the popout teleports to <code>body</code>, so it renders outside the modal's bounds without clipping or scrollbars.
    </p>
    <Button @click="tooltipModalOpen = true">
      Open modal with tooltips
    </Button>
    <Modal :open="tooltipModalOpen" transition-name="none" @close="tooltipModalOpen = false">
      <template #header>
        <h4>Tooltips inside a Modal</h4>
      </template>
      <Flex gap="l" wrap>
        <Tooltip placement="top">
          <Button>Hover — tooltip top</Button>
          <template #tooltip>
            Floats above the modal card with no scrollbar
          </template>
        </Tooltip>
        <Tooltip placement="bottom">
          <Button>Hover — tooltip bottom</Button>
          <template #tooltip>
            Floats below the modal card with no scrollbar
          </template>
        </Tooltip>
        <Dropdown>
          <template #trigger="{ toggle }">
            <Button @click="toggle">
              Dropdown inside modal
            </Button>
          </template>
          <DropdownItem>Option A</DropdownItem>
          <DropdownItem>Option B</DropdownItem>
          <DropdownItem>Option C</DropdownItem>
        </Dropdown>
      </Flex>
      <template #footer="{ close }">
        <Button @click="close">
          Close
        </Button>
      </template>
    </Modal>

    <Divider class="mt-l" />

    <h4 class="mt-xl mb-s">
      Stacked Modals
    </h4>
    <p class="mb-m text-s text-color-light">
      Opening a second modal from inside the first should always place it on top. Each modal's backdrop claims the next available layer index on mount.
    </p>
    <Button @click="stackedModal1Open = true">
      Open Modal 1
    </Button>
    <Modal :open="stackedModal1Open" transition-name="none" @close="stackedModal1Open = false">
      <template #header>
        <h4>Modal 1 (first opened)</h4>
      </template>
      <p>Open Modal 2 from here — it should appear on top.</p>
      <template #footer>
        <Button @click="stackedModal2Open = true">
          Open Modal 2 on top
        </Button>
      </template>
    </Modal>
    <Modal :open="stackedModal2Open" transition-name="none" @close="stackedModal2Open = false">
      <template #header>
        <h4>Modal 2 (second opened)</h4>
      </template>
      <p>I was opened after Modal 1 and correctly sit above it.</p>
      <template #footer="{ close }">
        <Button @click="close">
          Close Modal 2
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style>
.test-popout {
  max-width: 256px;
  padding: var(--space-m);
}
</style>
