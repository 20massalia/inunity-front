import CustomWebView from "@/components/CustomWebView";
import { webViewOrigin } from "@/components/useWebView";

export default function Index() {
  return <CustomWebView initialUrl={`${webViewOrigin}/notification`} id='NotificationList' />
}
