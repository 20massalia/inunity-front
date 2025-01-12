import ArticleSearchContainer from "@/app/(pages)/article/[categoryId]/search/container";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({ params }: { params: { categoryId: number } }) {

  return <SafeAreaView>
    <ArticleSearchContainer categoryId={params.categoryId}/>
  </SafeAreaView>
}