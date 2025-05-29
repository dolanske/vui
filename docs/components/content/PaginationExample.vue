<script setup>
import { paginate, Pagination } from '@dolanske/vui'
import { computed, ref } from 'vue'

const currentPage = ref(1)
const totalItems = 100
const perPage = 10

const pagination = computed(() => paginate(totalItems, currentPage.value, perPage))

function handlePageChange(page) {
  currentPage.value = page
}
</script>

<template>
  <div class="space-y-l">
    <div>
      <h3 class="text-m mb-s">
        Basic Usage
      </h3>
      <Pagination
        :pagination="pagination"
        @change="handlePageChange"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Without Page Numbers
      </h3>
      <Pagination
        :pagination="pagination"
        :numbers="false"
        @change="handlePageChange"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Without First/Last Buttons
      </h3>
      <Pagination
        :pagination="pagination"
        :first-last="false"
        @change="handlePageChange"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Variant
      </h3>
      <Pagination
        :pagination="pagination"
        variant="primary"
        @change="handlePageChange"
      />
    </div>

    <div>
      <h3 class="text-m mb-s">
        Custom Navigation
      </h3>
      <Pagination
        :pagination="pagination"
        @change="handlePageChange"
      >
        <template #prev="{ disabled, setPage }">
          <Button
            :disabled="disabled"
            @click="setPage"
          >
            Previous
          </Button>
        </template>

        <template #next="{ disabled, setPage }">
          <Button
            :disabled="disabled"
            @click="setPage"
          >
            Next
          </Button>
        </template>
      </Pagination>
    </div>
  </div>
</template>
