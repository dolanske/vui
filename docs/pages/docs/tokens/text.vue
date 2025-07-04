<script setup lang="ts">
import { Badge, Button, Card, CopyClipboard, Grid } from '@dolanske/vui'
</script>

<template>
  <div>
    <h1>Text</h1>
    <p>
      Building on simplicity and consistency, VUI uses <strong>Inter</strong> for interfaces and <strong>Geist mono</strong> for code/monospace. It discourages from using more than 1 font family per context.
    </p>

    <p class="mb-l">
      The root font-size is <code>63.5%</code> which makes conversion between pixels and rem values straightforward because now we can convert <code>1rem</code> to <code>10px</code> and so on. For example <code>1.6rem</code> is <code>16px</code>.
    </p>

    <h2 class="mb-l">
      Font family
    </h2>

    <Grid gap="s" :columns="2" class="mb-xl">
      <Card separators>
        <template #header>
          <h6 class="m-0">
            Main
          </h6>
        </template>
        <template #header-end>
          <CopyClipboard text="--global-font" confirm="Copied!">
            <Button plain expand>
              <template #start>
                <Badge>
                  --global-font
                </Badge>
              </template>
              <template #end>
                <Icon name="ph:copy" size="18" />
              </template>
            </Button>
          </CopyClipboard>
        </template>
        <p class="m-0 text-xxl" :style="{ height: '80px' }">
          The quick brown fox jumps over the lazy dog.
        </p>
      </Card>

      <Card separators>
        <template #header>
          <h6 class="m-0">
            Monospace
          </h6>
        </template>
        <template #header-end>
          <CopyClipboard text="--global-font" confirm="Copied!">
            <Button plain expand>
              <template #start>
                <Badge>
                  --global-font-mono
                </Badge>
              </template>
              <template #end>
                <Icon name="ph:copy" size="18" />
              </template>
            </Button>
          </CopyClipboard>
        </template>
        <pre class="m-0 text-xl" :style="{ height: '80px', padding: '0 16px', display: 'flex', alignItems: 'center' }">The quick brown fox jumps over the lazy dog.</pre>
      </Card>
    </Grid>

    <h2>Text size</h2>

    <p class="mb-l">
      VUI prioritizes dashboard and functional UI design, allowing for smaller font sizes. However, when creating design-focused marketing and visual pages, it's recommended to maintain a minimum font size of <code>1.4rem</code>.
    </p>

    <div class="mb-xl">
      <div v-for="item in fontSizeTokens" :key="item.token" class="list-item">
        <strong class="text-size-indicator" :style="{ fontSize: item.size }">Cute dog</strong>

        <div class="flex-1">
          <strong class="list-item-name">{{ item.name }}</strong>
          <span class="list-item-value">{{ item.size }}</span>
        </div>

        <CopyClipboard :text="item.token" confirm="Copied!">
          <Button plain expand>
            <template #start>
              <Badge>
                {{ item.token }}
              </Badge>
            </template>

            <template #end>
              <Icon name="ph:copy" size="18" />
            </template>
          </Button>
        </CopyClipboard>
      </div>
    </div>

    <h2>Font weight</h2>

    <p class="mb-l">
      All font weights starting from <code>300</code> are supported.
    </p>

    <div class="mb-xl">
      <div v-for="item in fontWeightTokens" :key="item.token" class="list-item">
        <strong class="text-size-indicator" :style="{ fontWeight: item.weight, fontSize: '2rem' }">Red fox</strong>

        <div class="flex-1">
          <strong class="list-item-name">{{ item.name }}</strong>
          <span class="list-item-value">{{ item.weight }}</span>
        </div>

        <CopyClipboard :text="item.token" confirm="Copied!">
          <Button plain expand>
            <template #start>
              <Badge>
                {{ item.token }}
              </Badge>
            </template>

            <template #end>
              <Icon name="ph:copy" size="18" />
            </template>
          </Button>
        </CopyClipboard>
      </div>
    </div>

    <h2>Line height</h2>

    <p class="mb-xl">
      Line height is divided into only three categories, to keep things consistent. In most cases, you should be using the <code>base</code> or <code>title</code> line heights.
    </p>

    <div class="mb-xl">
      <div v-for="item in lineHeightTokens" :key="item.token" class="list-item">
        <strong class="text-size-indicator" :style="{ lineHeight: item.height }">Lorem ipsum dolor sit amet consectetur adipisicing elit.</strong>

        <div class="flex-1">
          <strong class="list-item-name">{{ item.name }}</strong>
          <span class="list-item-value">{{ item.height }}</span>
        </div>

        <CopyClipboard :text="item.token" confirm="Copied!">
          <Button plain expand>
            <template #start>
              <Badge>
                {{ item.token }}
              </Badge>
            </template>

            <template #end>
              <Icon name="ph:copy" size="18" />
            </template>
          </Button>
        </CopyClipboard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-size-indicator {
  width: 256px;
}
</style>
