import GoogleLoginFailPage from "./container";
import SafeAreaView from "@/widgets/SafeAreaView";

export default function Page({
  searchParams,
}: {
  searchParams: { code: number; message: string };
}) {
  return (
    <SafeAreaView>
      <GoogleLoginFailPage {...searchParams} />
    </SafeAreaView>
  );
}
