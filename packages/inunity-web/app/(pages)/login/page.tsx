"use client";

import { useMessageManager } from "@/shared/ui/MessageContext";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { platformResolver } from "@/lib/PlatformResolver";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageEventType } from "message-type/message-type";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { Button } from "ui/components";
import { Input } from "ui/components";
import { Typography } from "ui/components";

const requestLogin = async (id: string, pw: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  return fetch(`${apiUrl}/v1/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId: id, password: pw }),
    method: "POST",
    credentials: "include",
  });
};

const checkValidity = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  return fetch(`${apiUrl}/v1/auth/test`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
  });
};

export default function Login() {
  const [form, setForm] = useState({ id: "", pw: "" });
  const edit = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const { messageManager } = useMessageManager();
  const router = useNativeRouter();

  const onSubmit = async () => {
    messageManager?.log("sending login request");
    try {
      const res = await requestLogin(form.id, form.pw);
      messageManager?.sendMessage(
        MessageEventType.Log,
        `Response status: ${res.status}`
      );

      if (res.ok) {
        const data = await res.json();
        messageManager?.sendMessage(
          MessageEventType.Log,
          `Login successful: ${data.message}`
        );
        messageManager?.sendMessage(MessageEventType.Login, document.cookie);
        router.replace("/list");
      } else {
        const errorData = await res.json();
        messageManager?.sendMessage(
          MessageEventType.Log,
          `Login failed: ${errorData.message}`
        );
        messageManager?.sendMessage(MessageEventType.Logout);
      }
    } catch (err) {
      messageManager?.sendMessage(
        MessageEventType.Log,
        `Login error: ${(err as Error).message}`
      );
    }
  };

  const { isWebView } = platformResolver(navigator.userAgent.toLowerCase());

  useEffect(() => {
    checkValidity().then(async (res) => {
      if (!isWebView) return;
      messageManager?.sendMessage(MessageEventType.Log, res.status);
      if (res.ok) router.replace("/list");
    });
  }, [checkValidity]);

  const [pwVisible, setPwVisible] = useState(false);
  const pwRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`p-5 gap-3 flex flex-col `}>
      <Typography variant="HeadingLargeBold">아이디</Typography>
      <Input
        value={form.id}
        setValue={(value) => edit("id", value)}
        placeholder="포탈 아이디"
      />
      <Typography variant="HeadingLargeBold">비밀번호</Typography>
      <Input
        ref={pwRef}
        value={form.pw}
        setValue={(value) => edit("pw", value)}
        placeholder="포탈 비밀번호"
        masked={!pwVisible}
        rightIcon={
          <FontAwesomeIcon
            icon={pwVisible ? faEye : faEyeSlash}
            onClick={() => {
              setPwVisible((prev) => !prev);
              pwRef.current?.focus();
            }}
          />
        }
      />

      <p
        onClick={() =>
          messageManager?.sendMessage(MessageEventType.Navigation, {
            route: "find",
            pararms: { param1: "param1" },
          })
        }
      >
        Lost Password?
      </p>
      <Button onClick={onSubmit}> 로그인 </Button>
    </div>
  );
}
