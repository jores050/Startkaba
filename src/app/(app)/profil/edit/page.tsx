"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "@/components/ui/Avatar";
import { CITIES } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors w-full";

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

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
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
        "Upload de l'avatar impossible (Supabase Storage non disponible en local). La photo sera ignorée."
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
    return <p className="text-muted">Chargement...</p>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Modifier mon profil
        </h1>
        <Link href="/profil" className="text-muted hover:text-primary transition-colors">
          Annuler
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <Avatar fullName={fullName || user.fullName} avatarUrl={avatarUrl} size="lg" />
          <div>
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
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
            >
              {uploading ? "Envoi..." : "Changer la photo"}
            </button>
          </div>
        </div>

        {/* Nom complet */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium">
            Nom complet
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={inputClass}
          />
          {fieldErrors.fullName && (
            <p className="text-error text-sm">{fieldErrors.fullName}</p>
          )}
        </div>

        {/* Ville */}
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm font-medium">
            Ville
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={inputClass}
          >
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {fieldErrors.city && (
            <p className="text-error text-sm">{fieldErrors.city}</p>
          )}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio{" "}
            <span className="text-muted font-normal">
              ({bio.length}/200)
            </span>
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 200))}
            rows={3}
            maxLength={200}
            placeholder="Qui es-tu en quelques mots ?"
            className={inputClass}
          />
          {fieldErrors.bio && (
            <p className="text-error text-sm">{fieldErrors.bio}</p>
          )}
        </div>

        {/* Projet */}
        <div className="flex flex-col gap-2">
          <label htmlFor="projectName" className="text-sm font-medium">
            Nom du projet
          </label>
          <input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Ex : FraisLocal"
            className={inputClass}
          />
          {fieldErrors.projectName && (
            <p className="text-error text-sm">{fieldErrors.projectName}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="projectDescription" className="text-sm font-medium">
            Description du projet
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={4}
            placeholder="Quel problème résous-tu, pour qui ?"
            className={inputClass}
          />
          {fieldErrors.projectDescription && (
            <p className="text-error text-sm">{fieldErrors.projectDescription}</p>
          )}
        </div>

        {/* Compétences */}
        <div className="flex flex-col gap-2">
          <label htmlFor="skillInput" className="text-sm font-medium">
            Compétences{" "}
            <span className="text-muted font-normal">({skills.length}/15)</span>
          </label>
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
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              Ajouter
            </button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Supprimer ${skill}`}
                    className="hover:text-error font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {fieldErrors.skills && (
            <p className="text-error text-sm">{fieldErrors.skills}</p>
          )}
        </div>

        {errorMsg && (
          <p className="text-error text-sm bg-error/10 border border-error/30 rounded-lg px-4 py-2">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </form>
    </div>
  );
}
