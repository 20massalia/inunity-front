import PostListContainer from "@/components/container/PostListContainer";
import SafeAreaView from "@/components/SafeAreaView";

export default function Page() {

  return (
    <div>
      <meta name="theme-color" content="#000000"></meta>
      <SafeAreaView>
        <PostListContainer/>
      </SafeAreaView>
    </div>
  );
}
