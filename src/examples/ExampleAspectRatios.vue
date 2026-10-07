<script setup lang='ts'>
import AspectRatio from '../components/AspectRatio/AspectRatio.vue'
import Grid from '../components/Grid/Grid.vue'

const image = 'https://www.dropbox.com/scl/fi/1p7hn45t06di5oc9q8i3k/DSCF8128.JPG?rlkey=d1haqywuvo4h3tz8qqbdwh4ti&st=pwwqgy1n&raw=1'
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Aspect ratio
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Images</th>
          <td>
            <Grid :columns="3" gap="m">
              <AspectRatio :ratio="16 / 9">
                <strong class="title">16 / 9</strong>
                <img :src="image" alt="">
              </AspectRatio>
              <AspectRatio :ratio="1">
                <strong class="title">1 / 1</strong>
                <img :src="image" alt="">
              </AspectRatio>
              <AspectRatio :ratio="9 / 16">
                <strong class="title">9 / 16</strong>
                <img :src="image" alt="">
              </AspectRatio>
            </Grid>
          </td>
        </tr>
        <tr>
          <th>Any content</th>
          <td>
            <Grid :columns="2" gap="m">
              <AspectRatio :ratio="4 / 3" class="box">
                <span>4 / 3 box</span>
              </AspectRatio>
              <AspectRatio :ratio="21 / 9" class="box">
                <span>21 / 9 box</span>
              </AspectRatio>
            </Grid>
          </td>
        </tr>
        <tr>
          <th>Invalid ratios <br> Fall back to 1 / 1</th>
          <td>
            <Grid :columns="3" gap="m">
              <AspectRatio :ratio="0" class="box">
                <span>0</span>
              </AspectRatio>
              <AspectRatio :ratio="-2" class="box">
                <span>-2</span>
              </AspectRatio>
              <AspectRatio :ratio="Number.NaN" class="box">
                <span>NaN</span>
              </AspectRatio>
            </Grid>
          </td>
        </tr>
      </tbody>
    </table>
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

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-m);
}
</style>
