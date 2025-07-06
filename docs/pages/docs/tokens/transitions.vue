<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Transition</h1>
    <p class="mb-l">
      VUI focuses on fast & smooth transitions to prevent visual jitter and the feeling of lag/slowness.
    </p>

    <div v-for="item in transitionTokens" :key="item.token" class="list-item">
      <div class="transition-indicator-wrap">
        <div
          class="transition-indicator" :style="{
            transition: item.value,
            // animationDuration: item.value.split(' all ')[0],
            // animationTimingFunction: item.value.split(' all ')[1],
          }"
        />
      </div>

      <div class="flex-1">
        <strong class="list-item-name">{{ item.name }}</strong>
        <span class="list-item-value">
          {{ item.value }}
        </span>
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
</template>

<style scoped>
@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: calc(100% - 16px);
  }
}

.list-item {
  &:hover {
    .transition-indicator-wrap {
      opacity: 1;

      .transition-indicator {
        left: calc(100% - 16px);
        /* animation-play-state: running; */
      }
    }
  }
}

.transition-indicator-wrap {
  width: 256px;
  position: relative;
  opacity: 0.4;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    border-bottom: 1px solid var(--color-text);
  }

  .transition-indicator {
    /* animation-name: move;
    animation-play-state: paused;
    animation-iteration-count: 1;
    animation-fill-mode: forwards; */

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 16px;
    height: 16px;
    background-color: var(--color-text);
    border-radius: 50%;
  }
}
</style>
