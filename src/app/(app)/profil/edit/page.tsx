"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea, inputClass } from "@/components/ui/Input";
import { CITIES } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";

function SoundToggleEdit() {
  const [on, setOn] = useState(true);
  useEffect(() => setOn(isSoundEnabled()), []);
  return (
    <button
      type="button"
      onClick={() => { setSoundEnabled(!on); setOn(!on); }}
      className="flex items-center justify-between w-full"
    >
      <div>
        <p className="text-sm font-medium text-[#0A0E2A] dark:text-[#F5F6FA]">Son de validation</p>
        <p className="text-xs text-[#8892C8] mt-0.5">Joue une mélodie à chaque tâche validée</p>
      </div>
      <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${on ? "bg-[#1A6B00] dark:bg-[#4ADE80]" : "bg-[#E8EAF0] dark:bg-[#2A3050]"}`}>
        <span className={`block w-5 h-5 rounded-full bg-white dark:bg-[#0B0F1A] transition-transform shadow-sm ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

const THEME_OPTIONS = [
  { value: "light", label: "Clair", icon: "☀️" },
  { value: "dark", label: "Sombre", icon: "🌙" },
  { value: "system", label: "Automatique", icon: "💻" },
] as const;

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <p className="font-display font-bold text-[#0A0E2A] dark:text-[#F5F6FA] text-sm tracking-wide uppercase text-[#8892C8]">
        Apparence
      </p>
      <div className="grid grid-cols-3 gap-3">
        {THEME_OPTIONS.map((opt) => {
          const active = mounted && theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                active
                  ? "border-[#0722AB] dark:border-[#4D6FFF] bg-[#EEF1FF] dark:bg-[#1A2040] text-[#0722AB] dark:text-[#4D6FFF]"
                  : "border-[#E8EAF0] dark:border-[#2A3050] text-[#4A5280] dark:text-[#A0A8C8] hover:border-[#0722AB]/40"
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfilEditPage() {
  const router = useRouter();
  const { user, isLoading, mutate } = useUser();

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("OTHER");
  const [bio, setBio] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isOpenToCofounder, setIsOpenToCofounder] = useState(false);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [publicBio, setPublicBio] = useState("");
  const [showcaseOptIn, setShowcaseOptIn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (user && !initialized) {
      setFullName(user.fullName);
      setCity(user.city);
      setBio(user.bio ?? "");
      setProjectName(user.projectName ?? "");
      setProjectDescription(user.projectDescription ?? "");
      setSkills(user.skills);
      setAvatarUrl(user.avatarUrl);
      const u = user as typeof user & { isOpenToCofounder?: boolean; lookingFor?: string[]; publicBio?: string; showcaseOptIn?: boolean };
      setIsOpenToCofounder(u.isOpenToCofounder ?? false);
      setLookingFor(u.lookingFor ?? []);
      setPublicBio(u.publicBio ?? "");
      setShowcaseOptIn(u.showcaseOptIn ?? false);
      setInitialized(true);
    }
  }, [user, initialized]);

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s) && skills.length < 15) {
      setSkills([...skills, s]);
    }
    setSkillInput("");
  }

  async function handleAvatarUpload(file: File) {
    setUploading(true);
    setErrorMsg(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user?.id ?? "anonymous"}/avatar-${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      setAvatarUrl(data.publicUrl);
    } catch {
      setErrorMsg(
        "Upload de l'avatar impossible en local. La photo sera ignorée."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setFieldErrors({});

    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        city,
        bio,
        projectName,
        projectDescription,
        skills,
        avatarUrl: avatarUrl ?? "",
        isOpenToCofounder,
        lookingFor,
        publicBio,
        showcaseOptIn,
      }),
    });

    setSaving(false);

    if (res.ok) {
      await mutate();
      router.push("/profil");
    } else {
      const data = await res.json().catch(() => null);
      if (data?.fieldErrors) {
        setFieldErrors(data.fieldErrors);
      } else {
        setErrorMsg(data?.error ?? "Erreur lors de l'enregistrement.");
      }
    }
  }

  if (isLoading || !user) {
    return (
      <div className="max-w-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-56 rounded-2xl bg-[#E8EAF0]" />
          <div className="h-64 rounded-2xl bg-[#E8EAF0]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">
            Modifier mon profil
          </h1>
          <p className="text-[#8892C8] text-sm mt-1">Tes informations sont privées par défaut.</p>
        </div>
        <Link href="/profil" className="text-[#8892C8] hover:text-[#0722AB] transition-colors text-sm font-medium">
          Annuler
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex items-center gap-5 shadow-sm">
          <Avatar fullName={fullName || user.fullName} avatarUrl={avatarUrl} size="lg" />
          <div>
            <p className="font-semibold text-[#0A0E2A] text-sm mb-1">Photo de profil</p>
            <p className="text-[#8892C8] text-xs mb-3">PNG, JPG ou WebP — max 2 Mo</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleAvatarUpload(f);
              }}
            />
            <Button
              type="button"
              variant="outline"
              loading={uploading}
              loadingText="Envoi..."
              onClick={() => fileInputRef.current?.click()}
            >
              Changer la photo
            </Button>
          </div>
        </div>

        {/* Infos perso */}
        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
          <p className="font-display font-bold text-[#0A0E2A] text-sm tracking-wide uppercase text-[#8892C8]">
            Informations personnelles
          </p>
          <Input
            id="fullName"
            label="Nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            error={fieldErrors.fullName}
          />
          <Select
            id="city"
            label="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={fieldErrors.city}
          >
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
          <Textarea
            id="bio"
            label="Bio"
            hint={`(${bio.length}/200)`}
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 200))}
            rows={3}
            maxLength={200}
            placeholder="Qui es-tu en quelques mots ?"
            error={fieldErrors.bio}
          />
        </div>

        {/* Projet */}
        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
          <p className="font-display font-bold text-[#0A0E2A] text-sm tracking-wide uppercase text-[#8892C8]">
            Mon projet
          </p>
          <Input
            id="projectName"
            label="Nom du projet"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Ex : FraisLocal"
            error={fieldErrors.projectName}
          />
          <Textarea
            id="projectDescription"
            label="Description du projet"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={4}
            placeholder="Quel problème résous-tu, pour qui ?"
            error={fieldErrors.projectDescription}
          />
        </div>

        {/* Compétences */}
        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <p className="font-display font-bold text-[#0A0E2A] text-sm tracking-wide uppercase text-[#8892C8]">
            Compétences ({skills.length}/15)
          </p>
          <div className="flex gap-2">
            <input
              id="skillInput"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Ex : Marketing digital"
              className={inputClass}
            />
            <Button type="button" variant="primary" onClick={addSkill} className="shrink-0">
              Ajouter
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF1FF] text-[#0722AB] text-sm font-semibold"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((s) => s !== skill))}
                    aria-label={`Supprimer ${skill}`}
                    className="hover:text-red-500 font-bold leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {fieldErrors.skills && (
            <p className="text-red-600 text-sm">{fieldErrors.skills}</p>
          )}
        </div>

        {/* Co-fondateur */}
        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
          <p className="font-display font-bold text-[#8892C8] text-sm tracking-wide uppercase">
            Communauté
          </p>
          {/* Toggle open to cofounder */}
          <button
            type="button"
            onClick={() => setIsOpenToCofounder(!isOpenToCofounder)}
            className="flex items-center justify-between w-full"
          >
            <div>
              <p className="text-sm font-medium text-[#0A0E2A] dark:text-[#F5F6FA]">
                Je cherche un co-fondateur / associé
              </p>
              <p className="text-xs text-[#8892C8] mt-0.5">
                Ton profil apparaît dans l&apos;onglet &ldquo;Découvrir&rdquo; de la Communauté
              </p>
            </div>
            <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${isOpenToCofounder ? "bg-[#0722AB] dark:bg-[#4D6FFF]" : "bg-[#E8EAF0] dark:bg-[#2A3050]"}`}>
              <span className={`block w-5 h-5 rounded-full bg-white dark:bg-[#0B0F1A] transition-transform shadow-sm ${isOpenToCofounder ? "translate-x-5" : ""}`} />
            </span>
          </button>

          {/* Toggle showcase */}
          <button
            type="button"
            onClick={() => setShowcaseOptIn(!showcaseOptIn)}
            className="flex items-center justify-between w-full"
          >
            <div>
              <p className="text-sm font-medium text-[#0A0E2A] dark:text-[#F5F6FA]">
                Mettre mon projet en avant
              </p>
              <p className="text-xs text-[#8892C8] mt-0.5">
                Ton projet apparaît dans le bandeau &ldquo;Projets de la semaine&rdquo; de la Communauté
              </p>
            </div>
            <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${showcaseOptIn ? "bg-[#F77E2D]" : "bg-[#E8EAF0] dark:bg-[#2A3050]"}`}>
              <span className={`block w-5 h-5 rounded-full bg-white dark:bg-[#0B0F1A] transition-transform shadow-sm ${showcaseOptIn ? "translate-x-5" : ""}`} />
            </span>
          </button>

          {isOpenToCofounder && (
            <div className="flex flex-col gap-4">
              {/* lookingFor tags */}
              <div>
                <p className="text-sm font-medium text-[#0A0E2A] dark:text-[#F5F6FA] mb-2">
                  Compétences recherchées ({lookingFor.length}/6)
                </p>
                <div className="flex gap-2 flex-wrap mb-2">
                  {[
                    "Co-fondateur technique",
                    "Développeur mobile",
                    "Développeur web",
                    "Expert marketing digital",
                    "Commercial",
                    "Associé marketing",
                    "Expert finance",
                    "Levée de fonds",
                  ].map((opt) => {
                    const active = lookingFor.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setLookingFor(
                            active
                              ? lookingFor.filter((s) => s !== opt)
                              : lookingFor.length < 6
                              ? [...lookingFor, opt]
                              : lookingFor
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                          active
                            ? "bg-[#0722AB] dark:bg-[#4D6FFF] text-white"
                            : "bg-[#EEF1FF] dark:bg-[#1A2040] text-[#0722AB] dark:text-[#4D6FFF] hover:opacity-80"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* publicBio */}
              <div>
                <label className="text-sm font-medium text-[#0A0E2A] dark:text-[#F5F6FA] block mb-1.5">
                  Bio publique{" "}
                  <span className="text-[#8892C8] font-normal">({publicBio.length}/200)</span>
                </label>
                <textarea
                  value={publicBio}
                  onChange={(e) => setPublicBio(e.target.value.slice(0, 200))}
                  rows={3}
                  placeholder="En 2-3 phrases : qui tu es, ce que tu construis, et pourquoi chercher un associé."
                  className="w-full px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#2A3050] bg-white dark:bg-[#0F1525] text-[#0A0E2A] dark:text-[#F5F6FA] text-sm placeholder:text-[#8892C8] focus:outline-none focus:border-[#0722AB] dark:focus:border-[#4D6FFF] resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Son + Apparence */}
        <div id="apparence" className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
          <p className="font-display font-bold text-[#8892C8] text-sm tracking-wide uppercase">
            Préférences
          </p>
          <SoundToggleEdit />
        </div>
        <AppearanceSection />

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm">
            {errorMsg}
          </div>
        )}

        <Button type="submit" loading={saving} loadingText="Enregistrement..." full>
          Sauvegarder les modifications
        </Button>
      </form>
    </div>
  );
}
