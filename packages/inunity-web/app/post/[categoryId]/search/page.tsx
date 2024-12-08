import PostSearchContainer from "@/page/PostSearchContainer";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {

  return <SafeAreaView>
    <PostSearchContainer categoryId={params.categoryId}/>
  </SafeAreaView>
}