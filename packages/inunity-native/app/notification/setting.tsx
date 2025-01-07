import CustomWebView from "@/components/CustomWebView";
import { webViewOrigin } from "@/components/useWebView";

export default function Setting() {
  return <CustomWebView initialUrl={`${webViewOrigin}/notification/setting`} id="NotificationSetting" />
}
