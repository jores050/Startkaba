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
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
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
            <Button type="button" variant="primary" onClick={addSkill} className="shrink-0">
              Ajouter
            </Button>
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
                    onClick={() => setSkills(skills.filter((s) => s !== skill))}
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

        <Button type="submit" loading={saving} loadingText="Enregistrement...">
          Enregistrer les modifications
        </Button>
      </form>
    </div>
  );
}
