import PostListContainer from "@/page/PostListContainer";
import SafeAreaView from "@/components/SafeAreaView";

export default function Page({ params }: { params: { categoryId: string } }) {
  return (
      <SafeAreaView>
        <PostListContainer categoryId={params.categoryId} />
      </SafeAreaView>
  );
}
