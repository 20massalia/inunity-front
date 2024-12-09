import PostSearchContainer from "@/page/post/search";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {

  return <SafeAreaView>
    <PostSearchContainer categoryId={params.categoryId}/>
  </SafeAreaView>
}