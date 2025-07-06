<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Z-Index</h1>

    <p>
      A set of predefined CSS variables that define consistent z-index values for elements throughout your application. These z-index tokens help maintain visual hierarchy and ensure that elements appear in the correct order.
    </p>

    <p class="mb-xl">
      It is recommended to go <code>-1</code> or <code>+1</code> from the default value when necessary. Avoid using random values.
    </p>

    <div v-for="item in zIndexTokens" :key="item.token" class="list-item">
      <strong class="text-size-indicator text-xxl">{{ item.value }}</strong>

      <div class="flex-1">
        <strong class="list-item-name">{{ item.name }}</strong>
        <span class="list-item-value">
          {{ item.description }}
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
.text-size-indicator {
  width: 96px;
}
</style>
