
export default interface PostDto {
  title: string;
  avatarUrl?: string;
  author: string;
  authorOrg: string;
  content: string;
  date: string;
  likes: number;
  bookmarks: number;
  postId: string;
  isLiked: boolean;
  isBookmarked: boolean;
}