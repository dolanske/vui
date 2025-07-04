<script setup lang="ts">
import { Button, defineTable, DropdownItem, Table } from '@dolanske/vui'

const data = [
  { id: 1, name: 'John', status: 'Active' },
  { id: 2, name: 'Jane', status: 'Inactive' },
]

const { headers, rows } = defineTable(data)
</script>

<template>
  <DocsExample>
    <template #component>
      <Table.Root>
        <template #header>
          <Table.Head v-for="header in headers" :key="header.label" :header="header" sort />
        </template>
        <template #body>
          <tr v-for="row in rows" :key="row.id">
            <Table.Cell>
              {{ row.id }}
              <template #context>
                <Button icon="ph:copy" square size="s" plain />
              </template>
            </Table.Cell>
            <Table.Cell>
              {{ row.name }}
            </Table.Cell>
            <Table.Cell>
              {{ row.status }}
              <template #context>
                <Dropdown>
                  <template #trigger="{ toggle }">
                    <Button icon="ph:dots-three" square size="s" plain @click="toggle" />
                  </template>
                  <DropdownItem>
                    Rename
                  </DropdownItem>
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </Dropdown>
              </template>
            </Table.Cell>
          </tr>
        </template>
      </Table.Root>
    </template>
    <template #code>
      <slot />
    </template>
  </DocsExample>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}

:deep(table) {
  margin: 0;
}
</style>
