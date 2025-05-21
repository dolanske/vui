<script setup lang="ts">
import { Button, Card, Flex } from '@dolanske/vui'

const router = useRouter()
</script>

<template>
  <div class="container container-m">
    <div class="d-landing">
      <h1>VUI.</h1>
    </div>

    <Flex x-between gap="s" class="mb-m">
      <Button expand size="l" outline @click="router.push('/docs/tokens')">
        <template #start>
          <Icon name="ph:brackets-curly" />
        </template>
        Style tokens
      </Button>
      <Button expand size="l" outline @click="router.push('/docs/framework')">
        <template #start>
          <Icon name="ph:file-css" />
        </template>
        CSS Framework
      </Button>
      <Button expand size="l" outline @click="router.push('/docs/components')">
        <template #start>
          <Icon name="ph:rectangle-dashed" />
        </template>
        Components
      </Button>
    </Flex>

    <Card separators class="p-xl mb-m">
      <p class="text-center mb-xl text-xl">
        Homegrown Vue component library for me!! (and you)
      </p>

      <Flex x-center>
        <Button variant="gray" outline size="l" class="btn-cta" @click="router.push('/examples')">
          Examples
        </Button>

        <Button variant="fill" size="l" class="btn-cta" @click="router.push('/docs')">
          Get started
          <template #end>
            <Icon name="ph:arrow-right" />
          </template>
        </Button>
      </Flex>
    </Card>

    <a href="https://dolansky.dev/" target="_blank" class="author">
      <img src="/favicon.svg" alt="">
      Created by @dolanske
    </a>
  </div>
</template>

<style lang="scss" scoped>
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
      rgba(0, 0, 0, 0) 4.55%,
      #000000 4.55%,
      #000000 50%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 54.55%,
      #000000 54.55%,
      #000000 100%
    );
    background-size: 22px 22px;
  }
}
</style>
