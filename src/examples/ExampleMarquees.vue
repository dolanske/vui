<script setup lang='ts'>
import Badge from '../components/Badge/Badge.vue'
import Flex from '../components/Flex/Flex.vue'
import Marquee from '../components/Marquee/Marquee.vue'

const tags = ['Vue', 'TypeScript', 'Vite', 'Sass', 'Floating UI', 'VueUse', 'Vitest', 'Accessibility']
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Marquees
    </h3>
    <table style="table-layout: fixed;">
      <tbody>
        <tr>
          <th>Left, fast</th>
          <td>
            <Marquee direction="left" :speed="70">
              <span class="big">Scrolling Left - Fast and Seamless -</span>
            </Marquee>
          </td>
        </tr>
        <tr>
          <th>Right, slow</th>
          <td>
            <Marquee direction="right" :speed="40">
              <span class="big">Scrolling Right - Smooth and Infinite -</span>
            </Marquee>
          </td>
        </tr>
        <tr>
          <th>Stagger</th>
          <td>
            <Marquee :speed="30" stagger>
              <span class="big">Slow Left Scroll - Staggered -</span>
            </Marquee>
          </td>
        </tr>
        <tr>
          <th>Pauses on hover <br> Default</th>
          <td>
            <Marquee :speed="50">
              <Flex gap="s" class="pr-s">
                <Badge v-for="tag in tags" :key="tag">
                  {{ tag }}
                </Badge>
              </Flex>
            </Marquee>
          </td>
        </tr>
        <tr>
          <th>Does not pause on hover</th>
          <td>
            <Marquee :speed="50" :pause-on-hover="false">
              <Flex gap="s" class="pr-s">
                <Badge v-for="tag in tags" :key="tag" variant="accent">
                  {{ tag }}
                </Badge>
              </Flex>
            </Marquee>
          </td>
        </tr>
        <tr>
          <th>Content shorter than the container</th>
          <td>
            <Marquee :speed="40">
              <span class="pr-l">Short</span>
            </Marquee>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.big {
  font-size: 48px;
  line-height: 48px;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 2rem;
}
</style>
