import CustomWebView from "@/components/CustomWebView";
import { useWebView } from "@/components/useWebView";

export default function Index() {
  const {setUrl} = useWebView();
  return (
    <CustomWebView
      initialPathname="/"
      onNavigationStateChange={({ url, navigationType }) => {
        setUrl(new URL(url).pathname);
      }}
    />
  );
}
