"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import { useMessageManager } from "@/shared/ui/MessageContext";
import SafeAreaView from "@/widgets/SafeAreaView";
import { useEffect } from "react";
import { Button, Typography } from "ui";

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

  const router = useNativeRouter();

  return (
    <div className="h-dvh flex flex-col mx-5">
      <Typography variant="HeadingLargeBold" className="mb-4">
        로그인 중
        <br />
        문제가 발생했어요.
      </Typography>
      {code} | {message}
      <div className="mt-auto mb-5 flex flex-col gap-4">
        <Button variant="primary" size="large" onClick={() => router.back()}>
          구글 로그인으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
