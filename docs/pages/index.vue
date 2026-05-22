<script setup lang="ts">
import { Card } from '@dolanske/vui'

// const texts = [
//   'CSS Tokens',
//   'Generic Components',
//   'CSS Class helpers',
//   'High customizability',
// ]
</script>

<template>
  <div class="landing">
    <div class="container-s">
      <div class="relative">
        <div class="glow" />
        <Card separators class="cta-card" :padding="false">
          <div class="d-landing">
            <h1>VUI.</h1>
          </div>
          <p class="text-xl p-xl text-center">
            Component & Styles starter pack for your next project
          </p>
          <template #footer>
            <Flex x-center class="p-m">
              <Commands large />

              <NuxtLink to="/docs" class="w-100">
                <Button expand variant="accent">
                  Get started
                </Button>
              </NuxtLink>
            </Flex>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  display: flex;
  align-items: center;
  height: 100vh;
  padding-block: var(--space-xl);
}

.relative {
  display: block;
  position: relative;
  z-index: 1;
}
.cta-card {
  background-color: var(--color-bg-medium);
  z-index: 2;
  overflow: hidden;

  p {
    /* text-align: center; */
    /* text-transform: uppercase; */
    color: var(--color-text);
    text-wrap: balance;
  }
}

.d-landing {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 268px;
  position: relative;
  z-index: 4;
  transform: translateY(-8px);
  margin-bottom: -8px;

  --bg: var(--color-bg-medium);
  --stripe-width: 4px;
  --stripe-gap: 24px;

  h1 {
    font-size: 13rem;
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
