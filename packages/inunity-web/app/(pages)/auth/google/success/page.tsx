export default async function Page({
  params,
}: {
  params: { code: string; message: string };
}) {
  const { code, message } = params;
  return (
    <div className="p-4">
      <h1>구글 로그인 성공</h1>
      <p>코드: {code}</p>
      <p>메시지: {message}</p>
    </div>
  );
}
