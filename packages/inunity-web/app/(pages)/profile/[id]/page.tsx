import React from "react";
import ProfileContainer from "../container";
import SafeAreaView from "@/widgets/SafeAreaView";
import { getOGData } from "@/lib/ogFetcher";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

/**
 * (pages)/profile/[id]/page.tsx
 *  - URL 파라미터로 넘어온 id에 해당하는 사용자 프로필을 표시
 *  - 본인이 아니라면 수정 버튼이 나오지 않음
 */
export default async function Page({ params }: ProfilePageProps) {
  const { id: userId } = params;

  // 임시 프로젝트 링크 리스트
  const projectLinks = [
    "https://github.com/Your-Lie-in-April/server",
    "https://github.com/NFCoffee/frontend",
  ];

  // OG 데이터 가져오기
  const ogData = await Promise.all(projectLinks.map((link) => getOGData(link)));

  return (
    <SafeAreaView>
      <ProfileContainer userId={userId} ogData={ogData} />
    </SafeAreaView>
  );
}
