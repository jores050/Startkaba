"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp, type AuthState } from "@/app/(auth)/actions";
import { CITIES } from "@/lib/validations/auth";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full loading={pending} loadingText="Création du compte...">
      Créer mon compte
    </Button>
  );
}

export function SignupForm() {
  const [state, formAction] = useFormState(signUp, initialState);

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
      {state.error && (
        <p className="text-error text-sm text-center bg-error/10 border border-error/30 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
