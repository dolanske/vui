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
      <Divider />
      <p>Divider with a variable spacing. For instance 80px. This means there will be a gap of 40 pixels above and below the divider. Size serves a different purpose with vertical dividers, so to achieve the same thing, you could also set the margin to <code>40px 0</code></p>
      <Divider :size="80" />
      <p>Using margin. The default divider size is 32px, so we need to either set it to 0 or offset the provided margin.</p>
      <Divider margin="40px 0" />

      <p>Different thickness (you specify the number of pixels)</p>
      <Divider :thickness="5" :size="64" />
      <p class="mb-s">
        Vertical dividers. Here, size is the height of the divider. And if you want to add extra spacing between dividers, jsut set the margin to something like <code>0 16px</code>.
      </p>
      <Flex class="mb-xl">
        <span>One</span>
        <Divider vertical :size="16" />
        <span>Two</span>
        <Divider vertical :size="16" />
        <span>Three</span>
      </Flex>
      <p>Dividers also accept a slot. This is rendered in the center, overlaying the divider. For instance an icon or an avatar, but it can be any component.</p>
      <Divider size="80">
        <Avatar />
      </Divider>
    </div>
  </div>
</template>
