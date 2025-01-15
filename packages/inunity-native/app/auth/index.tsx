import CustomWebView from "@/components/CustomWebView";
import { useWebViewWithId, webViewOrigin } from "@/components/useWebView";
import { useState, useEffect } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

export default function Index() {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const handleKeyboardEvents = (e: KeyboardEvent) => {
      console.log(
        e.endCoordinates.height,
        Dimensions.get("screen").height - e.endCoordinates.height
      );
      setKeyboardHeight(e.endCoordinates.height);
    };

    Keyboard.addListener("keyboardDidShow", handleKeyboardEvents);
    Keyboard.addListener("keyboardDidHide", () => setKeyboardHeight(0));

    return () => {
      Keyboard.removeAllListeners("keyboardWillShow");
    };
  }, []);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardHeight }
      style={{ flex: 1 }}
    >
      <View
        style={{ height: Dimensions.get("window").height - keyboardHeight, paddingBottom: 10 }}
      >
        <CustomWebView initialUrl={`${webViewOrigin}/auth`} id={"Auth"} />
      </View>
    </KeyboardAvoidingView>
  );
}
