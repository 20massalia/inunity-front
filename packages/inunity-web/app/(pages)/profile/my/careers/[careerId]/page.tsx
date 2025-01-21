import SafeAreaView from "@/widgets/SafeAreaView";
import MyCareer from "./container";

export default async function Page({
  params,
}: {
  // careerId는 원래 string이 들어오므로 number 변환은 내부에서 처리
  params: { careerId: string };
}) {
  return (
    <SafeAreaView>
      <MyCareer careerId={Number(params.careerId)} />
    </SafeAreaView>
  );
}
