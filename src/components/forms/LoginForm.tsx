"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { signIn, type AuthState } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full loading={pending} loadingText="Connexion...">
      Se connecter
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
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
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          label="Mot de passe"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          error={state.fieldErrors?.password}
        />
        <div className="text-right mt-1.5">
          <Link href="/auth/forgot-password" className="text-xs text-[#0722AB] font-semibold hover:underline">
            Mot de passe oublié&nbsp;?
          </Link>
        </div>
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
