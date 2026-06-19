"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { updatePassword, type AuthState } from "@/app/(auth)/actions";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full loading={pending} loadingText="Mise à jour...">
      Définir mon nouveau mot de passe
    </Button>
  );
}

export default function ResetPasswordPage() {
  const [state, formAction] = useFormState(updatePassword, initialState);

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Logo size={28} />
          <span className="font-display text-xl font-extrabold text-[#0722AB]">StartKaba</span>
        </Link>

        <div className="bg-white border border-[#E8EAF0] rounded-3xl p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-[#0A0E2A] mb-1">Nouveau mot de passe</h1>
            <p className="text-[#8892C8] text-sm">Choisis un mot de passe d&apos;au moins 8 caractères.</p>
          </div>
          <form action={formAction} className="flex flex-col gap-5">
            <Input
              id="password"
              name="password"
              type="password"
              label="Nouveau mot de passe"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              error={state.fieldErrors?.password}
            />
            <Input
              id="confirm"
              name="confirm"
              type="password"
              label="Confirme le mot de passe"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              error={state.fieldErrors?.confirm}
            />
            {state.error && (
              <p className="text-error text-sm text-center bg-error/10 border border-error/30 rounded-lg px-4 py-2">
                {state.error}
              </p>
            )}
            <SubmitButton />
          </form>
        </div>

        <p className="text-center text-[#8892C8] text-sm mt-6">
          <Link href="/login" className="text-[#0722AB] font-semibold hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  );
}
