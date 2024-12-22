import Pageable from "./Pageable";
import Sort from "./Sort";


// JPA Page 객체를 나타내는 인터페이스
export default interface Page<T> {
  content: T[]; // 현재 페이지의 데이터 리스트
  pageable: Pageable; // 페이징 정보
  totalPages: number; // 총 페이지 수
  totalElements: number; // 총 데이터 수
  last: boolean; // 마지막 페이지 여부
  size: number; // 한 페이지당 데이터 수
  number: number; // 현재 페이지 번호 (0부터 시작)
  sort: Sort; // 정렬 정보
  first: boolean; // 첫 페이지 여부
  numberOfElements: number; // 현재 페이지에 있는 데이터 수
  empty: boolean; // 현재 페이지가 비어있는지 여부
}