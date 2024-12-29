import SafeAreaView from "@/widgets/SafeAreaView";
import getDehydratedQuery from "@/lib/getDehydratedQuery";
import { Hydration } from "@/shared/ui/Hydration";
import NoticeDto from "@/entities/notice/model/NoticeDto";
import HomeContainer from "./container";
import ArticleDto from "@/entities/article/model/ArticleDto";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";

//SSR 파트
export default async function Page() {
  const scheduleQuery = await getDehydratedQuery({
    queryKey: ["schedules"],
    queryFn: () => {
      // mocked function
      return [
        {
          name: "수강신청",
          dateStart: new Date("2024-02-01"),
          dateEnd: new Date("2024-02-20"),
        },
        {
          name: "수강신청2",
          dateStart: new Date("2024-03-01"),
          dateEnd: new Date("2024-03-20"),
        },
        {
          name: "수강신청3",
          dateStart: new Date("2024-04-01"),
          dateEnd: new Date("2024-04-20"),
        },
      ];
    },
  });
  const noticesQuery = await getDehydratedQuery<NoticeDto[]>({
    queryKey: ["notices"],
    queryFn: () => {
      // mocked function
      return [
        {
          author: "작성자",
          isBookmarked: false,
          date: "2024-01-01",
          content: "대충 내용입니다.",
          avatarUrl: "",
          articleId: "2",
          title: "제목입니다.",
        },
      ];
    },
  });
  //
  const articleQueryOptions = ArticleQueries.featuredArticleQuery(5);
  const articleQuery = await getDehydratedQuery(articleQueryOptions);
  return (
    <SafeAreaView>
      <Hydration queries={[scheduleQuery, articleQuery, noticesQuery]}>
        <HomeContainer />
      </Hydration>
    </SafeAreaView>
  );
}
