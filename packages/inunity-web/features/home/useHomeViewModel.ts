import useNotice from "@/entities/notice/hooks/useNotice";
import useArticles from "@/entities/article/hooks/useArticles";
import useNotification from "@/features/notification/hooks/useNotification";

export default function useHomeViewModel() {
  const articles = useArticles();
  const notices = useNotice();
  const notifications = useNotification();
  return {
    articles,
    notices,
    notifications,
  }
}