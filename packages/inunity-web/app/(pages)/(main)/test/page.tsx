"use client";

import { useMessageManager } from "@/shared/ui/MessageContext";
import { useState } from "react";
import { Button, Input } from "ui";

export default function Page() {
  const [form, setForm] = useState({ id: "", pw: "" });
  const {messageManager} = useMessageManager();

  return (
    <div>
      <Input
        value={form.id}
        setValue={function (value: string): void {
          setForm((prev) => ({ ...prev, id: value }));
        }}
      ></Input>
      <Input
        value={form.pw}
        setValue={function (value: string): void {
          setForm((prev) => ({ ...prev, pw: value }));
        }}
        masked
      ></Input>

      <Button
        onClick={() =>{
          fetch("https://inunity-server.squidjiny.com/v1/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include', // 쿠키를 포함하려면 이 옵션 필요
            body: JSON.stringify({ studentId: Number(form.id), password: form.pw }),
          }).then(res => {
            messageManager?.log(res.ok, res.status, Array.from(res.headers), document.cookie)
          }).catch()
        }
        }
      >
        로그인이다 새끼야
      </Button>

      <Button
        onClick={() =>
          location.href = 'https://inunity-server.squidjiny.com/oauth2/authorization/google'
        }
      >
        구글로 넘어가보아요~
      </Button>
    </div>
  );
}
