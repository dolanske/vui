<script setup lang='ts'>
import { computed, ref } from 'vue'
import Flex from '../components/Flex/Flex.vue'
import { paginate } from '../components/Pagination/pagination'
import Pagination from '../components/Pagination/Pagination.vue'

const page = ref(1)
const bigPage = ref(12)
const smallPage = ref(1)

const pagination = computed(() => paginate(100, page.value, 10))
const bigPagination = computed(() => paginate(1000, bigPage.value, 10, 2))
const smallPagination = computed(() => paginate(18, smallPage.value, 10))
const singlePagination = paginate(5, 1, 10)
</script>

<template>
  <div class="mb-xxl">
    <h3 class="mb-l">
      Pagination
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Default</th>
          <td>
            <Flex gap="m" y-center>
              <Pagination :pagination @change="value => page = value" />
              <span>Page {{ page }}</span>
            </Flex>
          </td>
        </tr>
        <tr>
          <th>Many pages, ellipsis</th>
          <td>
            <Pagination :pagination="bigPagination" ellipsis @change="value => bigPage = value" />
          </td>
        </tr>
        <tr>
          <th>Variants</th>
          <td>
            <Flex column gap="s">
              <Pagination :pagination variant="fill" @change="value => page = value" />
              <Pagination :pagination variant="accent" @change="value => page = value" />
              <Pagination :pagination variant="link" @change="value => page = value" />
            </Flex>
          </td>
        </tr>
        <tr>
          <th>No first / last</th>
          <td>
            <Pagination :pagination :first-last="false" @change="value => page = value" />
          </td>
        </tr>
        <tr>
          <th>Only previous / next</th>
          <td>
            <Pagination :pagination :numbers="false" :first-last="false" @change="value => page = value" />
          </td>
        </tr>
        <tr>
          <th>Custom slots</th>
          <td>
            <Pagination :pagination @change="value => page = value">
              <template #prev="{ disabled, setPage }">
                <button type="button" :disabled @click="setPage">
                  Previous
                </button>
              </template>
              <template #next="{ disabled, setPage }">
                <button type="button" :disabled @click="setPage">
                  Next
                </button>
              </template>
            </Pagination>
          </td>
        </tr>
        <tr>
          <th>Two pages</th>
          <td>
            <Pagination :pagination="smallPagination" @change="value => smallPage = value" />
          </td>
        </tr>
        <tr>
          <th>Single page</th>
          <td>
            <Pagination :pagination="singlePagination" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
