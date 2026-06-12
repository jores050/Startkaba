"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface CoachApplication {
  id: string;
  email: string;
  fullName: string;
  coachApplicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  payoutInfo: {
    presentation?: string;
    expertise?: string;
    experience?: string;
    provider?: string;
    number?: string;
  } | null;
  createdAt: string;
}

export default function AdminCoachesPage() {
  const { data, mutate, isLoading } = useSWR<{ applications: CoachApplication[] }>(
    "/api/admin/coach-applications",
    fetcher
  );

  async function updateStatus(id: string, status: "APPROVED" | "REJECTED") {
    await fetch(`/api/admin/coach-applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    mutate();
  }

  const applications = data?.applications ?? [];
  const pending = applications.filter((a) => a.coachApplicationStatus === "PENDING");
  const others = applications.filter((a) => a.coachApplicationStatus !== "PENDING");

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-extrabold text-foreground mb-8">
        Demandes Coachs
      </h1>

      {isLoading ? (
        <div className="animate-pulse h-32 bg-border/20 rounded-2xl" />
      ) : applications.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-8 text-center">
          <p className="text-muted">Aucune demande pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {pending.length > 0 && (
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">
                En attente ({pending.length})
              </p>
              <div className="flex flex-col gap-4">
                {pending.map((a) => (
                  <ApplicationCard key={a.id} app={a} onUpdate={updateStatus} />
                ))}
              </div>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">
                Traitées ({others.length})
              </p>
              <div className="flex flex-col gap-4">
                {others.map((a) => (
                  <ApplicationCard key={a.id} app={a} onUpdate={updateStatus} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ApplicationCard({
  app,
  onUpdate,
}: {
  app: CoachApplication;
  onUpdate: (id: string, status: "APPROVED" | "REJECTED") => void;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-foreground">{app.fullName}</p>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              app.coachApplicationStatus === "APPROVED"
                ? "bg-green/20 text-green"
                : app.coachApplicationStatus === "REJECTED"
                ? "bg-error/20 text-error"
                : "bg-cta/20 text-cta"
            }`}>
              {app.coachApplicationStatus === "APPROVED" ? "Approuvé" : app.coachApplicationStatus === "REJECTED" ? "Refusé" : "En attente"}
            </span>
          </div>
          <p className="text-muted text-sm">{app.email}</p>
          {app.payoutInfo?.expertise && (
            <p className="text-foreground text-sm mt-2">
              <span className="font-semibold">Expertise :</span> {app.payoutInfo.expertise}
            </p>
          )}
          {app.payoutInfo?.presentation && (
            <p className="text-muted text-sm mt-1 leading-relaxed">{app.payoutInfo.presentation}</p>
          )}
          {app.payoutInfo?.provider && app.payoutInfo?.number && (
            <p className="text-muted text-xs mt-2">
              💳 {app.payoutInfo.provider} : {app.payoutInfo.number}
            </p>
          )}
        </div>
        {app.coachApplicationStatus === "PENDING" && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onUpdate(app.id, "APPROVED")}
              className="px-3 py-1.5 rounded-lg bg-green text-white text-xs font-bold hover:opacity-90"
            >
              Valider
            </button>
            <button
              onClick={() => onUpdate(app.id, "REJECTED")}
              className="px-3 py-1.5 rounded-lg border border-error text-error text-xs font-bold hover:bg-error/10"
            >
              Refuser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
