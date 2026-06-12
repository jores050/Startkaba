"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea, inputClass } from "@/components/ui/Input";
import { CITIES } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";

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
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 flex items-center gap-5 shadow-sm">
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
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
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
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
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
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
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
