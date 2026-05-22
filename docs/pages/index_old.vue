<script setup lang="ts">
import { Button, Card, Flex } from '@dolanske/vui'
import Commands from '~/components/Commands.vue'

const router = useRouter()
</script>

<template>
  <div class="container container-m">
    <div class="d-landing">
      <h1>VUI.</h1>
    </div>

    <Flex x-between gap="s" class="mb-m">
      <Button
        v-for="item in documentationTabs"
        :key="item.label"
        expand
        size="l"
        outline
        @click="router.push(item.path)"
      >
        <template #start>
          <Icon :name="item.icon" />
        </template>
        <span class="text-size-s">
          {{ item.label }}
        </span>
      </Button>
    </Flex>

    <Card separators class="p-xl mb-m">
      <p class="text-center mb-xl text-xl">
        Homegrown component library & design system
      </p>

      <Flex x-center>
        <!-- <Button variant="gray" outline size="l" class="btn-cta" @click="router.push('/docs/projects')">
          Examples
        </Button> -->

        <Commands class="btn-cta" large />

        <Button variant="accent" size="l" class="btn-cta" @click="router.push('/docs')">
          Get started
          <!-- <template #end>
            <Icon name="ph:arrow-right" />
          </template> -->
        </Button>
      </Flex>

      <Flex x-center class="mt-l">
        <RouterLink to="/docs/projects" class="btn-project">
          Projects built on top of VUI
        </RouterLink>
      </Flex>
    </Card>

    <a href="https://dolansky.dev/" target="_blank" class="author">
      <img src="/jdlogo.svg" alt="">
      Created by @dolanske
    </a>
  </div>
</template>

<style lang="scss">
.author {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-s);
  color: var(--color-text-light);
  font-size: var(--font-size-s);

  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  img {
    width: 24px;
  }

  &:hover {
    color: var(--color-accent);
  }
}

.btn-project {
  font-size: var(--font-size-xs);
  text-decoration: underline;
  color: var(--color-text-light);

  &:hover {
    color: var(--color-accent);
    text-decoration: none;
  }
}

.btn-cta {
  font-size: var(--font-size-l);
  height: 48px;

  .iconify {
    font-size: var(--font-size-xl);
    color: var(--color-text-inv);
  }
}

.d-landing {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 512px;
  margin-top: var(--space-m);
  margin-bottom: calc(var(--space-xl) - 12px);
  position: relative;
  z-index: 4;

  --bg: var(--color-bg);
  --stripe-width: 4px;
  --stripe-gap: 24px;

  h1 {
    font-size: 16rem;
    text-transform: uppercase;
    color: var(--color-bg);
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
  }

  &:before {
    z-index: -1;
    background: #833ab4;
    background: linear-gradient(135deg, rgb(195, 46, 225) 0%, rgb(253, 115, 29) 50%, rgb(249, 212, 5) 100%);
  }

  &:after {
    z-index: 2;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) var(--stripe-width),
      var(--bg) var(--stripe-width),
      var(--bg) calc(var(--stripe-gap) / 2),
      rgba(0, 0, 0, 0) calc(var(--stripe-gap) / 2),
      rgba(0, 0, 0, 0) calc((var(--stripe-gap) / 2) + var(--stripe-width)),
      var(--bg) calc((var(--stripe-gap) / 2) + var(--stripe-width)),
      var(--bg) var(--stripe-gap)
    );
    background-size: var(--stripe-gap) var(--stripe-gap);
  }
}

:root.light .d-landing {
  filter: saturate(300%);
  --stripe-width: 6px;
  --stripe-gap: 26px;
}
</style>
