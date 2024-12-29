import Page from "../types/Page";

/**
 * 리스트만으로 Page 객체를 생성하는 유틸리티 함수
 * @param content - 데이터 리스트
 * @param pageNumber - 현재 페이지 번호 (기본값 0)
 * @param pageSize - 한 페이지당 데이터 수 (기본값 10)
 * @returns Page 객체
 */
export function createPage<T>(
  content: T[],
  pageNumber: number = 0,
  pageSize: number = 10
): Page<T> {
  const totalElements = content.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const startIndex = pageNumber * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalElements);

  return {
    content: content.slice(startIndex, endIndex),
    pageable: {
      sort: { empty: true, sorted: false, unsorted: true },
      offset: startIndex,
      pageSize,
      pageNumber,
      paged: true,
      unpaged: false,
    },
    totalPages,
    totalElements,
    last: pageNumber + 1 === totalPages,
    size: pageSize,
    number: pageNumber,
    sort: { empty: true, sorted: false, unsorted: true },
    first: pageNumber === 0,
    numberOfElements: endIndex - startIndex,
    empty: endIndex - startIndex === 0,
  };
}