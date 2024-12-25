import getDehydratedQuery from "@/lib/getDehydratedQuery";
import ArticleListContainer from "@/app/(pages)/article/[categoryId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";

export default async function Page({ params }: { params: { categoryId: string } }) {
  const articlesQuery = await getDehydratedQuery({
    queryKey: ['articles'],
    queryFn: ({queryKey}) => [
      {
        title: "this is title",
        author: "author",
        avatarUrl: "https://github.com/KimWash.png",
        authorOrg: "CS",
        content: "this is test article",
        date: "2023-08-15",
        likes: 12,
        bookmarks: 5,
        articleId: "2",
        isLiked: false,
        isBookmarked: false,
      },
    ]
  });
  return (
      <SafeAreaView>
        <Hydration queries={[articlesQuery]}>
        <ArticleListContainer categoryId={params.categoryId}  />
        </Hydration>
      </SafeAreaView>
  );
}
