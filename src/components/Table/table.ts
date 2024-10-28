import type { ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import type { DeepRequired } from '../../shared/types'
import { computed, onBeforeUnmount, provide, readonly, ref, toValue } from 'vue'
import { searchInStr } from '../../shared/helpers'
import { paginate } from '../Pagination/pagination'

export type BaseRow = Record<string, string | number>

export interface TableSelectionProvide {
  selectedRows: Ref<Set<BaseRow>>
  selectRow: (row: BaseRow) => void
  selectAllRows: () => void
  enabled: ComputedRef<boolean>
  isSelectedAll: ComputedRef<boolean>
}

export const TableSelectionProvideSymbol = Symbol('select-row-provide') as InjectionKey<TableSelectionProvide>

// Store the keys which reference a data row. In order to reduce the setup, we
// serialize the shallow object into an id. This way we can recognize the data
// without having to store it in the original data object.
const RowIdCache = new Map<BaseRow, string>()

export function generateRowId(row: BaseRow): string {
  // Check wether the row key already exists
  const existing = RowIdCache.get(row)
  if (existing)
    return existing

  const entries = Object.entries(row)
  entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  const id = entries.map(([key, value]) => `${key}:${value}`).join('|')
  RowIdCache.set(row, id)
  return id
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
  select?: boolean
}

// eslint-disable-next-line ts/explicit-function-return-type
export function defineTable<const Dataset extends Array<BaseRow>>(
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
    select: false,
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
  const selectedRows = ref<Set<BaseRow>>(new Set() as Set<BaseRow>)
  const selectingEnabled = computed(() => options.value.select)

  /**
   * Accepts either an existing index of a row within the dataset or the dataset
   * row itself. If the item is already selected, it will be deselected.
   *
   * @param row {Number | RowObject}
   */
  function selectRow(row: Dataset[number]): void {
    if (selectedRows.value.has(row)) {
      selectedRows.value.delete(row)
    }
    else {
      selectedRows.value.add(row)
    }
  }

  const isSelectedAll = computed(() => $data.value.length === selectedRows.value.size)

  function selectAllRows(): void {
    if (isSelectedAll.value) {
      // If the selected indexes have the same length as the data array, we can
      // assume all of them are selected. Therefore we toggle it by deselecting
      // all of them
      selectedRows.value = new Set()
    }
    else {
      selectedRows.value = new Set($data.value.map(row => row))
    }
  }

  provide(TableSelectionProvideSymbol, {
    selectedRows,
    selectRow,
    selectAllRows,
    enabled: selectingEnabled,
    isSelectedAll,
  })

  // Make sure to clear all cached Ids when component is unmounted
  onBeforeUnmount(() => {
    RowIdCache.clear()
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
    selectAllRows,
    isSelectedAll,
  }
}
