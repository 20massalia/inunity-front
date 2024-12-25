import ArticleWriteContainer from "@/app/(pages)/article/[categoryId]/write/container";
import SafeAreaView from "@/widgets/SafeAreaView";


export default function Page({params}: {params: {categoryId: string}}) {
  return (
    <SafeAreaView>
    
        <ArticleWriteContainer categoryId={params.categoryId}/>
    </SafeAreaView>
  );
}
