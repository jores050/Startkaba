"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { CITIES } from "@/lib/validations/auth";

export default function CommunautePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, city, skills }),
    });
    setSubmitting(false);

    if (res.ok) {
      setDone(true);
    } else {
      const data = await res.json().catch(() => null);
      if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
      else setError(data?.error ?? "Erreur — réessaie dans un instant.");
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Communauté
      </h1>
      <p className="text-muted mb-8">
        Le matching co-fondateurs arrive bientôt — rejoins la liste d&apos;attente.
      </p>

      <Card>
        {done ? (
          <div className="text-center py-6">
            <span className="text-5xl block mb-4 animate-badge-pop">🤝</span>
            <h2 className="font-display text-xl font-bold text-green mb-2">
              Tu es sur la liste !
            </h2>
            <p className="text-muted text-sm">
              On te préviendra dès que le matching co-fondateurs ouvre dans ta
              ville.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="wl-name"
              label="Nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Aïcha Koné"
              error={fieldErrors.fullName}
            />
            <Input
              id="wl-email"
              type="email"
              label="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="toi@exemple.com"
              error={fieldErrors.email}
            />
            <Select
              id="wl-city"
              label="Ta ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              error={fieldErrors.city}
            >
              <option value="" disabled>
                Choisis ta ville
              </option>
              {CITIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Select>
            <Input
              id="wl-skills"
              label="Compétences que tu cherches chez un co-fondateur"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Ex : développeur, finance, vente terrain..."
              error={fieldErrors.skills}
            />
            {error && (
              <p className="text-error text-sm bg-error/10 border border-error/30 rounded-lg px-4 py-2">
                {error}
              </p>
            )}
            <Button type="submit" loading={submitting} loadingText="Inscription...">
              Rejoindre la liste d&apos;attente
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
