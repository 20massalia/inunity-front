"use client";

import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MenuProvider } from "ui/contexts";

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    const queryClient = makeQueryClient();
    broadcastQueryClient({
      queryClient,
      broadcastChannel: "my-app",
    });
    return queryClient;
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    broadcastQueryClient({
      queryClient: browserQueryClient,
      broadcastChannel: "my-app",
    });
    return browserQueryClient;
  }
}

import { MessageProvider } from "./MessageContext";
import { useEffect } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MenuProvider>
        <MessageProvider>{children}</MessageProvider>
      </MenuProvider>
    </QueryClientProvider>
  );
}
