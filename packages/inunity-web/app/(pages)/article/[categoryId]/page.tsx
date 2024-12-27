import getDehydratedQuery from "@/lib/getDehydratedQuery";
import ArticleListContainer from "@/app/(pages)/article/[categoryId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";
import { generateMockArticleThumbnails } from "@/entities/article/model/ArticleMock";

export default async function Page({ params }: { params: { categoryId: string } }) {
  const articlesQuery = await getDehydratedQuery({
    queryKey: ['articles'],
    queryFn: ({queryKey}) => generateMockArticleThumbnails(20)
  });
  return (
      <SafeAreaView>
        <Hydration queries={[articlesQuery]}>
        <ArticleListContainer categoryId={params.categoryId}  />
        </Hydration>
      </SafeAreaView>
  );
}
