import getDehydratedQuery, { getDehydratedInfiniteQuery } from "@/lib/getDehydratedQuery";
import ArticleListContainer from "@/app/(pages)/article/[categoryId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";
import { generateMockArticleThumbnails } from "@/entities/article/model/ArticleMock";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";

export default async function Page({ params }: { params: { categoryId: number } }) {
  const articlesOptions = ArticleQueries.infiniteArticleQuery({categoryId: params.categoryId})
  const articlesQuery = await getDehydratedInfiniteQuery(articlesOptions);
  return (
      <SafeAreaView>
        <Hydration queries={[articlesQuery]}>
        <ArticleListContainer categoryId={params.categoryId}  />
        </Hydration>
      </SafeAreaView>
  );
}
