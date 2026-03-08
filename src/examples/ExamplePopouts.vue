<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Popout from '../components/Popout/Popout.vue'

const anchRef = useTemplateRef('anch')
const open = ref(false)
const anchDelayRef = useTemplateRef('anchDelay')
const openDelay = ref(false)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
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
  </div>
</template>

<style>
.test-popout {
  max-width: 256px;
  padding: var(--space-xl);
}
</style>
