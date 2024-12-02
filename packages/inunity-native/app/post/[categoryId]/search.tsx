import CustomWebView from "@/components/CustomWebView";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  return <CustomWebView initialPathname={`/post/${categoryId}/search`} />;
}
