<script setup lang='ts'>
import { ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import OTP from '../components/OTP/OTP.vue'
import OTPItem from '../components/OTP/OTPItem.vue'

const numeric = ref('')
const chars = ref('')
const both = ref('')
const redacted = ref('')
const invalid = ref('12')
const completed = ref<string | null>(null)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      One time password
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Numbers, with a separator</th>
          <td>
            <Flex gap="m" y-center>
              <OTP v-model="numeric" mode="num" label="Verification code" @complete="value => completed = value">
                <OTPItem :i="0" />
                <OTPItem :i="1" />
                <OTPItem :i="2" />
                <div class="px-s">
                  -
                </div>
                <OTPItem :i="3" />
                <OTPItem :i="4" />
                <OTPItem :i="5" />
              </OTP>
              <span>Value: {{ numeric || '-' }} <br> Completed: {{ completed ?? '-' }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Characters only</th>
          <td>
            <Flex gap="m" y-center>
              <OTP v-model="chars" mode="char" :length="4">
                <OTPItem v-for="i in 4" :key="i" :i="i - 1" />
              </OTP>
              <span>{{ chars || '-' }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Numbers and characters</th>
          <td>
            <Flex gap="m" y-center>
              <OTP v-model="both" mode="both" :length="5">
                <OTPItem v-for="i in 5" :key="i" :i="i - 1" />
              </OTP>
              <span>{{ both || '-' }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Redacted</th>
          <td>
            <OTP v-model="redacted" redacted :length="4">
              <OTPItem v-for="i in 4" :key="i" :i="i - 1" />
            </OTP>
          </td>
        </tr>
        <tr>
          <th>Invalid</th>
          <td>
            <OTP v-model="invalid" invalid :length="4">
              <OTPItem v-for="i in 4" :key="i" :i="i - 1" />
            </OTP>
          </td>
        </tr>
        <tr>
          <th>Disabled</th>
          <td>
            <OTP model-value="42" disabled :length="4">
              <OTPItem v-for="i in 4" :key="i" :i="i - 1" />
            </OTP>
          </td>
        </tr>
        <tr>
          <th>Paste test</th>
          <td>
            Copy <code>123456</code> or <code>12 34 56</code> and paste it into the first row.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
