'use client';

import { useMessageManager } from "@/shared/ui/MessageContext";
import { useEffect } from "react";

export default function Page({ params }: { params: { code : string; message: string; } }) {
  const {code, message} = params;
  const m = useMessageManager();
  useEffect(() => {
    m.messageManager?.log(params.code, params.message)
  }, [params])
  return <div>
    {code} | {message}
  </div>
}