<script setup lang="ts">
import { ref } from 'vue'
import Alert from './components/Alert/Alert.vue'
import Flex from './components/Flex/Flex.vue'
import OTP from './components/OTP/OTP.vue'
import OTPItem from './components/OTP/OTPItem.vue'
import ExamplePopouts from './examples/ExamplePopouts.vue'

// import ExampleButtons from './examples/ExampleButtons.vue'
import { setColorTheme } from './shared/theme'

setColorTheme('dark')

const otpValue = ref('')
</script>

<template>
  <main vaul-drawer-wrapper>
    <div class="container container-m pt-xxl">
      <!-- <ExampleButtons /> -->

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
      </Flex>

      <Flex column gap="m" class="mb-xxl">
        <Alert icon-align="start">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi aliquid voluptas illum, dicta suscipit excepturi aspernatur voluptatibus possimus laborum blanditiis! Voluptas velit enim illo iste fugit ex veniam necessitatibus.</p>
        </Alert>

        <Alert icon-align="center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi aliquid voluptas illum, dicta suscipit excepturi aspernatur voluptatibus possimus laborum blanditiis! Voluptas velit enim illo iste fugit ex veniam necessitatibus.</p>
        </Alert>

        <Alert icon-align="end">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi aliquid voluptas illum, dicta suscipit excepturi aspernatur voluptatibus possimus laborum blanditiis! Voluptas velit enim illo iste fugit ex veniam necessitatibus.</p>
        </Alert>
      </Flex>

      <ExamplePopouts />
    </div>
  </main>
</template>

<style>
  .red {
  background: red !important;
}
</style>
