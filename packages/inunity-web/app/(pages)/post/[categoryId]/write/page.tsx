import PostWriteContainer from "@/app/(pages)/post/[categoryId]/write/container";
import SafeAreaView from "@/widgets/SafeAreaView";


export default function Page({params}: {params: {categoryId: string}}) {
  return (
    <SafeAreaView>
    
        <PostWriteContainer categoryId={params.categoryId}/>
    </SafeAreaView>
  );
}
