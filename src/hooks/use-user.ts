import useSWR from "swr";
import type { FullProfile } from "@/lib/dev/mock-profile";

export type { FullProfile };

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<FullProfile>(
    "/api/user/profile",
    fetcher
  );
  return { user: data, error, isLoading, mutate };
}
