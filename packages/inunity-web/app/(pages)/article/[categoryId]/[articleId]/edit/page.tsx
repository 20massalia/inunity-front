import SafeAreaView from "@/widgets/SafeAreaView";
import ArticleEditContainer from "./container";
import ArticleQueries from "@/entities/article/hooks/ArticleQueries";
import getDehydratedQuery from "@/lib/getDehydratedQuery";
import { Hydration } from "@/shared/ui/Hydration";

export default async function Page({
  params,
}: {
  params: { articleId: number };
}) {
  const queryOptions = ArticleQueries.singleArticleQuery(params.articleId);
  const articleQuery = await getDehydratedQuery(queryOptions);

  return (
    <SafeAreaView>
      <Hydration queries={[articleQuery]}>
        <ArticleEditContainer articleId={params.articleId} />
      </Hydration>
    </SafeAreaView>
  );
}
