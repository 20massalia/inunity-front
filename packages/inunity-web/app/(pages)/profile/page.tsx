import React from "react";
import ProfileContainer from "./container";
import SafeAreaView from "@/widgets/SafeAreaView";
import ogs from "open-graph-scraper";

export default async function Page() {
  const options = {
    url: 'https://github.com/KimWash/my-own-blog', 
    onlyGetOpenGraphInfo: true,
    timeout: 5000,
  };

  // const { result } = await ogs(options);

  // const project = {
  //   title: result.ogTitle || "",
  //   description: result.ogDescription || "",
  //   image: Array.isArray(result.ogImage) ? result.ogImage[0]?.url : "",
  // };
  return (
    <SafeAreaView>
      <ProfileContainer />
    </SafeAreaView>
  );
}
