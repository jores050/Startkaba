import useSWR from "swr";

interface CoachQuota {
  used: number;
  total: number;
  remaining: number;
  isPremium: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCoachQuota(levelId: number) {
  const { data, error, isLoading, mutate } = useSWR<CoachQuota>(
    `/api/coach/messages?levelId=${levelId}`,
    fetcher
  );
  return { quota: data, error, isLoading, mutate };
}
