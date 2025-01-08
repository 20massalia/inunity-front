import CustomWebView from "@/components/CustomWebView";
import { webViewOrigin } from "@/components/useWebView";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  return <CustomWebView initialUrl={`${webViewOrigin}/article/${categoryId}`} id={"ArticleList"} />;
}
