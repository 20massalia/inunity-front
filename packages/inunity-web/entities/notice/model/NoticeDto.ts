export default interface NoticeDto {
  content: string;
  isBookmarked: boolean;
  date: string;
  title: string;
  articleId: string;
  avatarUrl?: string;
  author:string
}