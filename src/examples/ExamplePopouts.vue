<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Button from '../components/Button/Button.vue'
import Flex from '../components/Flex/Flex.vue'
import Popout from '../components/Popout/Popout.vue'

const anchRef = useTemplateRef('anch')
const open = ref(false)
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
  </div>
</template>

<style>
.test-popout {
  max-width: 256px;
  padding: var(--space-xl);
}
</style>
