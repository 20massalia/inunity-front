import { faBell, faCheck, faChevronLeft, faChevronRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Notification = {
  id: number;
  isRead: boolean;
  title: string;
  content: string;
  time: string;
};

export default function NotificationItem({notification}: React.PropsWithChildren<{notification: Notification}>) {
  return (
    <div className="space-y-3">
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
            <FontAwesomeIcon icon={faBell}
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
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400" />
            </div>

            <p className="text-sm text-gray-600 mt-1">{notification.content}</p>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                {notification.time}
              </span>
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
