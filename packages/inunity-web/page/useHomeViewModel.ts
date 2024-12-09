import useNotice from "@/entities/notice/hooks/useNotice";
import usePosts from "@/entities/post/hooks/usePosts";
import useNotification from "@/features/notification/hooks/useNotification";

export default function useHomeViewModel() {
  const posts = usePosts();
  const notices = useNotice();
  const notifications = useNotification();
  return {
    posts,
    notices,
    notifications,
  }
}