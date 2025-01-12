'use server';

import { platformResolver } from "@/lib/PlatformResolver";
import { headers } from "next/headers";
import { userAgent } from "next/server";

const SafeAreaView = (props: React.PropsWithChildren<{className?: string}>) => {
  const heads = headers();
  const ua = userAgent({headers: heads}).ua

  const {os, isWebView} = platformResolver(ua);
  return (
    <div
      className={`h-real-screen overflow-visible flex flex-col touch-none ${
        isWebView ? "pt-[--sat]" : ""
      } ${props?.className}`}
      style={{
        paddingTop: isWebView ? 'var(--sat)' : 0
      }}
    >
      {props?.children}      
    </div>
  );
};
export default SafeAreaView;