'use client';

import { PostListItemProps, Typography } from "ui";
import NotificationItem, { Notification } from "../NotificationItem";
import SwipeableTabs from "../SwipeableTabs";
import AppBar from "../AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { PostListDto } from "../viewModel/PostListViewModel";

export default function NotificationListContainer({
  boardNotiList,
  systemNotiList,
}: {
  boardNotiList: Notification[];
  systemNotiList: Notification[];
}) {
  const router = useNativeRouter();
  return (
    <>
      <AppBar
        center={<Typography variant="HeadingNormalBold">알림</Typography>}
        leftIcon={<FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />}
        rightIcon={<FontAwesomeIcon icon={faGear} onClick={() => router.push('/notification/setting')} />}
      />
      <SwipeableTabs
        tabs={[
          {
            id: 0,
            title: "게시판",
            content: (
              <div className="p-5 gap-3 flex flex-col">
                {boardNotiList.map((noti, idx) => (
                  <NotificationItem
                    key={noti.id}
                    notification={noti}
                  />
                ))}
              </div>
            ),
          },
          {
            id: 1,
            title: "시스템",
            content: (
              <div className="p-5 gap-3 flex flex-col">
                {systemNotiList.map((noti) => (
                  <NotificationItem key={noti.id} notification={noti} />
                ))}
              </div>
            ),
          },
        ]}
      ></SwipeableTabs>
    </>
  );
}
