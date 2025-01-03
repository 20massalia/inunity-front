import GoogleSuccess from "@/features/onboarding/ui/steps/GoogleSuccess";

export default async function Page({
  params,
}: {
  params: { code: string; message: string };
}) {
  const { code, message } = params;
  // return <div>
  //   {code} | {message}
  // </div>
  return <GoogleSuccess />;
}
