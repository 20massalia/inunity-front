import { MessageContext } from "@/components/MessageContext";
import { useContext } from "react";

export const useMessageManager = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessageManager must be used within a MessageProvider');
  }
  return context;
};

