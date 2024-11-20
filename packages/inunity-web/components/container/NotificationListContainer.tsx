'use client';

import { PostListItemProps, Typography } from "ui";
import NotificationItem, { Notification } from "../NotificationItem";
import SwipeableTabs from "../SwipeableTabs";
import AppBar from "../AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNativeRouter } from "@/hooks/useNativeRouter";

export default function NotificationListContainer({
  boardNotiList,
  systemNotiList,
}: {
  boardNotiList: PostListItemProps[];
  systemNotiList: Notification[];
}) {
  const router = useNativeRouter();
  return (
    <>
      <AppBar
        title={<Typography variant="HeadingNormalBold">알림</Typography>}
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
                {boardNotiList.map((post, idx) => (
                  <NotificationItem
                    key={post.postId}
                    notification={{
                      title: "게시판에 새로운 글이 등록됐어요.",
                      content: post.content,
                      id: idx,
                      isRead: false,
                      time: post.date,
                    }}
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
