"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { signUp, type AuthState } from "@/app/(auth)/actions";
import { CITIES } from "@/lib/validations/auth";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

const initialState: AuthState = {};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full loading={pending} loadingText="Création du compte..." disabled={disabled}>
      Créer mon compte
    </Button>
  );
}

export function SignupForm() {
  const [state, formAction] = useFormState(signUp, initialState);
  const [accepted, setAccepted] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        id="fullName"
        name="fullName"
        label="Nom complet"
        required
        autoComplete="name"
        placeholder="Aïcha Koné"
        error={state.fieldErrors?.fullName}
      />
      <Input
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        required
        autoComplete="email"
        placeholder="toi@exemple.com"
        error={state.fieldErrors?.email}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Mot de passe"
        hint="(8 caractères min.)"
        required
        autoComplete="new-password"
        placeholder="••••••••"
        error={state.fieldErrors?.password}
      />
      <Select
        id="city"
        name="city"
        label="Ta ville"
        required
        defaultValue=""
        error={state.fieldErrors?.city}
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

      {/* Acceptation CGU / confidentialité — obligatoire */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[#0722AB] shrink-0"
          />
          <span className="text-sm text-[#4A5280] leading-snug">
            J&apos;ai lu et j&apos;accepte les{" "}
            <Link href="/legal/cgu" target="_blank" className="text-[#0722AB] font-semibold hover:underline">
              CGU
            </Link>{" "}
            et la{" "}
            <Link href="/legal/confidentialite" target="_blank" className="text-[#0722AB] font-semibold hover:underline">
              Politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {state.fieldErrors?.acceptedTerms && (
          <p className="text-error text-sm mt-1.5">{state.fieldErrors.acceptedTerms}</p>
        )}
      </div>

      {state.error && (
        <p className="text-error text-sm text-center bg-error/10 border border-error/30 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}
      <SubmitButton disabled={!accepted} />
    </form>
  );
}
