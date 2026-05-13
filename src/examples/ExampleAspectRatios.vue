<script setup lang="ts">
import AspectRatio from '../components/AspectRatio/AspectRatio.vue'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Aspect ratio
    </h3>

    <div class="container-xs">
      <AspectRatio :ratio="16 / 9" class="mb-l">
        <strong class="title">16 / 9</strong>
        <img src="https://www.dropbox.com/scl/fi/1p7hn45t06di5oc9q8i3k/DSCF8128.JPG?rlkey=d1haqywuvo4h3tz8qqbdwh4ti&st=pwwqgy1n&raw=1" alt="">
      </AspectRatio>

      <AspectRatio :ratio="1" class="mb-l">
        <strong class="title">1 / 1</strong>
        <img src="https://www.dropbox.com/scl/fi/1p7hn45t06di5oc9q8i3k/DSCF8128.JPG?rlkey=d1haqywuvo4h3tz8qqbdwh4ti&st=pwwqgy1n&raw=1" alt="">
      </AspectRatio>

      <AspectRatio :ratio="9 / 16" class="mb-l">
        <strong class="title">9 / 16</strong>
        <img src="https://www.dropbox.com/scl/fi/1p7hn45t06di5oc9q8i3k/DSCF8128.JPG?rlkey=d1haqywuvo4h3tz8qqbdwh4ti&st=pwwqgy1n&raw=1" alt="">
      </AspectRatio>
    </div>
  </div>
</template>

<style scoped>
.title {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-semibold);
}

img {
  object-fit: cover;
  object-position: center;
}
</style>
