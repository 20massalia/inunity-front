"use client";

import React from "react";
import ProfileContainer from "./container";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page() {
  // 여기는 본인 프로필이므로 userId가 없다 치고,
  // 로그인 된 상태에서 백엔드가 본인 것으로 인지한다고 가정
  return (
    <SafeAreaView>
      <ProfileContainer />
    </SafeAreaView>
  );
}
