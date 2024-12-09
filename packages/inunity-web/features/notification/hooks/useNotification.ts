import { useQuery } from "@tanstack/react-query";
import { Notification } from "../ui/NotificationItem";

export default function useNotification() {
  return useQuery<Notification[]>({ queryKey: ['notification'], });

}