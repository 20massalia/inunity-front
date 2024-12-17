import PostDto from "@/entities/post/model/PostDto";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "ui";

export type ToggleBookmarkProps = {
  post: PostDto;
};

export default function ToggleBoomarkIcon({ post }: ToggleBookmarkProps) {
  const { isBookmarked, bookmarks } = post;
  const queryClient = useQueryClient();

  const toggleBookmark = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostDto[]>(["posts"]);
      queryClient.setQueryData(
        ["posts"],
        prevPost?.map((post) =>
          post.postId === id
            ? {
                ...post,
                isBookmarked: !post.isBookmarked,
                bookmarks: post.isBookmarked
                  ? post.bookmarks - 1
                  : post.bookmarks + 1,
              }
            : post
        )
      );
      // Todo: Server
    },
  });

  return (
    <div
      className={`flex items-center gap-2`}
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark.mutate(post.postId);
      }}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        className={`w-6 ${
          isBookmarked ? "text-blue-500" : "text-black"
        } cursor-pointer`}
      />
      {bookmarks && (
        <Typography
          variant="ParagraphNormalRegular"
          className={` ${isBookmarked ? "text-blue-500" : "text-black"}`}
        >
          {bookmarks}
        </Typography>
      )}
    </div>
  );
}
