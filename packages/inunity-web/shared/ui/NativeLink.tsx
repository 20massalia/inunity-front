"use client";

import { MessageEventType } from "message-type/message-type";
import Link, { LinkProps } from "next/link";
import { useCallback } from "react";
import { useMessageManager } from "../pages/MessageContext";

export function NativeLink({ href, ...props }: LinkProps) {
  const { messageManager } = useMessageManager();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      messageManager?.sendMessage(MessageEventType.Navigation, { path: href });
    },
    [href, messageManager]
  );

  return <Link href={href} onClick={handleClick} {...props} />;
}
