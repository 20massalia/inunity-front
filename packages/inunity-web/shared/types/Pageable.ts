import Sort from "./Sort";

// 페이징 정보를 나타내는 인터페이스
export default interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}