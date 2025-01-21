import getDehydratedQuery, {
  getDehydratedInfiniteQuery,
} from "@/lib/getDehydratedQuery";
import ArticleListContainer from "@/app/(pages)/article/[categoryId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import CategoryQuery from "@/entities/category/hooks/CategoryQuery";

export default async function Page({
  params,
}: {
  params: { categoryId: number };
}) {
  const articlesOptions = ArticleQueries.infiniteArticleQuery({
    categoryId: params.categoryId,
  });
  const articlesQuery = await getDehydratedInfiniteQuery(articlesOptions);
  const categoryQuery = await getDehydratedQuery(CategoryQuery.list());
  return (
    <SafeAreaView>
      {categoryQuery.state.data?.find(({ id }) => id == params.categoryId) ? (
        <Hydration queries={[articlesQuery]}>
          <ArticleListContainer categoryId={params.categoryId} />
        </Hydration>
      ) : (
        <div>올바르지 않은 카테고리.</div>
      )}
    </SafeAreaView>
  );
}
