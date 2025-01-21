<script setup lang='ts'>
import Checkbox from '../components/Checkbox/Checkbox.vue'
import Grid from '../components/Grid/Grid.vue'
import Radio from '../components/Radio/Radio.vue'
import RadioGroup from '../components/Radio/RadioGroup.vue'
import Switch from '../components/Switch/Switch.vue'
</script>

<template>
  <div class="mb-xxl">
    <Grid :columns="2" gap="xl">
      <div>
        <h3 class="mb-l">
          Checkbox
        </h3>
        <table class="mb-xl w-100">
          <tbody>
            <tr>
              <th>Base</th>
              <td>
                <Checkbox label="Just click me" />
              </td>
            </tr>
            <tr>
              <th>Accent</th>
              <td>
                <Checkbox label="Just click me" accent />
              </td>
            </tr>
            <tr>
              <th>Disabled</th>
              <td>
                <Checkbox disabled label="Just click me" />
              </td>
            </tr>
            <tr>
              <th>Custom icons</th>
              <td>
                <Checkbox icon-on="ph:check-fat" icon-off="ph:x-bold" label="Just click me" />
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-l">
          Switch
        </h3>
        <table class="mb-xl w-100">
          <tbody>
            <tr>
              <th>Base</th>
              <td>
                <Switch label="Just click me" />
              </td>
            </tr>
            <tr>
              <th>Accent</th>
              <td>
                <Switch label="Just click me" accent />
              </td>
            </tr>
            <tr>
              <th>Disabled</th>
              <td>
                <Switch label="Just click me" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 class="mb-l">
          Radio group
        </h3>

        <table class="w-100">
          <tbody>
            <tr>
              <th>Base</th>
              <td>
                <RadioGroup>
                  <Radio value="one" label="First" />
                  <Radio value="two" label="Second" />
                  <Radio value="three" label="Third" disabled />
                </RadioGroup>
              </td>
            </tr>
            <tr>
              <th>Accent</th>
              <td>
                <RadioGroup>
                  <Radio value="one" label="First" accent />
                  <Radio value="two" label="Second" accent />
                  <Radio value="three" label="Third" disabled accent />
                </RadioGroup>
              </td>
            </tr>
            <tr>
              <th>Vertical</th>
              <td>
                <RadioGroup column>
                  <Radio value="one" label="First" />
                  <Radio value="two" label="Second" />
                  <Radio value="three" label="Third" disabled />
                </RadioGroup>
              </td>
            </tr>
            <tr>
              <th>Disabled</th>
              <td>
                <RadioGroup column disabled>
                  <Radio value="one" label="First" />
                  <Radio value="two" label="Second" />
                  <Radio value="three" label="Third" disabled />
                </RadioGroup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Grid>
  </div>
</template>
