import React from "react";
import ProfileContainer from "./container";
import SafeAreaView from "@/widgets/SafeAreaView";

/**
 * (pages)/profile/page.tsx
 *  - 로그인된 사용자의 "내 프로필"을 보여줌
 *  - userId를 명시적으로 넘기지 않아도 됨 (내 아이디로 판단)
 */
export default function Page() {
  return (
    <SafeAreaView>
      <ProfileContainer />
    </SafeAreaView>
  );
}
