import PostWriteContainer from "@/page/PostWriteContainer";
import SafeAreaView from "@/components/SafeAreaView";


export default function Page({params}: {params: {categoryId: string}}) {
  return (
    <SafeAreaView>
    
        <PostWriteContainer categoryId={params.categoryId}/>
    </SafeAreaView>
  );
}
