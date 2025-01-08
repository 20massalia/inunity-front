import useNotice from "@/entities/notice/hooks/useNotice";
import useArticles from "@/entities/article/hooks/useArticles";
import useNotification from "@/features/notification/hooks/useNotification";
import useFeaturedArticles from "./useFeaturedArticles";

export default function useHomeViewModel() {
  const articles = useFeaturedArticles(5);
  // Todo: 공지사항 필터링되는거 만들기 
  const notices = useArticles({});
  const notifications = useNotification();
  return {
    articles,
    notices,
    notifications,
  }
}