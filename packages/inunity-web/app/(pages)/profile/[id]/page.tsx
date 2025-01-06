import React from "react";
import ProfileContainer from "../container";
import SafeAreaView from "@/widgets/SafeAreaView";

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
export default function Page({ params }: ProfilePageProps) {
  return (
    <SafeAreaView>
      <ProfileContainer userId={params.id} />
    </SafeAreaView>
  );
}
