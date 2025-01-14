import SafeAreaView from "@/widgets/SafeAreaView";
import MyPortfolio from "./container";

export default async function Page({ params }: { params: { index: number } }) {
  const portfolioId = params.index;

  return (
    <SafeAreaView>
      <MyPortfolio portfolioId={portfolioId} />
    </SafeAreaView>
  );
}
