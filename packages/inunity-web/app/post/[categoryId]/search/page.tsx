import PostSearchContainer from "@/components/container/PostSearchContainer";
import SafeAreaView from "@/components/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {

  return <SafeAreaView>
    <PostSearchContainer categoryId={params.categoryId}/>
  </SafeAreaView>
}