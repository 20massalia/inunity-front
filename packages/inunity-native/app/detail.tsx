import { router } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  Platform,
  Button,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import WebView from "react-native-webview";
import { ThemedText } from "@/components/ThemedText";
import AuthManager from "@/lib/AuthManager";
import { Message, MessageEventType, PostDetailPageEventType } from "message-type/message-type";
import { parseMessage, handleMessage } from "@/lib/MessageManager";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { NativeInput } from "@/components/NativeInput";
import NativeCheckBox from "@/components/NativeCheckBox";



export default function Detail() {
  const webViewRef = useRef<WebView>(null);
  const [cookie, setCookie] = useState<string | null>(null);
  useEffect(() => {
    AuthManager.getCredentialFromStorage().then((cookie) => {
      sendMessage({ event: MessageEventType.Auth, value: cookie });
      setCookie(cookie);
    });
  }, []);

  const sendMessage = (message: Message<any>) => {
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const write = () => sendMessage({
    event: MessageEventType.Page,
    value: {
      event: PostDetailPageEventType.SubmitComment,
      value: { text: comment, isAnonymous}
    }
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, }}>
        <WebView
          ref={webViewRef}
          injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}`}
          source={{
            uri: `${process.env.EXPO_PUBLIC_WEB_URL}/detail`,
          }}
          userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
          sharedCookiesEnabled
          onMessage={(event) => {
            const message = parseMessage(event.nativeEvent.data);
            handleMessage(message, {
              [MessageEventType.Navigation]: () => {
                router.push("/find");
              },
            });
          }}
        ></WebView>

      </View>
      <View style={[styles.commentInputContainer, styles.inputFlexBox]}>
        <View style={styles.anonymityWrapper}>
          <View style={styles.selectedStateWrapper}>
           <NativeCheckBox checked={isAnonymous} setChecked={setIsAnonymous}/>
            <ThemedText style={[styles.anonymityText, styles.textTypo]}>
              익명
            </ThemedText>
          </View>
          <ThemedText onPress={write} style={[styles.submitText, styles.textTypo]}>
            작성
          </ThemedText>
        </View>
          <NativeInput
            value={comment}
            setValue={setComment}
            placeholder="댓글을 입력해주세요."
          />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputFlexBox: {
    alignSelf: "stretch",
    overflow: "hidden",
  },
  checkboxesFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    fontSize: 12,
  },
  container: {
    borderRadius: 2,
    backgroundColor: "#65558f",
    width: 18,
    height: 18,
    zIndex: 0,
  },
  checkSmallIcon: {
    position: "absolute",
    marginTop: -12,
    marginLeft: -12,
    top: "50%",
    left: "50%",
    width: 24,
    height: 24,
    zIndex: 1,
  },
  stateLayer: {
    borderRadius: 100,
    flexDirection: "row",
  },
  anonymityText: {
    color: "#000",
  },
  selectedStateWrapper: {
    paddingTop: 8,
    paddingBottom: 5,
    gap: 10,
    flexDirection: "row",
    alignItems: 'center',
    overflow: "hidden",
  },
  submitText: {
    color: "#007aff",
  },
  anonymityWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  inputPlaceholderText: {
    color: "#494949",
    width: "100%",
  },
  inputFieldWrapper: {
    borderRadius: 50,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  commentInputContainer: {
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30,
    overflow: "hidden",
  },
});
