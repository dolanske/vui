<script setup lang="ts">
import { Badge, Button, Card, CopyClipboard, Grid } from '@dolanske/vui'
import TokenItem from '~/components/docs/TokenItem.vue'
import { fontSizeClasses, fontWeightClasses, lineHeightTokens } from '~/utils/constants'
</script>

<template>
  <div>
    <h1>Text</h1>
    <p>
      VUI does not ship with any fonts. It is up to the user to define that in their application. It ships with two CSS
      font variables to define your UI fonts.
    </p>

    <h2>
      Font families
    </h2>

    <Grid gap="s" :columns="2" class="mb-xl">
      <Card separators>
        <template #header>
          <h6 class="m-0">
            Main
          </h6>
        </template>
        <template #header-end>
          <CopyClipboard text="--font" confirm="Copied!">
            <Button plain expand>
              <template #start>
                <Badge>
                  --font
                </Badge>
              </template>
              <template #end>
                <Icon name="ph:copy" size="18" />
              </template>
            </Button>
          </CopyClipboard>
        </template>
        <div class="m-0 text-xxl" :style="{ height: '64px', margin: 0 }">
          The quick brown fox jumps over the lazy dog.
        </div>
      </Card>

      <Card separators>
        <template #header>
          <h6 class="m-0">
            Monospace
          </h6>
        </template>
        <template #header-end>
          <CopyClipboard text="--font" confirm="Copied!">
            <Button plain expand>
              <template #start>
                <Badge>
                  --font-mono
                </Badge>
              </template>
              <template #end>
                <Icon name="ph:copy" size="18" />
              </template>
            </Button>
          </CopyClipboard>
        </template>
        <pre class="m-0"
          :style="{ height: '64px', padding: '0 16px', display: 'flex', alignItems: 'center', margin: 0 }">The
          quick brown fox jumps over the lazy dog.</pre>
      </Card>
    </Grid>

    <h2>Text size</h2>

    <p class="mb-l">
      The root font-size is <code>63.5%</code> which makes conversion between pixels and rem values straightforward
      because
      now we can convert <code>1rem</code> to <code>10px</code> and so on. For example <code>1.6rem</code> is
      <code>16px</code>.
    </p>

    <p class="mb-xl">
      The target for VUI are mostly dashboard / functional applications. Not marketing content. Hence the font sizes
      start
      at a very small.
    </p>

    <div class="mb-xl">
      <TokenItem v-for="item in fontSizeClasses" :key="item.token" :name="item.name" :size="item.size"
        :class-name="item.token" prefix="" />
    </div>

    <h2>Font weight</h2>

    <p class="mb-l">
      All font weights starting from <code>300</code> are supported.
    </p>

    <div class="mb-xl">
      <TokenItem v-for="item in fontWeightClasses" :key="item.token" :name="item.name" :class-name="item.token"
        prefix="" :indicator-style="{ fontWeight: item.weight, fontSize: '2rem' }">
        <template #text>
          Red fox
        </template>
        <template #value>
          {{ item.weight }}
        </template>
      </TokenItem>
    </div>

    <h2>Line height</h2>

    <p class="mb-xl">
      Line height is divided into only three categories, to keep things consistent. In most cases, you should be using
      the
      <code>base</code> or <code>title</code> line heights.
    </p>

    <TokenItem v-for="item in lineHeightTokens" :key="item.token" :name="item.name" :class-name="item.token"
      :indicator-style="{ lineHeight: item.height, width: '256px' }" prefix="">
      <template #text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </template>
      <template #value>
        {{ item.height }}
      </template>
    </TokenItem>
  </div>
</template>

<style scoped lang="scss">
.text-size-indicator {
  width: 256px;
}
</style>
