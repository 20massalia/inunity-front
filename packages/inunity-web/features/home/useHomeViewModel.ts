import useNotice from "@/entities/notice/hooks/useNotice";
import useArticles from "@/entities/article/hooks/useArticles";
import useFeaturedArticles from "./useFeaturedArticles";
import useServerNotification from "@/entities/notification/hooks/useServerNotification";

export default function useHomeViewModel() {
  const articles = useFeaturedArticles();
  // Todo: 공지사항 필터링되는거 만들기 
  const notices = useArticles({categoryId: 1});
  const notifications = useServerNotification();
  return {
    articles,
    notices,
    notifications,
  }
}