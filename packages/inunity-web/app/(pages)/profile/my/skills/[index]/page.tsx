import SafeAreaView from "@/widgets/SafeAreaView";
import MySkills from "./container";

export default async function Page({ params }: { params: { index: number } }) {
  const skillId = params.index;

  return (
    <SafeAreaView>
      <MySkills skillId={skillId} />
    </SafeAreaView>
  );
}
