"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp, type AuthState } from "@/app/(auth)/actions";
import { CITIES } from "@/lib/validations/auth";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {pending ? "Création du compte..." : "Créer mon compte"}
    </button>
  );
}

export function SignupForm() {
  const [state, formAction] = useFormState(signUp, initialState);

  const inputClass =
    "px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors";

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
          Nom complet
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Aïcha Koné"
          className={inputClass}
        />
        {state.fieldErrors?.fullName && (
          <p className="text-error text-sm">{state.fieldErrors.fullName}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="toi@exemple.com"
          className={inputClass}
        />
        {state.fieldErrors?.email && (
          <p className="text-error text-sm">{state.fieldErrors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Mot de passe <span className="text-muted">(8 caractères min.)</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="••••••••"
          className={inputClass}
        />
        {state.fieldErrors?.password && (
          <p className="text-error text-sm">{state.fieldErrors.password}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="city" className="text-sm font-medium text-foreground">
          Ta ville
        </label>
        <select
          id="city"
          name="city"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Choisis ta ville
          </option>
          {CITIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.city && (
          <p className="text-error text-sm">{state.fieldErrors.city}</p>
        )}
      </div>

      {state.error && (
        <p className="text-error text-sm text-center bg-error/10 border border-error/30 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
