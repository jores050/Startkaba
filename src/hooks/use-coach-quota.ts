import useSWR from "swr";

export interface CoachQuota {
  used: number;
  total: number;
  remaining: number;
  isPremium: boolean;
}

interface CoachMessagesResponse {
  messages: {
    id: string;
    levelId: number;
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: string;
  }[];
  quota: CoachQuota;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCoachQuota(levelId: number) {
  const { data, error, isLoading, mutate } = useSWR<CoachMessagesResponse>(
    `/api/coach/messages?levelId=${levelId}`,
    fetcher
  );
  return { quota: data?.quota, messages: data?.messages, error, isLoading, mutate };
}
