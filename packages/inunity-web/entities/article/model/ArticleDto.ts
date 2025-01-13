
export default interface ArticleDto {
  title: string;
  avatarUrl?: string|undefined;
  author: string;
  authorOrg: string;
  content: string;
  date: string;
  likes: number;
  bookmarks: number;
  articleId: number;
  isLiked: boolean;
  isBookmarked: boolean;
}