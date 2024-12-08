import { Card } from "ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoticeDto } from "@/components/viewModel/HomeViewModel";
import { PostListDto } from "@/components/viewModel/PostListViewModel";

export default function NoticeCard({ ...notice }: NoticeDto) {
  const queryClient = useQueryClient();
  const toggleBookmarkNotice = useMutation({
    mutationFn: async (id: string) => {
      // Optimistic Update. 제대로 서버에서 요청이 완료될 것을 상정.
      const prevPost = queryClient.getQueryData<PostListDto[]>([
        "notices",
      ]);
      queryClient.setQueryData(
        ["notices"],
        prevPost?.map((post) =>
          post.postId === id
            ? { ...post, isBookmarked: !post.isBookmarked }
            : post
        )
      );
      // Todo: Server
    },
  });

  return (
    <Card
      key={notice.content}
      content={notice.content}
      author={notice.author}
      fromUpdate={notice.date}
      isBookmarked={notice.isBookmarked}
      onToggleBookmark={() => {
        toggleBookmarkNotice.mutate(notice.postId);
      }}
    />
  );
}
