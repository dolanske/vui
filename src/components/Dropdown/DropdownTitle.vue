<template>
  <div class="vui-dropdown-title">
    <slot />
    <div v-if="$slots.end" class="vui-dropdown-title-end">
      <slot name="end" />
    </div>
  </div>
</template>
