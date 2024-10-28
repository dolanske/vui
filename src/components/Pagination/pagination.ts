import { createArray } from '../../shared/helpers'

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

export function paginate(
  totalItems: number,
  currentPage: number = 1,
  perPage: number = 15,
  maxPages: number = 5,
): Pagination {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / perPage)

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1
  }
  else if (currentPage > totalPages) {
    currentPage = totalPages
  }

  let startPage: number, endPage: number
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1
    endPage = totalPages
  }
  else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1
      endPage = maxPages
    }
    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1
      endPage = totalPages
    }
    else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage
      endPage = currentPage + maxPagesAfterCurrentPage
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * perPage
  const endIndex = Math.min(startIndex + perPage - 1, totalItems - 1)

  // create an array of pages to ng-repeat in the pager control
  const pages = createArray((endPage + 1) - startPage).map(i => startPage + i)

  // return object with all pager properties required by the view
  return {
    totalItems,
    currentPage,
    perPage,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  }
}
