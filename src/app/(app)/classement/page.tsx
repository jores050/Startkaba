"use client";

import { useUser } from "@/hooks/use-user";
import { Leaderboard } from "@/components/gamification/Leaderboard";

export default function ClassementPage() {
  const { user } = useUser();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-extrabold text-ink mb-1">
        Classement
      </h1>
      <p className="text-mid mb-8">
        Mesure-toi aux entrepreneurs de ta ville et de toute la région.
      </p>
      <Leaderboard defaultCity={user && user.city !== "OTHER" ? user.city : ""} />
    </div>
  );
}
