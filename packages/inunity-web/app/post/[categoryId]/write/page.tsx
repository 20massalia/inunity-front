import PostWriteContainer from "@/page/post/write";
import SafeAreaView from "@/widgets/SafeAreaView";


export default function Page({params}: {params: {categoryId: string}}) {
  return (
    <SafeAreaView>
    
        <PostWriteContainer categoryId={params.categoryId}/>
    </SafeAreaView>
  );
}
