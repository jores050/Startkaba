import useSWR, { useSWRConfig } from "swr";
import type { LevelSummary } from "@/lib/progress/compute";
import type { Lesson, MissionConfig, MissionStatus } from "@/types";

export interface TaskWithProgress {
  id: number;
  title: string;
  description: string;
  xp: number;
  quizQuestionCount: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  quizScore: number | null;
  xpEarned: number;
  completedAt: string | null;
  lesson?: Lesson;
  recapLabel?: string;
  taskType?: "reflexion" | "mission";
  missionStatus?: MissionStatus | null;
  missionCaptureIndexes?: number[];
  missionConfig?: MissionConfig;
}

export interface LevelDetail extends LevelSummary {
  tasks: TaskWithProgress[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? `Erreur ${res.status}`);
  }
  return res.json();
};

export function useLevels() {
  const { data, error, isLoading, mutate } = useSWR<{ levels: LevelSummary[] }>(
    "/api/levels",
    fetcher
  );
  return { levels: data?.levels, error, isLoading, mutate };
}

export function useLevelDetail(levelId: number) {
  const { data, error, isLoading, mutate } = useSWR<LevelDetail>(
    Number.isInteger(levelId) && levelId >= 1 && levelId <= 8
      ? `/api/levels/${levelId}`
      : null,
    fetcher
  );
  return { level: data, error, isLoading, mutate };
}

// Démarre une tâche puis revalide le niveau et la liste des niveaux.
export function useStartTask(levelId: number) {
  const { mutate } = useSWRConfig();

  async function startTask(taskId: number): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch(`/api/tasks/${taskId}/start`, { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { ok: false, error: data?.error ?? "Erreur lors du démarrage" };
    }
    await Promise.all([
      mutate(`/api/levels/${levelId}`),
      mutate("/api/levels"),
    ]);
    return { ok: true };
  }

  return { startTask };
}
