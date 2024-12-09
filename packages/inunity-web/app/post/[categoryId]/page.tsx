import PostListContainer from "@/page/post/list";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {
  return (
      <SafeAreaView>
        <PostListContainer categoryId={params.categoryId} />
      </SafeAreaView>
  );
}
