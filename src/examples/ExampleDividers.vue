<script setup lang='ts'>
import Avatar from '../components/Avatar/Avatar.vue'
import Divider from '../components/Divider/Divider.vue'
import Flex from '../components/Flex/Flex.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Dividers
    </h3>

    <div class="container container-s">
      <p>Standard divider</p>
      <Divider class="my-l" />
      <Flex class="mb-xl" y-center expand x-between>
        <span>One</span>
        <Divider vertical height="16px" />
        <span>Two</span>
        <Divider vertical height="32px" :size="8" />
        <span>Three</span>
      </Flex>
      <p>Dividers also accept a slot. This is rendered in the center, overlaying the divider. For instance an icon or an avatar, but it can be any component.</p>
      <Divider class="my-l">
        <Avatar />
      </Divider>
    </div>
  </div>
</template>
