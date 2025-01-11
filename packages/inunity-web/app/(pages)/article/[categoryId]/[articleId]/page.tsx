import getDehydratedQuery from "@/lib/getDehydratedQuery";
import ArticleDetailContainer from "@/app/(pages)/article/[categoryId]/[articleId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";

export default async function Page({
  params,
}: {
  params: { categoryId: number; articleId: number };
}) {
  const queryOptions = ArticleQueries.singleArticleQuery(params.articleId);
  const articleQuery = await getDehydratedQuery(queryOptions);

  
  console.log(articleQuery);
  return (
    <SafeAreaView>
      <Hydration queries={[articleQuery]}>
        <ArticleDetailContainer {...params} />
      </Hydration>
    </SafeAreaView>
  );
}
