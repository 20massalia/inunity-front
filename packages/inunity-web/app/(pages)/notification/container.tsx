'use client';

import { PostListItemProps, SwipeableTabs, Typography } from "ui";
import NotificationItem from "@/features/notification/ui/NotificationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import useNotification from "@/features/notification/hooks/useNotification";

export default function NotificationListContainer({
}: {
}) {
  const {boardNotifications, systemNotifications} = useNotification();

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
                {boardNotifications.data?.map((noti, idx) => (
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
                {systemNotifications.data?.map((noti) => (
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
