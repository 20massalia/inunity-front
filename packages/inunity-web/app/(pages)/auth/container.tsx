"use client";

import OnboardingFunnel from "@/features/onboarding/containers/OnboardingFunnel";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { useMessageManager } from "@/shared/ui/MessageContext";
import { MessageEventType } from "message-type/message-type";

export default function AuthContainer() {
  const router = useNativeRouter();
  const { messageManager } = useMessageManager();

  return (
    <div className="h-full flex flex-col">
      <OnboardingFunnel
        onComplete={() => {
          messageManager?.sendMessage(MessageEventType.Login);
          router.replace("/");
        }}
      />
    </div>
  );
}
