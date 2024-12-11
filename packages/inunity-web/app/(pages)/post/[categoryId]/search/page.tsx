import PostSearchContainer from "@/app/(pages)/post/[categoryId]/search/container";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {

  return <SafeAreaView>
    <PostSearchContainer categoryId={params.categoryId}/>
  </SafeAreaView>
}