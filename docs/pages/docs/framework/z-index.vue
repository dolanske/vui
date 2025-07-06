<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Z-Index</h1>

    <p class="mb-xl">
      A set of predefined CSS classes that define consistent z-index values for elements throughout your application. These z-index classes help maintain visual hierarchy and ensure that elements appear in the correct order.
    </p>

    <div v-for="item in zIndexClasses" :key="item.className" class="list-item">
      <strong class="text-size-indicator text-xxl">{{ item.value }}</strong>

      <div class="flex-1">
        <strong class="list-item-name">{{ item.name }}</strong>
        <span class="list-item-value">
          {{ item.description }}
        </span>
      </div>

      <CopyClipboard :text="item.className" confirm="Copied!">
        <Button plain expand>
          <template #start>
            <Badge>
              .{{ item.className }}
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
