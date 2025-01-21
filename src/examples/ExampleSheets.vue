<script setup lang='ts'>
import { ref } from 'vue'
import Button from '../components/Button/Button.vue'
import Select from '../components/Select/Select.vue'
import Sheet from '../components/Sheet/Sheet.vue'

const open = ref()
const options = [{ value: 'left', label: 'Left' }, { value: 'right', label: ' Right' }, { value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }]
const option = ref(options[0])
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Sheets
    </h3>

    <table>
      <tbody>
        <tr>
          <th>Base</th>
          <td>
            <Select v-model="option" :options />
            <Button @click="open = !open">
              Open
            </Button>
            <Sheet v-model="open">
              <template #header>
                <h2>Hello </h2>
              </template>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus alias consectetur obcaecati recusandae debitis voluptatum exercitationem. Nam facilis laudantium labore sint cum, veritatis autem asperiores consectetur possimus cumque beatae eveniet.</p>
            </Sheet>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
