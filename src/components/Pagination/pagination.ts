import { createArray } from '../../lib/helpers'

export interface Pagination {
  totalItems: number
  currentPage: number
  perPage: number
  totalPages: number
  startPage: number
  endPage: number
  startIndex: number
  endIndex: number
  pages: number[]
}

/**
 * Calculates pagination state. `startPage` / `endPage` describe the window of
 * page numbers to display, they are not the bounds of the data. Use `1` and
 * `totalPages` to decide whether previous / next pages exist.
 *
 * `endIndex` is inclusive, use `items.slice(startIndex, endIndex + 1)`.
 */
export function paginate(
  totalItems: number,
  currentPage: number = 1,
  perPage: number = 15,
  maxPages: number = 3,
): Pagination {
  // Guard against invalid input which would otherwise produce NaN / Infinity
  const safeTotal = Math.max(0, Math.floor(totalItems) || 0)
  const safePerPage = Math.max(1, Math.floor(perPage) || 1)
  const safeMaxPages = Math.max(1, Math.floor(maxPages) || 1)

  // An empty dataset still has a single (empty) page
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePerPage))

  // ensure current page isn't out of range
  currentPage = Math.min(Math.max(1, Math.floor(currentPage) || 1), totalPages)

  let startPage: number, endPage: number
  if (totalPages <= safeMaxPages) {
    // total pages less than max so show all pages
    startPage = 1
    endPage = totalPages
  }
  else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(safeMaxPages / 2)
    const maxPagesAfterCurrentPage = Math.ceil(safeMaxPages / 2) - 1
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1
      endPage = safeMaxPages
    }
    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - safeMaxPages + 1
      endPage = totalPages
    }
    else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage
      endPage = currentPage + maxPagesAfterCurrentPage
    }
  }

  // calculate start and end item indexes
  const startIndex = safeTotal === 0 ? 0 : (currentPage - 1) * safePerPage
  const endIndex = Math.min(startIndex + safePerPage - 1, safeTotal - 1)

  const pages = createArray((endPage + 1) - startPage).map(i => startPage + i)

  return {
    totalItems: safeTotal,
    currentPage,
    perPage: safePerPage,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  }
}
