import SafeAreaView from "@/widgets/SafeAreaView";
import MySkills from "./container";

export default async function Page({
  params,
}: {
  params: { skillId: string };
}) {
  return (
    <SafeAreaView>
      <MySkills skillId={Number(params.skillId)} />
    </SafeAreaView>
  );
}
