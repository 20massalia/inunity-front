"use client";

import React, { useEffect } from "react";
import { useNativeRouter } from "@/hooks/useNativeRouter";

export default function MyDashboardPage() {
  const router = useNativeRouter();

  // 컴포넌트가 마운트될 때 리다이렉트
  useEffect(() => {
    router.push("/profile");
  }, [router]);

  return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
}
