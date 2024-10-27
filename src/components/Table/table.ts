import type { MaybeRefOrGetter, Ref } from 'vue'
import { computed, readonly, ref, toValue } from 'vue'
import { searchInStr } from '../../shared/helpers'
import { paginate } from '../Pagination/pagination'

// Vue class binding
// type ClassDeclaration = string | Record<string, boolean> | Array<Record<string, boolean>>

// // String & numbeare primitives
// // Component will bind row data with rowKey and rowData
// type Cell = string | number | Component

// export interface TableData<Headers extends readonly any[]> {
//   rows: Array<Record<Headers[number], Cell> & {
//     $options?: {
//       class?: ClassDeclaration
//     }
//     $child?: {
//       component: Component
//       props?: Record<PropertyKey, any>
//     } | Component
//   }>
// }

// // TODO: properly type out table definition return
// export interface TableDataDefinition {
//   data: any[]
//   headers: string[]
// }

// export function defineTableData<const H extends readonly any[]>(
//   headers: H,
//   data: TableData<H>,
// ): TableDataDefinition {
//   // TODO: actually format
//   return {
//     headers: headers as unknown as string[],
//     data: data as any,
//   }
// }

////////

// New implementation

// const AsyncTablePagination = defineAsyncComponent(() => import('./TablePagination.vue'))

// export const PaginationSymbol = Symbol('pagination')

interface Sorting<K> {
  key?: K
  type: 'asc' | 'desc'
}

export interface Header {
  label: string
  sortToggle: () => void
  sortKey?: 'asc' | 'desc'

}

interface TableOptions<Data extends Array<Record<string, any>>> {
  sort?: boolean
  headers?: Record<keyof Data[number], {
    sorting?: boolean
  }>
  pagination?: {
    enable?: boolean
    perPage?: number
    maxPages?: number
  }
}

// eslint-disable-next-line ts/explicit-function-return-type
export function defineTable<const Dataset extends Array<Record<string, string | number>>>(computedDataset: MaybeRefOrGetter<Dataset>, tableOptions?: TableOptions<Dataset>) {
  const $data = computed(() => toValue(computedDataset))

  // TODO: defaults
  const options = ref(Object.assign({}, tableOptions))

  //
  // Pagination
  const currentPage = ref(1)

  const pagination = computed(() => paginate(
    $data.value.length,
    currentPage.value,
    options.value.pagination?.perPage,
    options.value.pagination?.maxPages,
  ))

  const canNextPage = computed(() => pagination.value.currentPage < pagination.value.endPage)
  const canPrevPage = computed(() => pagination.value.currentPage > pagination.value.startPage)

  /**
   * Sets the currently active data page. Please note that you provide the page
   * number, no its index. So this is 1-indexed input
   *
   * @param page Page number
   */
  const setPage = (page: number): void => {
    if ((page > currentPage.value && canNextPage.value)
      || (page < currentPage.value && canPrevPage.value)) {
      currentPage.value = page
    }
  }

  //
  // Sorting

  const sorting = ref<Sorting<Ref<keyof Dataset[number]>>>({
    key: undefined,
    type: 'asc',
  })

  const setSort = (key: keyof Dataset[number], type: 'asc' | 'desc' | 'toggle' = 'asc'): void => {
    sorting.value.key = key
    sorting.value.type = type === 'toggle'
      // Toggle between descending & ascending whenever the set sort fn is called
      ? sorting.value.type === 'asc' ? 'desc' : 'asc'
      : type
  }

  const clearSort = (): void => {
    sorting.value.key = undefined
    sorting.value.type = 'asc'
  }

  //
  // Searching
  const search = ref<string>()

  const setSearch = (match?: string): void => {
    search.value = match
  }

  //
  // Dataset formatting
  const filteredRows = computed(() => {
    let final = $data.value

    const searchValue = search.value

    if (searchValue) {
      final = final.filter((row: Dataset[number]) => {
        const matches = Object
          .values(row)
          .map(row => `${row}`)
        return searchInStr(matches, searchValue)
      }) as Dataset
    }

    const key = sorting.value.key

    if (key) {
      final = final.toSorted((a: Dataset[number], b: Dataset[number]) => {
        const aValue = a[key]
        const bValue = b[key]
        return sorting.value.type === 'asc'
          ? aValue > bValue ? -1 : 1
          : aValue > bValue ? 1 : -1
      }) as Dataset
    }

    return final
  })

  const headers = computed(() => Object
    .keys($data.value[0])
    .map((key) => {
      return {
        label: key,
        sortKey: sorting.value.key === key && sorting.value.type,
        sortToggle: () => {
          // 3-way toggle asc -> desc -> turn off (reset to undefined)
          if (sorting.value.key === key) {
            switch (sorting.value.type) {
              case 'asc': {
                sorting.value.type = 'desc'
                break
              }
              case 'desc': {
                sorting.value.key = undefined
                sorting.value.key = 'asc'
                break
              }
              default: {
                sorting.value.key = key
                sorting.value.type = 'asc'
                break
              }
            }
          }
          else {
            setSort(key)
          }
        },
      } as Header
    }),
  )

  const rows = computed(() => {
    if (options.value.pagination?.enable === true) {
      return filteredRows.value.slice(
        pagination.value.startIndex,
        pagination.value.endIndex + 1,
      ) as Dataset
    }
    return filteredRows.value as Dataset
  })

  return {
    setSort,
    clearSort,
    setSearch,
    allRows: readonly(filteredRows),
    rows: readonly(rows),
    headers: readonly(headers),
    pagination,
    canPrevPage,
    canNextPage,
    setPage,
  }
}
