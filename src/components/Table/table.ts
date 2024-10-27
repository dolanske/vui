import type { MaybeRefOrGetter, Ref } from 'vue'
import type { DeepRequired } from '../../shared/types'
import { computed, provide, readonly, ref, toValue } from 'vue'
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

export const SelectProvideSymbol = Symbol('select-row-provide')

export interface SelectProvide {

}

interface Sorting<K> {
  key?: K
  type: 'asc' | 'desc'
}

export interface Header {
  label: string
  sortToggle: () => void
  sortKey?: 'asc' | 'desc'

}

interface TableOptionsInput {
  pagination?: {
    enabled?: boolean
    perPage?: number
    maxPages?: number
  }
}

// eslint-disable-next-line ts/explicit-function-return-type
export function defineTable<const Dataset extends Array<Record<string, string | number>>>(
  computedDataset: MaybeRefOrGetter<Dataset>,
  tableOptions?: TableOptionsInput,
) {
  const $data = computed(() => toValue(computedDataset))

  //
  //
  const options = ref(Object.assign({
    pagination: {
      enabled: false,
      perPage: 10,
      maxPages: 3,
    },
  }, tableOptions) as DeepRequired<TableOptionsInput>)

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
    const searchValue = search.value
    let final = $data.value

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
          ? aValue > bValue ? 1 : -1
          : aValue > bValue ? -1 : 1
      }) as Dataset
    }

    // TODO: add a $property if the row is selected
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
    if (options.value.pagination?.enabled === true) {
      return filteredRows.value.slice(
        pagination.value.startIndex,
        pagination.value.endIndex + 1,
      ) as Dataset
    }
    return filteredRows.value as Dataset
  })

  //
  // Row selecting
  const selectedIndexes = ref<Set<number>>(new Set())
  const selectedRows = computed<Dataset[number][]>(() => {
    return $data.value.filter((_, index) => selectedIndexes.value.has(index))
  })

  /**
   * Accepts either an existing index of a row within the dataset or the dataset
   * row itself. If the item is already selected, it will be deselected.
   *
   * @param row {Number | RowObject}
   */
  function selectRow(row: number | Dataset[number]): void {
    const toggleIndex = (i: number): void => {
      if (selectedIndexes.value.has(i)) {
        selectedIndexes.value.delete(i)
      }
      else {
        selectedIndexes.value.add(i)
      }
    }

    if (typeof row === 'number') {
      if ($data.value[row]) {
        toggleIndex(row)
      }
    }
    else {
      const newIndex = $data.value.findIndex(r => r === row)
      if (newIndex > -1) {
        toggleIndex(newIndex)
      }
    }
  }

  provide(SelectProvideSymbol, {
    selectedIndexes,
    selectRow,
  })

  return {
    setSort,
    clearSort,
    setSearch,
    rows: readonly(rows),
    allRows: readonly(filteredRows),
    selectedRows: readonly(selectedRows),
    headers: readonly(headers),
    pagination,
    canPrevPage,
    canNextPage,
    setPage,
    options,
    selectRow,
  }
}
