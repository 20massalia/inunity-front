import { NotificationQueryOptions } from "@/entities/notification/hooks/useServerNotification";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import fetchExtended from "@/lib/fetchExtended";
import Page from "@/shared/types/Page";
import {
  faBell,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { keyBy } from "lodash";
enum NotificationType {
  comment,
  article,
  category,
}

export interface ResponseNotification {
  id: number;
  type: NotificationType;
  categoryId: number;
  articleId: number;
  title: string;
  content: string;
  isPushed: boolean;
  isRead: boolean;
}

export default function NotificationItem({
  notification,
}: React.PropsWithChildren<{ notification: ResponseNotification }>) {
  const queryClient = useQueryClient();
  const router = useNativeRouter();
  const readMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetchExtended(`v1/notification/${id}`, { method: "PUT" });
    },
    onMutate: async (id: number) => {
      const prevData = queryClient.getQueriesData<
        InfiniteData<Page<ResponseNotification>>
      >({ queryKey: NotificationQueryOptions.queryKey });
      for (const [key, data] of prevData) {
        if (!data) return;
        const pages = data.pages.map((page) => ({
          ...page,
          content: page.content.map((notification) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          ),
        }));
        queryClient.setQueryData<InfiniteData<Page<ResponseNotification>>>(
          key,
          { ...data, pages }
        );
      }
      router.push(
        `article/${notification.categoryId}/${notification.articleId}`
      );
    },
    onError: (e) => {
      alert("읽음 처리에 실패했습니다..");
      queryClient.invalidateQueries({
        queryKey: NotificationQueryOptions.queryKey,
      });
    },
  });
  return (
    <div className="space-y-3" onClick={() => {
      readMutation.mutate(notification.id)
    }}>
      <div
        key={notification.id}
        className={`
              bg-white rounded-lg shadow-sm p-4 cursor-pointer
              hover:bg-gray-50 transition-colors
              ${
                !notification.isRead
                  ? "border-l-4 border-l-blue-500"
                  : "border border-gray-200"
              }
            `}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <FontAwesomeIcon
              icon={faBell}
              className={`w-5 h-5 ${
                notification.isRead ? "text-gray-400" : "text-blue-500"
              }`}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3
                className={`font-medium ${
                  !notification.isRead ? "text-blue-900" : "text-gray-900"
                }`}
              >
                {notification.title}
              </h3>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-gray-400"
              />
            </div>

            <p className="text-sm text-gray-600 mt-1">{notification.content}</p>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              {/* <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                {notification.time}
              </span> */}
              {notification.isRead && (
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                  읽음
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
