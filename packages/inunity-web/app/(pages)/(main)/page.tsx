import SafeAreaView from "@/widgets/SafeAreaView";
import getDehydratedQuery from "@/lib/getDehydratedQuery";
import { Hydration } from "@/shared/ui/Hydration";
import NoticeDto from "@/entities/notice/model/NoticeDto";
import HomeContainer from "./container";
import ArticleDto from "@/entities/article/model/ArticleDto";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";

//SSR 파트
export default async function Page() {

  const noticeQueryOptions = ArticleQueries.featuredArticleQuery(5);
  const noticesQuery = await getDehydratedQuery(noticeQueryOptions);
  
  const articleQueryOptions = ArticleQueries.featuredArticleQuery(5);
  const articleQuery = await getDehydratedQuery(articleQueryOptions);
  
  return (
    <SafeAreaView>
      <Hydration queries={[ articleQuery, noticesQuery]}>
        <HomeContainer />
      </Hydration>
    </SafeAreaView>
  );
}
