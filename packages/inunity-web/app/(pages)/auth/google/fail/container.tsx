'use client';

import { useMessageManager } from "@/shared/ui/MessageContext";
import SafeAreaView from "@/widgets/SafeAreaView";
import { useEffect } from "react";

export default function GoogleLoginFailPage({
  code,
  message,
}: {
  code: number;
  message: string;
}) {
  const m = useMessageManager();
  useEffect(() => {
    m.messageManager?.log(code, message);
  }, [code, m.messageManager, message]);

  return <div>{message}</div>
}
