"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { MessageCircle, Mail, CalendarDays, MapPin, Clock, Building2, BookOpen, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  if (method === "WHATSAPP") return `https://wa.me/${value.replace(/\D/g, "")}`;
  if (method === "EMAIL") return `mailto:${value}`;
  return value;
}
const CONTACT_ICONS: Record<string, LucideIcon> = {
  WHATSAPP: MessageCircle,
  EMAIL: Mail,
};
function ContactIcon({ method }: { method: string }) {
  const Icon = CONTACT_ICONS[method] ?? CalendarDays;
  return <Icon size={14} strokeWidth={2} />;
}

const EXPERTISE_FILTERS = [
  "Tous", "Marketing digital", "Finance", "Droit OHADA",
  "Levée de fonds", "Produit", "Tech", "Commerce",
];
const LOOKING_FOR_OPTIONS = [
  "Co-fondateur technique", "Développeur mobile", "Développeur web",
  "Expert marketing digital", "Commercial", "Associé marketing",
  "Expert finance", "Levée de fonds",
];

// ── Types locaux ───────────────────────────────────────────────────────────────

interface Group {
  id: string;
  name: string;
  type: "CITY" | "LEVEL";
  cityOrLevel: string;
  description: string;
  _count: { posts: number };
}

interface GroupPost {
  id: string;
  groupId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: { id: string; fullName: string; avatarUrl: string | null };
  _count: { replies: number };
}

interface GroupReply {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: { id: string; fullName: string; avatarUrl: string | null };
}

interface HelpRequestItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  levelTag: number | null;
  status: "OPEN" | "RESOLVED";
  createdAt: string;
  user: { id: string; fullName: string; avatarUrl: string | null };
  _count: { replies: number };
}

interface HelpReplyItem {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; fullName: string; avatarUrl: string | null };
}

interface HelpRequestDetail extends HelpRequestItem {
  replies: HelpReplyItem[];
}

interface AccountabilityPair {
  id: string;
  userAId: string;
  userBId: string;
  status: string;
  matchedAt: string;
  lastCheckInAt: string | null;
  userA: { id: string; fullName: string; avatarUrl: string | null; city: string; currentLevelId: number };
  userB: { id: string; fullName: string; avatarUrl: string | null; city: string; currentLevelId: number };
}

interface ShowcaseProfile {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  city: string;
  currentLevelId: number;
  projectName: string | null;
  projectDescription: string | null;
  publicBio: string | null;
}

// ── Bandeau Showcase ──────────────────────────────────────────────────────────

function ShowcaseBanner() {
  const [profiles, setProfiles] = useState<ShowcaseProfile[]>([]);

  useEffect(() => {
    fetch("/api/community/showcase")
      .then((r) => r.json())
      .then((d) => setProfiles(Array.isArray(d) ? d.slice(0, 5) : []))
      .catch(() => {});
  }, []);

  if (profiles.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
        ✨ Projets de la semaine
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {profiles.map((p) => (
          <Link
            key={p.id}
            href={`/p/${p.id}`}
            className="flex-shrink-0 bg-surface border border-border rounded-2xl p-4 w-52 flex flex-col gap-2 hover:border-primary dark:hover:border-[#4D6FFF] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Avatar fullName={p.fullName} avatarUrl={p.avatarUrl} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{p.projectName ?? p.fullName}</p>
                <p className="text-xs text-muted truncate flex items-center gap-0.5"><MapPin size={10} strokeWidth={2} />{cityLabel(p.city)}</p>
              </div>
            </div>
            <span className="self-start px-2 py-0.5 rounded-full bg-green/10 dark:bg-[rgba(74,222,128,0.08)] text-green dark:text-[#4ADE80] text-xs font-semibold">
              Niv. {p.currentLevelId}
            </span>
            {p.projectDescription && (
              <p className="text-xs text-muted line-clamp-2">{p.projectDescription}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

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
      : mentors.filter((m) => m.expertise.some((e) => e.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div>
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
          {[1, 2, 3].map((i) => <div key={i} className="h-48 rounded-2xl bg-surface animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <span className="text-5xl">🌱</span>
          <p className="text-foreground font-semibold">Aucun mentor disponible pour ce filtre.</p>
          <Link href="/devenir-mentor" className="text-primary dark:text-[#4D6FFF] text-sm font-medium hover:underline">
            Sois le premier à proposer du mentorat →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)}
        </div>
      )}
      <div className="mt-6 text-center">
        <Link href="/devenir-mentor" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary dark:hover:text-[#4D6FFF] transition-colors">
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
          <p className="font-semibold text-foreground text-sm leading-snug">{mentor.name}</p>
          <p className="text-muted text-xs mt-0.5">{mentor.title}</p>
          <p className="text-muted text-xs mt-0.5 flex items-center gap-0.5"><MapPin size={10} strokeWidth={2} />{cityLabel(mentor.city)}</p>
        </div>
      </div>
      <p className="text-foreground text-xs leading-relaxed line-clamp-3">{mentor.bio}</p>
      <div className="flex flex-wrap gap-1.5">
        {mentor.expertise.slice(0, 4).map((e) => (
          <span key={e} className="px-2 py-0.5 rounded-full bg-primary/10 dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-medium">{e}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-muted text-xs flex items-center gap-1"><Clock size={12} strokeWidth={2} /> {mentor.availability}</p>
        <a
          href={contactHref(mentor.contactMethod, mentor.contactValue)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 transition-opacity"
        >
          <ContactIcon method={mentor.contactMethod} /> Contacter
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
    if (skillFilter !== "Tous" && !p.lookingFor.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))) return false;
    return true;
  });

  return (
    <div>
      {profiles.length < 10 && (
        <div className="mb-5 bg-cta/5 dark:bg-[rgba(247,126,45,0.08)] border border-cta/20 rounded-2xl px-4 py-3 text-sm text-foreground">
          🌱 La communauté grandit — invite d&apos;autres entrepreneurs pour enrichir les profils disponibles.
        </div>
      )}
      <div className="flex gap-3 mb-5 flex-wrap">
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="px-3 py-1.5 rounded-xl border border-border bg-surface text-foreground text-xs font-medium focus:outline-none focus:border-primary">
          {cityOptions.map((c) => <option key={c} value={c}>{c === "Tous" ? "Toutes les villes" : cityLabel(c)}</option>)}
        </select>
        <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} className="px-3 py-1.5 rounded-xl border border-border bg-surface text-foreground text-xs font-medium focus:outline-none focus:border-primary">
          <option value="Tous">Toutes compétences</option>
          {LOOKING_FOR_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
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
            <Link href="/profil/edit#apparence" className="text-primary dark:text-[#4D6FFF] hover:underline">ton profil</Link>{" "}
            pour apparaître ici.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} sent={sentIds.has(profile.id)} sending={sending === profile.id} onConnect={() => sendConnection(profile.id)} />
          ))}
        </div>
      )}
      <div className="mt-6 bg-surface border border-border rounded-2xl p-4 text-center">
        <p className="text-xs font-semibold text-primary dark:text-[#4D6FFF] mb-1">🤖 Matching intelligent — Bientôt disponible</p>
        <p className="text-muted text-xs">Les suggestions automatiques basées sur ton profil et ta ville seront activées quand la communauté atteindra 50 membres dans ta région.</p>
      </div>
    </div>
  );
}

function ProfileCard({ profile, sent, sending, onConnect }: { profile: CommunityProfile; sent: boolean; sending: boolean; onConnect: () => void }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar fullName={profile.fullName} avatarUrl={profile.avatarUrl} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{profile.fullName}</p>
          <p className="text-muted text-xs mt-0.5 flex items-center gap-0.5"><MapPin size={10} strokeWidth={2} />{cityLabel(profile.city)}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-green/10 dark:bg-[rgba(74,222,128,0.08)] text-green dark:text-[#4ADE80] text-xs font-semibold">Niv. {profile.currentLevelId}</span>
        </div>
      </div>
      {profile.projectName && (
        <div>
          <p className="text-foreground font-semibold text-xs">{profile.projectName}</p>
          {profile.projectDescription && <p className="text-muted text-xs mt-0.5 line-clamp-2">{profile.projectDescription}</p>}
        </div>
      )}
      {profile.publicBio && <p className="text-foreground text-xs leading-relaxed line-clamp-2 italic">&ldquo;{profile.publicBio}&rdquo;</p>}
      {profile.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {profile.skills.slice(0, 3).map((s) => <span key={s} className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-xs">{s}</span>)}
        </div>
      )}
      {profile.lookingFor.length > 0 && (
        <div>
          <p className="text-muted text-xs mb-1">Recherche :</p>
          <div className="flex flex-wrap gap-1">
            {profile.lookingFor.slice(0, 3).map((s) => <span key={s} className="px-2 py-0.5 rounded-full bg-cta/10 dark:bg-[rgba(247,126,45,0.10)] text-cta text-xs font-medium">{s}</span>)}
          </div>
        </div>
      )}
      <button onClick={onConnect} disabled={sent || sending} className={`mt-auto w-full py-2 rounded-xl text-xs font-bold transition-all ${sent ? "bg-green/10 dark:bg-[rgba(74,222,128,0.10)] text-green dark:text-[#4ADE80] cursor-default" : "bg-primary text-white dark:bg-[#4D6FFF] hover:opacity-90 disabled:opacity-50"}`}>
        {sent ? "✓ Demande envoyée" : sending ? "..." : "Se connecter"}
      </button>
    </div>
  );
}

// ── Onglet Groupes ────────────────────────────────────────────────────────────

function GroupsTab({ myUserId }: { myUserId: string | null }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);

  useEffect(() => {
    fetch("/api/community/groups")
      .then((r) => r.json())
      .then((d) => setGroups(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (activeGroup) {
    return <GroupForum group={activeGroup} myUserId={myUserId} onBack={() => setActiveGroup(null)} />;
  }

  const cityGroups = groups.filter((g) => g.type === "CITY");
  const levelGroups = groups.filter((g) => g.type === "LEVEL");

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 rounded-2xl bg-surface animate-pulse" />)}
        </div>
      ) : (
        <>
          <section className="mb-6">
            <h2 className="font-semibold text-foreground text-sm mb-3">Groupes par ville</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cityGroups.map((g) => <GroupCard key={g.id} group={g} onClick={() => setActiveGroup(g)} />)}
            </div>
          </section>
          <section>
            <h2 className="font-semibold text-foreground text-sm mb-3">Groupes par niveau</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levelGroups.map((g) => <GroupCard key={g.id} group={g} onClick={() => setActiveGroup(g)} />)}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function GroupCard({ group, onClick }: { group: Group; onClick: () => void }) {
  const GroupIcon = group.type === "CITY" ? Building2 : BookOpen;
  return (
    <button onClick={onClick} className="bg-surface border border-border rounded-2xl p-4 text-left flex flex-col gap-2 hover:border-primary dark:hover:border-[#4D6FFF] transition-colors w-full">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-foreground text-sm flex items-center gap-1.5"><GroupIcon size={14} strokeWidth={2} className="shrink-0 text-muted" />{group.name}</p>
        <span className="text-muted text-xs shrink-0">{group._count.posts} post{group._count.posts !== 1 ? "s" : ""}</span>
      </div>
      <p className="text-muted text-xs line-clamp-2">{group.description}</p>
    </button>
  );
}

function GroupForum({ group, myUserId, onBack }: { group: Group; myUserId: string | null; onBack: () => void }) {
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const loadPosts = useCallback(() => {
    fetch(`/api/community/groups/${group.id}/posts`)
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [group.id]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  async function submitPost() {
    if (!newPost.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/community/groups/${group.id}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost.trim() }),
      });
      if (res.ok) { setNewPost(""); loadPosts(); }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-muted hover:text-foreground text-sm mb-4 transition-colors">
        ← Retour aux groupes
      </button>
      <h2 className="font-semibold text-foreground text-base mb-1">{group.name}</h2>
      <p className="text-muted text-xs mb-5">{group.description}</p>

      {/* Nouveau post */}
      <div className="bg-surface border border-border rounded-2xl p-4 mb-5">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Partage quelque chose avec le groupe..."
          rows={3}
          className="w-full bg-transparent text-foreground text-sm placeholder:text-muted resize-none focus:outline-none"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={submitPost}
            disabled={submitting || !newPost.trim()}
            className="px-4 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-40"
          >
            {submitting ? "Envoi..." : "Publier"}
          </button>
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <div key={i} className="h-24 rounded-2xl bg-surface animate-pulse" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 text-muted text-sm">Aucun post pour l&apos;instant. Sois le premier !</div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} myUserId={myUserId} expanded={expandedPost === post.id} onToggle={() => setExpandedPost(expandedPost === post.id ? null : post.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, myUserId, expanded, onToggle }: { post: GroupPost; myUserId: string | null; expanded: boolean; onToggle: () => void }) {
  const [replies, setReplies] = useState<GroupReply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (expanded && replies.length === 0) {
      setLoadingReplies(true);
      fetch(`/api/community/groups/${post.groupId}/posts/${post.id}/replies`)
        .then((r) => r.json())
        .then((d) => setReplies(Array.isArray(d) ? d : []))
        .catch(() => {})
        .finally(() => setLoadingReplies(false));
    }
  }, [expanded, post.id, post.groupId, replies.length]);

  async function submitReply() {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/community/groups/${post.groupId}/posts/${post.id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText.trim() }),
      });
      if (res.ok) {
        const r = await res.json();
        setReplies((prev) => [...prev, r]);
        setReplyText("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-2">
        <Avatar fullName={post.user.fullName} avatarUrl={post.user.avatarUrl} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">{post.user.fullName}</p>
          <p className="text-xs text-muted">{new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</p>
        </div>
      </div>
      <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{post.content}</p>
      <button onClick={onToggle} className="text-xs text-muted hover:text-primary dark:hover:text-[#4D6FFF] transition-colors">
        💬 {post._count.replies} réponse{post._count.replies !== 1 ? "s" : ""} {expanded ? "▲" : "▼"}
      </button>

      {expanded && (
        <div className="mt-3 border-t border-border pt-3 flex flex-col gap-2">
          {loadingReplies ? (
            <div className="h-8 bg-surface rounded animate-pulse" />
          ) : replies.length === 0 ? (
            <p className="text-xs text-muted">Aucune réponse.</p>
          ) : (
            replies.map((r) => (
              <div key={r.id} className="flex items-start gap-2">
                <Avatar fullName={r.user.fullName} avatarUrl={r.user.avatarUrl} size="sm" />
                <div className="flex-1 bg-background dark:bg-[#0F1525] rounded-xl px-3 py-2">
                  <p className="text-xs font-semibold text-foreground">{r.user.fullName}</p>
                  <p className="text-xs text-foreground mt-0.5">{r.content}</p>
                </div>
              </div>
            ))
          )}
          {myUserId && (
            <div className="flex gap-2 mt-1">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitReply(); } }}
                placeholder="Répondre..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-border bg-background dark:bg-[#0F1525] text-foreground text-xs placeholder:text-muted focus:outline-none focus:border-primary"
              />
              <button onClick={submitReply} disabled={submitting || !replyText.trim()} className="px-3 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-40">
                {submitting ? "..." : "→"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Onglet Demandes d'aide ────────────────────────────────────────────────────

function HelpTab({ myUserId, myLevel }: { myUserId: string | null; myLevel: number }) {
  const [requests, setRequests] = useState<HelpRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeRequest, setActiveRequest] = useState<HelpRequestDetail | null>(null);

  const loadRequests = useCallback(() => {
    fetch("/api/community/help")
      .then((r) => r.json())
      .then((d) => setRequests(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  if (activeRequest) {
    return (
      <HelpDetail
        request={activeRequest}
        myUserId={myUserId}
        onBack={() => { setActiveRequest(null); loadRequests(); }}
        onResolved={(updated) => setActiveRequest({ ...activeRequest, ...updated })}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">{requests.filter((r) => r.status === "OPEN").length} demande{requests.filter((r) => r.status === "OPEN").length !== 1 ? "s" : ""} ouverte{requests.filter((r) => r.status === "OPEN").length !== 1 ? "s" : ""}</p>
        <button onClick={() => setShowForm(!showForm)} className="px-3 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90">
          {showForm ? "Annuler" : "✋ Poser une question"}
        </button>
      </div>

      {showForm && (
        <HelpForm
          myLevel={myLevel}
          onSuccess={() => { setShowForm(false); loadRequests(); }}
        />
      )}

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => <div key={i} className="h-24 rounded-2xl bg-surface animate-pulse" />)}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 text-muted text-sm">Aucune demande pour l&apos;instant. Pose la première question !</div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => (
            <HelpRequestCard
              key={req.id}
              request={req}
              onClick={async () => {
                const r = await fetch(`/api/community/help/${req.id}`).then((r) => r.json());
                setActiveRequest(r);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HelpForm({ myLevel, onSuccess }: { myLevel: number; onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [levelTag, setLevelTag] = useState(myLevel);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/community/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), levelTag }),
      });
      if (res.ok) onSuccess();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="bg-surface border border-border rounded-2xl p-4 mb-4 flex flex-col gap-3">
      <p className="font-semibold text-foreground text-sm">Nouvelle demande d&apos;aide</p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de ta question (5-100 caractères)"
        required
        className="px-3 py-2 rounded-xl border border-border bg-background dark:bg-[#0F1525] text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-primary"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Décris ta situation, ton contexte, et ce que tu as déjà essayé..."
        required
        rows={4}
        className="px-3 py-2 rounded-xl border border-border bg-background dark:bg-[#0F1525] text-foreground text-sm placeholder:text-muted resize-none focus:outline-none focus:border-primary"
      />
      <div className="flex items-center gap-3">
        <label className="text-xs text-muted shrink-0">Niveau concerné :</label>
        <select value={levelTag} onChange={(e) => setLevelTag(Number(e.target.value))} className="px-3 py-1.5 rounded-xl border border-border bg-background dark:bg-[#0F1525] text-foreground text-xs focus:outline-none focus:border-primary">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>Niveau {n}</option>)}
        </select>
      </div>
      <button type="submit" disabled={submitting || !title.trim() || !description.trim()} className="px-4 py-2 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-40">
        {submitting ? "Envoi..." : "Publier la demande"}
      </button>
    </form>
  );
}

function HelpRequestCard({ request, onClick }: { request: HelpRequestItem; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-surface border border-border rounded-2xl p-4 text-left flex flex-col gap-2 hover:border-primary dark:hover:border-[#4D6FFF] transition-colors w-full">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-foreground text-sm line-clamp-1">{request.title}</p>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${request.status === "RESOLVED" ? "bg-green/10 text-green dark:text-[#4ADE80]" : "bg-cta/10 text-cta"}`}>
          {request.status === "RESOLVED" ? "✓ Résolu" : "Ouvert"}
        </span>
      </div>
      <p className="text-muted text-xs line-clamp-2">{request.description}</p>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>👤 {request.user.fullName}</span>
        {request.levelTag && <span>📚 Niv. {request.levelTag}</span>}
        <span>💬 {request._count.replies}</span>
      </div>
    </button>
  );
}

function HelpDetail({
  request,
  myUserId,
  onBack,
  onResolved,
}: {
  request: HelpRequestDetail;
  myUserId: string | null;
  onBack: () => void;
  onResolved: (u: Partial<HelpRequestDetail>) => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<HelpReplyItem[]>(request.replies);
  const [submitting, setSubmitting] = useState(false);

  async function submitReply() {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/community/help/${request.id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText.trim() }),
      });
      if (res.ok) {
        const r = await res.json();
        setReplies((prev) => [...prev, r]);
        setReplyText("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function resolve() {
    const res = await fetch(`/api/community/help/${request.id}`, { method: "PATCH" });
    if (res.ok) onResolved({ status: "RESOLVED" });
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-muted hover:text-foreground text-sm mb-4 transition-colors">
        ← Retour aux demandes
      </button>
      <div className="bg-surface border border-border rounded-2xl p-5 mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="font-bold text-foreground text-base">{request.title}</h2>
          {request.status === "OPEN" && myUserId === request.userId && (
            <button onClick={resolve} className="shrink-0 px-3 py-1 rounded-xl bg-green/10 text-green dark:text-[#4ADE80] text-xs font-bold hover:bg-green/20 transition-colors">
              ✓ Marquer résolu
            </button>
          )}
          {request.status === "RESOLVED" && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-green/10 text-green dark:text-[#4ADE80] text-xs font-semibold">✓ Résolu</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span>👤 {request.user.fullName}</span>
          {request.levelTag && <span>📚 Niv. {request.levelTag}</span>}
          <span>{new Date(request.createdAt).toLocaleDateString("fr-FR")}</span>
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap">{request.description}</p>
      </div>

      <h3 className="font-semibold text-foreground text-sm mb-3">{replies.length} réponse{replies.length !== 1 ? "s" : ""}</h3>
      <div className="flex flex-col gap-3 mb-4">
        {replies.map((r) => (
          <div key={r.id} className="bg-surface border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar fullName={r.user.fullName} avatarUrl={r.user.avatarUrl} size="sm" />
              <div>
                <p className="text-xs font-semibold text-foreground">{r.user.fullName}</p>
                <p className="text-xs text-muted">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap">{r.content}</p>
          </div>
        ))}
      </div>

      {request.status === "OPEN" && myUserId && (
        <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Ta réponse..."
            rows={3}
            className="w-full bg-transparent text-foreground text-sm placeholder:text-muted resize-none focus:outline-none"
          />
          <div className="flex justify-end">
            <button onClick={submitReply} disabled={submitting || !replyText.trim()} className="px-4 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-40">
              {submitting ? "Envoi..." : "Répondre"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Section Accountability Partner ────────────────────────────────────────────

function AccountabilitySection({ myUserId }: { myUserId: string | null }) {
  const [pair, setPair] = useState<AccountabilityPair | null | undefined>(undefined);
  const [matching, setMatching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!myUserId) return;
    fetch("/api/community/accountability")
      .then((r) => r.json())
      .then((d) => setPair(d))
      .catch(() => setPair(null));
  }, [myUserId]);

  async function findPair() {
    setMatching(true);
    setError(null);
    try {
      const res = await fetch("/api/community/accountability", { method: "POST" });
      const d = await res.json();
      if (res.ok) setPair(d);
      else setError(d.error ?? "Aucun binôme disponible pour l'instant.");
    } finally {
      setMatching(false);
    }
  }

  async function sayHello(partnerId: string) {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: partnerId,
        type: "SYSTEM",
        title: "Ton binôme te salue 👋",
        body: "Votre binôme de motivation t'envoie un bonjour. Continue comme ça !",
      }),
    }).catch(() => {});
  }

  if (!myUserId) return null;
  if (pair === undefined) return null;

  const partner = pair ? (pair.userAId === myUserId ? pair.userB : pair.userA) : null;

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
      <p className="font-semibold text-foreground text-sm mb-3 flex items-center gap-1.5"><Handshake size={16} strokeWidth={2} className="text-muted" />Ton binôme de motivation</p>
      {pair && partner ? (
        <div className="flex items-center gap-3">
          <Avatar fullName={partner.fullName} avatarUrl={partner.avatarUrl} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm">{partner.fullName}</p>
            <p className="text-muted text-xs flex items-center gap-0.5"><MapPin size={10} strokeWidth={2} />{cityLabel(partner.city)} · Niv. {partner.currentLevelId}</p>
          </div>
          <button
            onClick={() => sayHello(partner.id)}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-cta/10 text-cta text-xs font-bold hover:bg-cta/20 transition-colors"
          >
            Dire bonjour 👋
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-muted text-xs">Trouve un entrepreneur au même niveau que toi (dans une autre ville) pour vous motiver mutuellement.</p>
          {error && <p className="text-xs text-cta">{error}</p>}
          <button
            onClick={findPair}
            disabled={matching}
            className="self-start px-4 py-2 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-50"
          >
            {matching ? "Recherche..." : "Trouver un binôme"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Onglet Mes connexions ─────────────────────────────────────────────────────

function ConnectionsTab() {
  const [data, setData] = useState<{ sent: ConnectionRequest[]; received: ConnectionRequest[] }>({ sent: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/community/connections")
      .then((r) => r.json())
      .then((d) => { if (d.sent !== undefined) setData(d); })
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

  if (loading) return <div className="h-40 bg-surface rounded-2xl animate-pulse" />;

  return (
    <div className="flex flex-col gap-6">
      {pending.length > 0 && (
        <section>
          <h2 className="font-semibold text-foreground text-sm mb-3">
            Demandes reçues{" "}
            <span className="inline-block px-2 py-0.5 rounded-full bg-cta/10 text-cta text-xs font-bold">{pending.length}</span>
          </h2>
          <div className="flex flex-col gap-3">
            {pending.map((conn) => (
              <div key={conn.id} className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3">
                <Avatar fullName={conn.fromUser?.fullName ?? "?"} avatarUrl={conn.fromUser?.avatarUrl ?? null} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{conn.fromUser?.fullName ?? "Utilisateur"}</p>
                  {conn.message && <p className="text-muted text-xs mt-0.5 line-clamp-1 italic">&ldquo;{conn.message}&rdquo;</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => respond(conn.id, "ACCEPTED")} disabled={updating === conn.id} className="px-3 py-1.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] text-xs font-bold hover:opacity-90 disabled:opacity-50">✓ Accepter</button>
                  <button onClick={() => respond(conn.id, "DECLINED")} disabled={updating === conn.id} className="px-3 py-1.5 rounded-xl border border-border text-muted text-xs hover:text-error dark:hover:text-[#FF6B6B] disabled:opacity-50">✕</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {accepted.length > 0 && (
        <section>
          <h2 className="font-semibold text-foreground text-sm mb-3">Connexions ({accepted.length})</h2>
          <div className="flex flex-col gap-3">
            {accepted.map((conn) => {
              const other = conn.fromUser ?? conn.toUser;
              return (
                <div key={conn.id} className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3">
                  <Avatar fullName={other?.fullName ?? "?"} avatarUrl={other?.avatarUrl ?? null} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{other?.fullName ?? "Utilisateur"}</p>
                    {other?.email && <a href={`mailto:${other.email}`} className="text-primary dark:text-[#4D6FFF] text-xs hover:underline">{other.email}</a>}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green/10 dark:bg-[rgba(74,222,128,0.08)] text-green dark:text-[#4ADE80] text-xs font-semibold">Connecté</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {data.sent.filter((c) => c.status === "PENDING").length > 0 && (
        <section>
          <h2 className="font-semibold text-foreground text-sm mb-3">Demandes envoyées</h2>
          <div className="flex flex-col gap-3">
            {data.sent.filter((c) => c.status === "PENDING").map((conn) => (
              <div key={conn.id} className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3">
                <Avatar fullName={conn.toUser?.fullName ?? "?"} avatarUrl={conn.toUser?.avatarUrl ?? null} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{conn.toUser?.fullName ?? "Utilisateur"}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-xs">En attente</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {accepted.length === 0 && pending.length === 0 && data.sent.length === 0 && (
        <div className="text-center py-16 flex flex-col items-center gap-3">
          <span className="text-5xl">🤝</span>
          <p className="text-foreground font-semibold">Aucune connexion pour l&apos;instant.</p>
          <p className="text-muted text-sm">Explore l&apos;onglet &ldquo;Découvrir&rdquo; pour te connecter avec des entrepreneurs.</p>
        </div>
      )}
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

type Tab = "mentors" | "discover" | "groups" | "help" | "connections";

export default function CommunautePage() {
  const [tab, setTab] = useState<Tab>("mentors");
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [myLevel, setMyLevel] = useState(1);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d?.id) { setMyUserId(d.id); setMyLevel(d.currentLevelId ?? 1); }
      })
      .catch(() => {});

    fetch("/api/community/connections")
      .then((r) => r.json())
      .then((d) => {
        if (d?.received) setPendingCount(d.received.filter((c: ConnectionRequest) => c.status === "PENDING").length);
      })
      .catch(() => {});
  }, []);

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "mentors", label: "Mentors" },
    { id: "discover", label: "Découvrir" },
    { id: "groups", label: "Groupes" },
    { id: "help", label: "Demandes d'aide" },
    { id: "connections", label: "Mes connexions", badge: pendingCount || undefined },
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-foreground mb-1">Communauté</h1>
        <p className="text-muted text-sm">Rencontre des mentors et connecte-toi avec des entrepreneurs qui construisent comme toi.</p>
      </div>

      <ShowcaseBanner />

      <AccountabilitySection myUserId={myUserId} />

      {/* Onglets */}
      <div className="flex gap-1 bg-surface border border-border rounded-2xl p-1 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
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
      {tab === "groups" && <GroupsTab myUserId={myUserId} />}
      {tab === "help" && <HelpTab myUserId={myUserId} myLevel={myLevel} />}
      {tab === "connections" && <ConnectionsTab />}
    </div>
  );
}
