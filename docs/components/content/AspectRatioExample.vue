<script setup lang="ts">
import { AspectRatio, Flex } from '@dolanske/vui'
</script>

<template>
  <DocsExample>
    <template #component>
      <Flex gap="l" column>
        <AspectRatio :ratio="16 / 9">
          <img src="https://www.dropbox.com/scl/fi/1p7hn45t06di5oc9q8i3k/DSCF8128.JPG?rlkey=d1haqywuvo4h3tz8qqbdwh4ti&st=pwwqgy1n&raw=1" alt="16 / 9">
        </AspectRatio>
      </Flex>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>
