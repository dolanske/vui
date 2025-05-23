<script setup lang="ts">
import { Badge, Button, Card, CopyClipboard, Divider, Grid } from '@dolanske/vui'

const fontSizes = [
  { name: 'XXS size', token: '--font-size-xxs', size: '1rem' },
  { name: 'XS size', token: '--font-size-xs', size: '1.15rem' },
  { name: 'S size', token: '--font-size-s', size: '1.3rem' },
  { name: 'M size', token: '--font-size-m', size: '1.5rem' },
  { name: 'L size', token: '--font-size-l', size: '1.8rem' },
  { name: 'XL size', token: '--font-size-xl', size: '2rem' },
  { name: 'XXL size', token: '--font-size-xxl', size: '2.6rem' },
  { name: 'XXXL size', token: '--font-size-xxxl', size: '3.4rem' },
  { name: 'XXXXL size', token: '--font-size-xxxxl', size: '4.8rem' },
]
</script>

<template>
  <div>
    <h1>Text</h1>
    <p class="mb-l">
      Building on simplicity and consistency, VUI uses <strong>Inter</strong> for interfaces and <strong>Geist mono</strong> for code/monospace. It discourages from using more than 1 font family per context.
    </p>

    <h2 class="mb-l">
      Font family
    </h2>

    <Grid :gap="0" :columns="2" class="mb-xl">
      <Card separators :style="{ borderRight: 'unset' }">
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
        <pre class="m-0 text-xl" :style="{ height: '80px' }">The quick brown fox jumps over the lazy dog.</pre>
      </Card>
    </Grid>

    <h2>Text size</h2>

    <p class="mb-l">
      VUI prioritizes dashboard and functional UI design, allowing for smaller font sizes. However, when creating design-focused marketing and visual pages, it's recommended to maintain a minimum font size of <code>1.4rem</code>.
    </p>

    <div class="mb-xl">
      <div v-for="item in fontSizes" :key="item.token" class="text-item">
        <strong class="text-size-indicator" :style="{ fontSize: item.size }">Cute dog</strong>

        <div class="flex-1">
          <span>{{ item.name }}</span>
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

    <p>TBA</p>

    <h2>Font weight</h2>

    <p>TBA</p>
  </div>
</template>

<style scoped lang="scss">
.text-item {
  display: flex;
  gap: var(--space-l);
  align-items: center;

  margin-bottom: var(--space-l);
  padding-bottom: var(--space-l);
  border-bottom: 1px solid var(--color-border-weak);

  &:last-of-type {
    border-bottom: none;
  }

  .text-size-indicator {
    width: 256px;
  }
}
</style>
