"use client";

import React, { forwardRef, memo, useCallback } from "react";
import { startGoogleOAuth } from "@/features/onboarding/api/onboarding.api";

type OAuthButtonProps = {
  provider: "google";
  /** 클릭 핸들러를 직접 넘기면 그 로직을 실행합니다. (기본: startGoogleOAuth 호출 후 이동) */
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  authUrl?: string;
  /** OAuth URL을 동적으로 가져오는 함수(선택) */
  getAuthUrl?: () => Promise<string | undefined>;
  preferPopup?: boolean;
  className?: string;
};

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.9 31.7 29.4 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c10 0 19-7.3 19-20 0-1.3-.1-2.2-.4-2.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.6 16.6 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5 29.6 3 24 3 16 3 8.9 7.6 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 43c5.3 0 10.2-2 13.8-5.3l-6.4-5.2C29.4 35 26.9 36 24 36c-5.4 0-9.9-3.3-11.6-7.9l-6.6 5.1C8.4 38.2 15.6 43 24 43z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.7-4.8 8-11.3 8-6.6 0-12-5.4-12-12 0-1.3.2-2.6.6-3.8l-6.6-5.1C4.7 16.8 4 19.8 4 23c0 11.1 8.9 20 20 20 10 0 19-7.3 19-20 0-1.3-.1-2.2-.4-2.5z"
    />
  </svg>
);

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const OAuthButton = memo(
  forwardRef<HTMLButtonElement, OAuthButtonProps>(function OAuthButton(
    {
      provider,
      onClick,
      loading = false,
      disabled = false,
      fullWidth = true,
      label = "Google로 로그인",
      authUrl,
      getAuthUrl,
      preferPopup = false,
      className,
    },
    ref
  ) {
    const handleDefault = useCallback(async () => {
      let url = authUrl;

      if (!url && getAuthUrl) {
        try {
          url = (await getAuthUrl()) || url;
        } catch {
          /* no-op */
        }
      }

      if (!url) {
        try {
          const { url: fetched } = await startGoogleOAuth();
          url = fetched;
        } catch {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;
        }
      }

      if (!url) {
        alert("로그인 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }

      if (preferPopup) {
        const w = window.open(
          url,
          "oauth-google",
          "width=480,height=700,noopener,noreferrer"
        );
        if (!w) window.location.href = url; // 팝업 차단 시 현재 창 이동
      } else {
        window.location.href = url;
      }
    }, [authUrl, getAuthUrl, preferPopup]);

    const handleClick = useCallback(async () => {
      if (disabled || loading) return;
      if (onClick) {
        await onClick();
        return;
      }
      await handleDefault();
    }, [disabled, loading, onClick, handleDefault]);

    const isGoogle = provider === "google";

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={handleClick}
        disabled={disabled || loading}
        className={cx(
          "relative inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium shadow-sm transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2",
          loading || disabled
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-gray-50 active:scale-[.98]",
          fullWidth ? "w-full" : "",
          className
        )}
      >
        {isGoogle && <GoogleIcon />}
        <span>{loading ? "로그인 중…" : label}</span>
        {loading && (
          <span
            aria-hidden
            className="absolute right-3 inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
          />
        )}
      </button>
    );
  })
);

export default OAuthButton;
