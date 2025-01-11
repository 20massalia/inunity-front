import SafeAreaView from "@/widgets/SafeAreaView";
import ArticleEditContainer from "./container";

export default function Page({ params }: { params: { articleId: number } }) {
  return (
    <SafeAreaView>
      <ArticleEditContainer articleId={params.articleId} />
    </SafeAreaView>
  );
}
