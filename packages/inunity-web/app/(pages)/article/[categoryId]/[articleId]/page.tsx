import getDehydratedQuery from "@/lib/getDehydratedQuery";
import ArticleDetailContainer from "@/app/(pages)/article/[categoryId]/[articleId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";

export default async function Page({
  params,
}: {
  params: { categoryId: string; articleId: string };
}) {
  const articleQuery = await getDehydratedQuery({
    queryKey: ["article"],
    queryFn: ({ queryKey }) => ({
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
    }),
  });
  return (
    <SafeAreaView>
      <Hydration queries={[articleQuery]}>
        <ArticleDetailContainer {...params} />
      </Hydration>
    </SafeAreaView>
  );
}
