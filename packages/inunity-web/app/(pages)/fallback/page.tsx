import { cookies } from "next/headers";

export default function OAuthFallbackPage() {
  const cookie = cookies();
  const [accessToken, refreshToken] = [cookie.get('accessToken'), cookie.get('refreshToken')];
  console.debug(accessToken?.value, refreshToken?.value)

  return <div>
    accessToken: {accessToken?.value}<br/>
    refreshToken: {refreshToken?.value}
  </div>
}