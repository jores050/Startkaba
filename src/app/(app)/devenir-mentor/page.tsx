"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea, inputClass } from "@/components/ui/Input";
import { CITIES } from "@/lib/validations/auth";

const EXPERTISE_OPTIONS = [
  "Marketing digital",
  "E-commerce",
  "Réseaux sociaux",
  "Finances & comptabilité",
  "Levée de fonds",
  "Droit OHADA",
  "Contrats & propriété intellectuelle",
  "Développement produit",
  "Tech & développement",
  "Mobile Money & fintech",
  "Vente & distribution",
  "Commerce international",
  "Agriculture & agritech",
  "Santé",
  "Éducation",
  "Logistique",
  "Impact social",
];

export default function DevenirMentorPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [expertiseInput, setExpertiseInput] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("OTHER");
  const [contactMethod, setContactMethod] = useState<"WHATSAPP" | "EMAIL" | "CALENDLY">("EMAIL");
  const [contactValue, setContactValue] = useState("");
  const [availability, setAvailability] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function addExpertise(val: string) {
    const s = val.trim();
    if (s && !expertise.includes(s) && expertise.length < 8) {
      setExpertise([...expertise, s]);
    }
    setExpertiseInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setFieldErrors({});

    const res = await fetch("/api/community/mentors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, title, expertise, bio,
        city, contactMethod, contactValue, availability,
      }),
    });

    setSubmitting(false);

    if (res.ok) {
      setDone(true);
    } else {
      const data = await res.json().catch(() => null);
      if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
      else setErrorMsg(data?.error ?? "Erreur — réessaie dans un instant.");
    }
  }

  if (done) {
    return (
      <div className="max-w-lg">
        <div className="bg-surface border border-border rounded-2xl p-10 text-center shadow-sm">
          <span className="text-6xl block mb-4">🙌</span>
          <h1 className="font-display text-2xl font-extrabold text-foreground mb-2">
            Candidature reçue !
          </h1>
          <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
            Notre équipe va examiner ton profil et te recontacter sous 48h. Merci de vouloir
            accompagner les entrepreneurs StartKaba.
          </p>
          <Link
            href="/communaute"
            className="inline-block px-5 py-2.5 rounded-xl bg-primary text-white dark:bg-[#4D6FFF] font-bold hover:opacity-90 transition-opacity text-sm"
          >
            ← Retour à la communauté
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="mb-7">
        <Link
          href="/communaute"
          className="text-muted text-sm hover:text-foreground transition-colors mb-4 inline-block"
        >
          ← Communauté
        </Link>
        <h1 className="font-display text-3xl font-extrabold text-foreground mb-1">
          Devenir mentor
        </h1>
        <p className="text-muted text-sm">
          Partage ton expertise avec les entrepreneurs StartKaba. Bénévole ou rémunéré, à toi de choisir.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Identité */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          <p className="font-semibold text-muted text-xs uppercase tracking-wide">Ton identité</p>
          <Input
            id="mentor-name"
            label="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Fatoumata Diallo"
            error={fieldErrors.name}
          />
          <Input
            id="mentor-title"
            label="Titre / Poste"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex : Expert Marketing Digital & E-commerce"
            error={fieldErrors.title}
          />
          <Select
            id="mentor-city"
            label="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={fieldErrors.city}
          >
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>
        </div>

        {/* Expertise */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          <p className="font-semibold text-muted text-xs uppercase tracking-wide">
            Domaines d&apos;expertise ({expertise.length}/8)
          </p>
          <div className="flex gap-2">
            <select
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              className={`${inputClass} flex-1`}
            >
              <option value="">Choisir un domaine...</option>
              {EXPERTISE_OPTIONS.filter((o) => !expertise.includes(o)).map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Button
              type="button"
              variant="primary"
              onClick={() => addExpertise(expertiseInput)}
              className="shrink-0"
            >
              Ajouter
            </Button>
          </div>
          {expertise.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {expertise.map((e) => (
                <span
                  key={e}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-semibold"
                >
                  {e}
                  <button
                    type="button"
                    onClick={() => setExpertise(expertise.filter((x) => x !== e))}
                    className="hover:text-error font-bold leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {fieldErrors.expertise && (
            <p className="text-error text-xs">{fieldErrors.expertise}</p>
          )}
        </div>

        {/* Bio */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
          <Textarea
            id="mentor-bio"
            label={`Bio (${bio.length}/600)`}
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 600))}
            rows={4}
            required
            placeholder="Décris ton parcours, ton expertise et comment tu peux aider les entrepreneurs StartKaba. Sois concret : secteurs, marchés, types de problèmes que tu aides à résoudre."
            error={fieldErrors.bio}
          />
        </div>

        {/* Contact */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          <p className="font-semibold text-muted text-xs uppercase tracking-wide">Contact & Disponibilité</p>
          <Select
            id="mentor-contact-method"
            label="Méthode de contact préférée"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value as typeof contactMethod)}
            error={fieldErrors.contactMethod}
          >
            <option value="WHATSAPP">WhatsApp</option>
            <option value="EMAIL">Email</option>
            <option value="CALENDLY">Calendly</option>
          </Select>
          <Input
            id="mentor-contact-value"
            label={
              contactMethod === "WHATSAPP"
                ? "Numéro WhatsApp (avec indicatif)"
                : contactMethod === "EMAIL"
                ? "Adresse email"
                : "Lien Calendly"
            }
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            required
            placeholder={
              contactMethod === "WHATSAPP"
                ? "+221 70 123 45 67"
                : contactMethod === "EMAIL"
                ? "toi@exemple.com"
                : "https://calendly.com/ton-profil"
            }
            error={fieldErrors.contactValue}
          />
          <Input
            id="mentor-availability"
            label="Disponibilité"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
            placeholder="Ex : Lun-Ven 18h-20h, ou Sur rendez-vous"
            error={fieldErrors.availability}
          />
        </div>

        {errorMsg && (
          <div className="bg-error/10 border border-error/30 rounded-2xl px-4 py-3 text-error text-sm">
            {errorMsg}
          </div>
        )}

        <Button type="submit" loading={submitting} loadingText="Envoi en cours..." full>
          Soumettre ma candidature
        </Button>

        <p className="text-muted text-xs text-center">
          Ton profil sera examiné par l&apos;équipe StartKaba avant publication (48h max).
        </p>
      </form>
    </div>
  );
}
