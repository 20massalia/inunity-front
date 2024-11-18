import PostListContainer from "@/components/container/PostListContainer";
import SafeAreaView from "@/components/SafeAreaView";

export default function Page({params}: {params: {categoryId: string}}) {

    return (
      <div>
        <meta name="theme-color" content="#000000"></meta>
        <SafeAreaView>
          <PostListContainer categoryId={params.categoryId}/>
        </SafeAreaView>
      </div>
    );
  }
  