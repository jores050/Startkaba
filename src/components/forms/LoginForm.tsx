"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn, type AuthState } from "@/app/(auth)/actions";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {pending ? "Connexion..." : "Se connecter"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
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
          className="px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors"
        />
        {state.fieldErrors?.email && (
          <p className="text-error text-sm">{state.fieldErrors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors"
        />
        {state.fieldErrors?.password && (
          <p className="text-error text-sm">{state.fieldErrors.password}</p>
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
