import PostWriteContainer from "@/components/container/PostWriteContainer";
import SafeAreaView from "@/components/SafeAreaView";


export default function Page({params}: {params: {categoryId: string}}) {
  return (
    <SafeAreaView>
    
        <PostWriteContainer categoryId={params.categoryId}/>
    </SafeAreaView>
  );
}
