'use server';

import { platformResolver } from "@/lib/PlatformResolver";
import { headers } from "next/headers";
import { userAgent } from "next/server";

const SafeAreaView = (props: React.PropsWithChildren<{className?: string}>) => {
  // const { os, isWebView } = usePlatform();
  const heads = headers();
  const ua = userAgent({headers: heads}).ua

  const {os, isWebView} = platformResolver(ua);
  return (
    <div
      className={`h-dvh overflow-visible flex flex-col ${
        os == "ios" && isWebView ? "pt-[50px]" : ""
      } ${props?.className}`}
    >
      {props?.children}      
    </div>
  );
};
export default SafeAreaView;