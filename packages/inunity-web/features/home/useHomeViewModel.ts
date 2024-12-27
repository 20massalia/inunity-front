import useNotice from "@/entities/notice/hooks/useNotice";
import useArticles from "@/entities/article/hooks/useArticles";
import useNotification from "@/features/notification/hooks/useNotification";
import useFeaturedArticles from "./useFeaturedArticles";

export default function useHomeViewModel() {
  const articles = useFeaturedArticles(5);
  const notices = useArticles();
  const notifications = useNotification();
  return {
    articles,
    notices,
    notifications,
  }
}