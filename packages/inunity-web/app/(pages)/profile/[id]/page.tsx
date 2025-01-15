"use client";

import React from "react";
import ProfileContainer from "../container";
import SafeAreaView from "@/widgets/SafeAreaView";

interface ProfilePageProps {
  params: {
    id: number;
  };
}

export default function Page({ params }: ProfilePageProps) {
  const { id: userId } = params;
  return (
    <SafeAreaView>
      <ProfileContainer userId={userId} />
    </SafeAreaView>
  );
}
