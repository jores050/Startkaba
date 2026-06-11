import useSWR from "swr";
import type { Notification } from "@/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useNotifications() {
  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    "/api/notifications",
    fetcher,
    { refreshInterval: 30000 }
  );
  const unreadCount = data?.filter((n) => !n.read).length ?? 0;
  return { notifications: data, unreadCount, error, isLoading, mutate };
}
