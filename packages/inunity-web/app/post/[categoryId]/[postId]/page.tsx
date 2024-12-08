import PostDetailContainer from "@/components/container/PostDetailContainer";
import SafeAreaView from "@/components/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string, postId: string, } }) {

  return <SafeAreaView>
    <PostDetailContainer {...params}/>
  </SafeAreaView>
}