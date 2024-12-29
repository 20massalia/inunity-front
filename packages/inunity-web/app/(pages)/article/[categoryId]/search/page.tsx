import ArticleSearchContainer from "@/app/(pages)/article/[categoryId]/search/container";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {

  return <SafeAreaView>
    <ArticleSearchContainer categoryId={params.categoryId}/>
  </SafeAreaView>
}