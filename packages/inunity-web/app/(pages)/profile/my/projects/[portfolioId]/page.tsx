import SafeAreaView from "@/widgets/SafeAreaView";
import MyPortfolio from "./container";

export default async function Page({
  params,
}: {
  params: { portfolioId: string };
}) {
  return (
    <SafeAreaView>
      <MyPortfolio portfolioId={Number(params.portfolioId)} />
    </SafeAreaView>
  );
}
