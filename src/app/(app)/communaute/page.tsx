"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { CITIES } from "@/lib/validations/auth";
import type { Mentor, CommunityProfile, ConnectionRequest } from "@/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CITY_LABEL: Record<string, string> = Object.fromEntries(
  CITIES.map((c) => [c.value, c.label])
);

function cityLabel(city: string) {
  return CITY_LABEL[city] ?? city;
}

function contactHref(method: string, value: string) {
  if (method === "WHATSAPP") {
    const clean = value.replace(/\D/g, "");
    return `https://wa.me/${clean}`;
  }
  if (method === "EMAIL") return `mailto:${value}`;
  return value;
}

function contactIcon(method: string) {
  if (method === "WHATSAPP") return "💬";
  if (method === "EMAIL") return "✉️";
  return "📅";
}

const EXPERTISE_FILTERS = [
  "Tous",
  "Marketing digital",
  "Finance",
  "Droit OHADA",
  "Levée de fonds",
  "Produit",
  "Tech",
  "Commerce",
];

const LOOKING_FOR_OPTIONS = [
  "Co-fondateur technique",
  "Développeur mobile",
  "Développeur web",
  "Expert marketing digital",
  "Commercial",
  "Associé marketing",
  "Expert finance",
  "Levée de fonds",
];

// ── Onglet Mentors ────────────────────────────────────────────────────────────

function MentorsTab() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    fetch("/api/community/mentors")
      .then((r) => r.json())
      .then((d) => setMentors(Array.isArray(d) ? d : []))
      .catch(() => setMentors([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "Tous"
      ? mentors
      : mentors.filter((m) =>
          m.expertise.some((e) =>
            e.toLowerCase().includes(filter.toLowerCase())
          )
        );

  return (
    <div>
      {/* Filtres */}
      <div className="flex gap-2 flex-wrap mb-5">
        {EXPERTISE_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === f
                ? "bg-primary text-white dark:bg-[#4D6FFF]"
                : "bg-surface border border-border text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <span className="text-5xl">🌱</span>
          <p className="text-foreground font-semibold">
            Aucun mentor disponible pour ce filtre.
          </p>
          <Link
            href="/devenir-mentor"
            className="text-primary dark:text-[#4D6FFF] text-sm font-medium hover:underline"
          >
            Sois le premier à proposer du mentorat →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/devenir-mentor"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary dark:hover:text-[#4D6FFF] transition-colors"
        >
          <span>✋</span> Devenir mentor StartKaba
        </Link>
      </div>
    </div>
  );
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar fullName={mentor.name} avatarUrl={mentor.avatarUrl} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm leading-snug">
            {mentor.name}
          </p>
          <p className="text-muted text-xs mt-0.5">{mentor.title}</p>
          <p className="text-muted text-xs mt-0.5">📍 {cityLabel(mentor.city)}</p>
        </div>
      </div>

      <p className="text-foreground text-xs leading-relaxed line-clamp-3">{mentor.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {mentor.expertise.slice(0, 4).map((e) => (
          <span
            key={e}
            className="px-2 py-0.5 rounded-full bg-primary/10 dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-medium"
          >
            {e}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <p className="text-muted text-xs">🕐 {mentor.availability}</p>
        <a
          href={contactHref(mentor.contactMethod, mentor.contactValue)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 transition-opacity"
        >
          {contactIcon(mentor.contactMethod)} Contacter
        </a>
      </div>
    </div>
  );
}

// ── Onglet Découvrir ──────────────────────────────────────────────────────────

function DiscoverTab({ myUserId }: { myUserId: string | null }) {
  const [profiles, setProfiles] = useState<CommunityProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("Tous");
  const [skillFilter, setSkillFilter] = useState("Tous");
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState<string | null>(null);

  const loadProfiles = useCallback(() => {
    fetch("/api/community/profiles")
      .then((r) => r.json())
      .then((d) => setProfiles(Array.isArray(d) ? d : []))
      .catch(() => setProfiles([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadProfiles(); }, [loadProfiles]);

  async function sendConnection(toUserId: string) {
    setSending(toUserId);
    try {
      const res = await fetch("/api/community/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUserId }),
      });
      if (res.ok) setSentIds((prev) => new Set(prev).add(toUserId));
    } finally {
      setSending(null);
    }
  }

  const cityOptions = ["Tous", ...Array.from(new Set(profiles.map((p) => p.city)))];
  const filtered = profiles.filter((p) => {
    if (p.id === myUserId) return false;
    if (cityFilter !== "Tous" && p.city !== cityFilter) return false;
    if (
      skillFilter !== "Tous" &&
      !p.lookingFor.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))
    ) return false;
    return true;
  });

  return (
    <div>
      {/* Cold-start banner */}
      {profiles.length < 10 && (
        <div className="mb-5 bg-cta/5 dark:bg-[rgba(247,126,45,0.08)] border border-cta/20 rounded-2xl px-4 py-3 text-sm text-foreground">
          🌱 La communauté grandit — invite d&apos;autres entrepreneurs pour enrichir les profils disponibles.
        </div>
      )}

      {/* Filtres */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-border bg-surface text-foreground text-xs font-medium focus:outline-none focus:border-primary"
        >
          {cityOptions.map((c) => (
            <option key={c} value={c}>
              {c === "Tous" ? "Toutes les villes" : cityLabel(c)}
            </option>
          ))}
        </select>
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-border bg-surface text-foreground text-xs font-medium focus:outline-none focus:border-primary"
        >
          <option value="Tous">Toutes compétences</option>
          {LOOKING_FOR_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => <div key={i} className="h-52 rounded-2xl bg-surface animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-3">
          <span className="text-5xl">🔍</span>
          <p className="text-foreground font-semibold">Aucun profil ne correspond à ces filtres.</p>
          <p className="text-muted text-sm">
            Active &quot;Je cherche un co-fondateur&quot; dans{" "}
            <Link href="/profil/edit#apparence" className="text-primary dark:text-[#4D6FFF] hover:underline">
              ton profil
            </Link>{" "}
            pour apparaître ici.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              sent={sentIds.has(profile.id)}
              sending={sending === profile.id}
              onConnect={() => sendConnection(profile.id)}
            />
          ))}
        </div>
      )}

      {/* Matching bientôt */}
      <div className="mt-6 bg-surface border border-border rounded-2xl p-4 text-center">
        <p className="text-xs font-semibold text-primary dark:text-[#4D6FFF] mb-1">
          🤖 Matching intelligent — Bientôt disponible
        </p>
        <p className="text-muted text-xs">
          Les suggestions automatiques basées sur ton profil et ta ville seront activées quand la communauté atteindra 50 membres dans ta région.
        </p>
      </div>
    </div>
  );
}

function ProfileCard({
  profile,
  sent,
  sending,
  onConnect,
}: {
  profile: CommunityProfile;
  sent: boolean;
  sending: boolean;
  onConnect: () => void;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar fullName={profile.fullName} avatarUrl={profile.avatarUrl} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{profile.fullName}</p>
          <p className="text-muted text-xs mt-0.5">📍 {cityLabel(profile.city)}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-green/10 dark:bg-[rgba(74,222,128,0.08)] text-green dark:text-[#4ADE80] text-xs font-semibold">
            Niv. {profile.currentLevelId}
          </span>
        </div>
      </div>

      {profile.projectName && (
        <div>
          <p className="text-foreground font-semibold text-xs">{profile.projectName}</p>
          {profile.projectDescription && (
            <p className="text-muted text-xs mt-0.5 line-clamp-2">{profile.projectDescription}</p>
          )}
        </div>
      )}

      {profile.publicBio && (
        <p className="text-foreground text-xs leading-relaxed line-clamp-2 italic">
          &ldquo;{profile.publicBio}&rdquo;
        </p>
      )}

      {profile.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {profile.skills.slice(0, 3).map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-xs">
              {s}
            </span>
          ))}
        </div>
      )}

      {profile.lookingFor.length > 0 && (
        <div>
          <p className="text-muted text-xs mb-1">Recherche :</p>
          <div className="flex flex-wrap gap-1">
            {profile.lookingFor.slice(0, 3).map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-full bg-cta/10 dark:bg-[rgba(247,126,45,0.10)] text-cta text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onConnect}
        disabled={sent || sending}
        className={`mt-auto w-full py-2 rounded-xl text-xs font-bold transition-all ${
          sent
            ? "bg-green/10 dark:bg-[rgba(74,222,128,0.10)] text-green dark:text-[#4ADE80] cursor-default"
            : "bg-primary text-white dark:bg-[#4D6FFF] hover:opacity-90 disabled:opacity-50"
        }`}
      >
        {sent ? "✓ Demande envoyée" : sending ? "..." : "Se connecter"}
      </button>
    </div>
  );
}

// ── Onglet Mes connexions ─────────────────────────────────────────────────────

function ConnectionsTab() {
  const [data, setData] = useState<{
    sent: ConnectionRequest[];
    received: ConnectionRequest[];
  }>({ sent: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/community/connections")
      .then((r) => r.json())
      .then((d) => {
        if (d.sent !== undefined) setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  async function respond(id: string, status: "ACCEPTED" | "DECLINED") {
    setUpdating(id);
    await fetch(`/api/community/connections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load();
  }

  const accepted = [
    ...data.sent.filter((c) => c.status === "ACCEPTED"),
    ...data.received.filter((c) => c.status === "ACCEPTED"),
  ];
  const pending = data.received.filter((c) => c.status === "PENDING");

  if (loading) {
    return <div className="h-40 bg-surface rounded-2xl animate-pulse" />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Demandes reçues */}
      {pending.length > 0 && (
        <section>
          <h2 className="font-semibold text-foreground text-sm mb-3">
            Demandes reçues{" "}
            <span className="inline-block px-2 py-0.5 rounded-full bg-cta/10 text-cta text-xs font-bold">
              {pending.length}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {pending.map((conn) => (
              <div
                key={conn.id}
                className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3"
              >
                <Avatar
                  fullName={conn.fromUser?.fullName ?? "?"}
                  avatarUrl={conn.fromUser?.avatarUrl ?? null}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">
                    {conn.fromUser?.fullName ?? "Utilisateur"}
                  </p>
                  {conn.message && (
                    <p className="text-muted text-xs mt-0.5 line-clamp-1 italic">
                      &ldquo;{conn.message}&rdquo;
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => respond(conn.id, "ACCEPTED")}
                    disabled={updating === conn.id}
                    className="px-3 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-50"
                  >
                    ✓ Accepter
                  </button>
                  <button
                    onClick={() => respond(conn.id, "DECLINED")}
                    disabled={updating === conn.id}
                    className="px-3 py-1.5 rounded-xl border border-border text-muted text-xs hover:text-error dark:hover:text-[#FF6B6B] disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Connexions acceptées */}
      {accepted.length > 0 && (
        <section>
          <h2 className="font-semibold text-foreground text-sm mb-3">
            Connexions ({accepted.length})
          </h2>
          <div className="flex flex-col gap-3">
            {accepted.map((conn) => {
              const other = conn.fromUser ?? conn.toUser;
              return (
                <div
                  key={conn.id}
                  className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3"
                >
                  <Avatar
                    fullName={other?.fullName ?? "?"}
                    avatarUrl={other?.avatarUrl ?? null}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {other?.fullName ?? "Utilisateur"}
                    </p>
                    {other?.email && (
                      <a
                        href={`mailto:${other.email}`}
                        className="text-primary dark:text-[#4D6FFF] text-xs hover:underline"
                      >
                        {other.email}
                      </a>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green/10 dark:bg-[rgba(74,222,128,0.08)] text-green dark:text-[#4ADE80] text-xs font-semibold">
                    Connecté
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Demandes envoyées en attente */}
      {data.sent.filter((c) => c.status === "PENDING").length > 0 && (
        <section>
          <h2 className="font-semibold text-foreground text-sm mb-3">Demandes envoyées</h2>
          <div className="flex flex-col gap-3">
            {data.sent
              .filter((c) => c.status === "PENDING")
              .map((conn) => (
                <div
                  key={conn.id}
                  className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3"
                >
                  <Avatar
                    fullName={conn.toUser?.fullName ?? "?"}
                    avatarUrl={conn.toUser?.avatarUrl ?? null}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {conn.toUser?.fullName ?? "Utilisateur"}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-xs">
                    En attente
                  </span>
                </div>
              ))}
          </div>
        </section>
      )}

      {accepted.length === 0 && pending.length === 0 && data.sent.length === 0 && (
        <div className="text-center py-16 flex flex-col items-center gap-3">
          <span className="text-5xl">🤝</span>
          <p className="text-foreground font-semibold">Aucune connexion pour l&apos;instant.</p>
          <p className="text-muted text-sm">
            Explore l&apos;onglet &ldquo;Découvrir&rdquo; pour te connecter avec des entrepreneurs.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

type Tab = "mentors" | "discover" | "connections";

export default function CommunautePage() {
  const [tab, setTab] = useState<Tab>("mentors");
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((d) => { if (d?.id) setMyUserId(d.id); })
      .catch(() => {});

    fetch("/api/community/connections")
      .then((r) => r.json())
      .then((d) => {
        if (d?.received) {
          setPendingCount(d.received.filter((c: ConnectionRequest) => c.status === "PENDING").length);
        }
      })
      .catch(() => {});
  }, []);

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "mentors", label: "Mentors" },
    { id: "discover", label: "Découvrir" },
    { id: "connections", label: "Mes connexions", badge: pendingCount || undefined },
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-foreground mb-1">
          Communauté
        </h1>
        <p className="text-muted text-sm">
          Rencontre des mentors et connecte-toi avec des entrepreneurs qui construisent comme toi.
        </p>
      </div>

      {/* Onglets */}
      <div className="flex gap-1 bg-surface border border-border rounded-2xl p-1 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id
                ? "bg-primary text-white dark:bg-[#4D6FFF] shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
            {t.badge ? (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cta text-white text-[10px] font-bold flex items-center justify-center">
                {t.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {tab === "mentors" && <MentorsTab />}
      {tab === "discover" && <DiscoverTab myUserId={myUserId} />}
      {tab === "connections" && <ConnectionsTab />}
    </div>
  );
}
