"use client";

import {
  ArticleListItemProps,
  ScrollView,
  SwipeableTabs,
  Typography,
} from "ui";
import NotificationItem from "@/features/notification/ui/NotificationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "@/widgets/AppBar";
import useServerNotification from "@/entities/notification/hooks/useServerNotification";
import { ClipLoader } from "react-spinners";

export default function NotificationListContainer() {
  const notifications = useServerNotification();
  const router = useNativeRouter();

  return (
    <>
      <AppBar
        center={<Typography variant="HeadingNormalBold">알림</Typography>}
        leftIcon={
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        }
        rightIcon={
          <FontAwesomeIcon
            icon={faGear}
            onClick={() => router.push("/notification/setting")}
          />
        }
      />
      <SwipeableTabs
        tabs={[
          {
            id: 0,
            title: "게시판",
            content: (
              <ScrollView
                className=" gap-3 pt-3"
                onReachBottom={() => {
                  if (!notifications.hasNextPage) notifications.fetchNextPage();
                }} // 최하단으로 스크롤됐을 때 이벤트. isLoading: false일 때 fetchNextPage() 호출해주기.
                onRefresh={() => {
                  notifications.refetch();
                }}
              >
                {notifications.isRefetching && (
                  <div className="flex flex-row justify-center">
                    {<ClipLoader />}
                  </div>
                )}
                {notifications.data?.pages
                  .flatMap((page) => page.content)
                  .map((noti, idx) => (
                    <NotificationItem key={noti.id} notification={noti} />
                  ))}
              </ScrollView>
            ),
          },
          {
            id: 1,
            title: "시스템",
            content: (
              <div className="p-5 gap-3 flex flex-col">
                {/* {[].map((noti) => (
                  // <NotificationItem key={noti.id} notification={noti} />
                ))} */}
              </div>
            ),
          },
        ]}
      ></SwipeableTabs>
    </>
  );
}
