<script setup lang="ts">
import ExampleDropdowns from './examples/ExampleDropdowns.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'
import ExampleTooltips from './examples/ExampleTooltips.vue'

// import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <!--
      <Flex column gap="xs" x-center y-center class="mb-xxl">
        <OTP v-model="otpValue" mode="num">
          <OTPItem :i="0" />
          <OTPItem :i="1" />
          <OTPItem :i="2" />
          <div class="px-m y-center">
            -
          </div>
          <OTPItem :i="3" />
          <OTPItem :i="4" />
          <OTPItem :i="5" />
        </OTP>
        <p>Output: {{ otpValue }}</p>
      </Flex> -->

      <ExampleTooltips />
      <ExamplePopouts />
      <ExampleDropdowns />
    </div>
  </main>
</template>
