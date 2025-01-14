import SafeAreaView from "@/widgets/SafeAreaView";
import MyCareer from "./container";

export default async function Page({ params }: { params: { index: number } }) {
  const careerId = params.index;

  return (
    <SafeAreaView>
      <MyCareer careerId={careerId} />
    </SafeAreaView>
  );
}
