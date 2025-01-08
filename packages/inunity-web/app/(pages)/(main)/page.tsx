import SafeAreaView from "@/widgets/SafeAreaView";
import getDehydratedQuery, { getDehydratedInfiniteQuery } from "@/lib/getDehydratedQuery";
import { Hydration } from "@/shared/ui/Hydration";
import NoticeDto from "@/entities/notice/model/NoticeDto";
import HomeContainer from "./container";
import ArticleDto from "@/entities/article/model/ArticleDto";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";

//SSR 파트
export default async function Page() {

  const noticeQueryOptions = ArticleQueries.infiniteArticleQuery({categoryId: 1});
  const noticesQuery = await getDehydratedInfiniteQuery(noticeQueryOptions);
  
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
