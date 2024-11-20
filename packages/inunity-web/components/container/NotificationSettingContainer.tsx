"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, ToggleSwitch, Typography } from "ui";
import { faChevronLeft, fas } from "@fortawesome/free-solid-svg-icons";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import AppBar from "../AppBar";
import { useNativeRouter } from "@/hooks/useNativeRouter";

library.add(fas);

export default function NotificationSettingContainer() {
  const [checked, setChecked] = useState(false);
  const subscribedBoards = [{ icon: "list", name: "자유게시판" }] as {
    icon: IconName;
    name: string;
  }[];
  const router = useNativeRouter();
  return (
    <>
      <AppBar
        title={<Typography variant="HeadingNormalBold">알림 설정</Typography>}
        leftIcon={<FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />}
      />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <Typography variant="HeadingLargeBold">게시판</Typography>
          <ToggleSwitch checked={checked} setChecked={setChecked} />
        </div>
        {subscribedBoards.map((board) => (
          <div className="flex flex-row justify-between" key={board.name}>
            <Typography variant="ParagraphLargeRegular">
              <FontAwesomeIcon icon={board.icon} />
              &nbsp;
              {board.name}
            </Typography>
            <Button size={"small"} variant="danger">
              삭제
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
