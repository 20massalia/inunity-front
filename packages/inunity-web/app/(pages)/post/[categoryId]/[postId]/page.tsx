import getDehydratedQuery from "@/lib/getDehydratedQuery";
import PostDetailContainer from "@/app/(pages)/post/[categoryId]/[postId]/container";
import { Hydration } from "@/shared/ui/Hydration";
import SafeAreaView from "@/widgets/SafeAreaView";

export default async function Page({ params }: { params: { categoryId: string, postId: string, } }) {
  const postQuery = await getDehydratedQuery({
    queryKey: ['post'],
    queryFn: ({queryKey}) => ( {
      title: "this is title",
      author: "author",
      avatarUrl: "https://github.com/KimWash.png",
      authorOrg: "CS",
      content: "this is test post",
      date: "2023-08-15",
      likes: 12,
      bookmarks: 5,
      postId: "2",
      isLiked: false,
      isBookmarked: false,
    })
  })
  return <SafeAreaView>
    <Hydration queries={[postQuery]}>
    <PostDetailContainer {...params}/>
    </Hydration>
  </SafeAreaView>
}