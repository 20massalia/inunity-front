import React from "react";
import ProfileContainer from "./container";
import SafeAreaView from "@/widgets/SafeAreaView";
import { getOGData } from "@/lib/ogFetcher";

/**
 * (pages)/profile/page.tsx
 * - 로그인된 사용자의 "내 프로필"을 보여줌
 * - userId를 명시적으로 넘기지 않아도 됨 (내 아이디로 판단)
 */
export default async function Page() {
  // 임시 프로젝트 링크 리스트
  const projectLinks = [
    "https://github.com/Your-Lie-in-April/server",
    "https://github.com/NFCoffee/frontend",
  ];

  // OG 데이터 가져오기
  const ogData = await Promise.all(projectLinks.map((link) => getOGData(link)));

  return (
    <SafeAreaView>
      <ProfileContainer ogData={ogData} />
    </SafeAreaView>
  );
}
