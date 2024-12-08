export default interface NoticeDto {
  content: string;
  isBookmarked: boolean;
  date: string;
  title: string;
  postId: string;
  avatarUrl?: string;
  author:string
}