import CustomWebView from "@/components/CustomWebView";
import { webViewOrigin } from "@/components/useWebView";
import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";

export default function Screen() {
  const { categoryId, articleId } = useLocalSearchParams<{
    articleId: string;
    categoryId: string;
  }>();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <CustomWebView
          initialUrl={`${webViewOrigin}/article/${categoryId}/${articleId}/edit`}
          id={"ArticleEdit"}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
