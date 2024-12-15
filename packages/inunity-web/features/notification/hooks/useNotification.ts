import { useQuery } from "@tanstack/react-query";
import { Notification } from "../ui/NotificationItem";

export default function useNotification() {
  const boardNotifications = useQuery<Notification[]>({ queryKey: ['notification', 'board'], });
  const systemNotifications = useQuery<Notification[]>({ queryKey: ['notification', 'system'], });

  return {
    boardNotifications,
    systemNotifications,
    length: 4
  }
}