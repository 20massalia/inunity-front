import SafeAreaView from "@/widgets/SafeAreaView";
import MyPortfolio from "./[portfolioId]/container";

export default async function Page() {
  return (
    <SafeAreaView>
      <MyPortfolio />
    </SafeAreaView>
  );
}
