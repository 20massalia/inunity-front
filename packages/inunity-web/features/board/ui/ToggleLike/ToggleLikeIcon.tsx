import PostDto from "@/entities/post/model/PostDto";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "ui";

export type ToggleLikeProps = {
  post: PostDto;
};

export default function ToggleLikeIcon({ post }: ToggleLikeProps) {
  const queryClient = useQueryClient();
  const { likes: likeCount, isLiked: liked } = post;
  const toggleLike = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostDto[]>(["posts"]);
      queryClient.setQueryData(
        ["posts"],
        prevPost?.map((post) =>
          post.postId === id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
      // Todo: Server
      // ㅅ서버에서 변경 시도 . 실패/성공 둘다ㅣ 데이터 다시 가져옴
      // queryClient.invalidateQueries();
    },
  });

  return (
    <div
      className={`flex items-center gap-2`}
      onClick={(e) => {
        e.stopPropagation();
        toggleLike.mutate(post.postId);
      }}
    >
      <FontAwesomeIcon
        icon={faHeart}
        className={`w-6 ${
          liked ? "text-blue-500" : "text-black"
        } cursor-pointer`}
      />
      {likeCount && (
        <Typography
          variant="ParagraphNormalRegular"
          className={` ${liked ? "text-blue-500" : "text-black"}`}
        >
          {likeCount}
        </Typography>
      )}
    </div>
  );
}
