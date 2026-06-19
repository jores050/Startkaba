"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordReset, type AuthState } from "@/app/(auth)/actions";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" full loading={pending} loadingText="Envoi...">
      Envoyer le lien de réinitialisation
    </Button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordReset, initialState);

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Logo size={28} />
          <span className="font-display text-xl font-extrabold text-[#0722AB]">StartKaba</span>
        </Link>

        <div className="bg-white border border-[#E8EAF0] rounded-3xl p-8 shadow-sm">
          {state.success ? (
            <div className="text-center">
              <span className="text-4xl block mb-3">📬</span>
              <h1 className="font-display text-xl font-bold text-[#0A0E2A] mb-2">Vérifie tes emails</h1>
              <p className="text-[#4A5280] text-sm leading-relaxed">
                Si un compte existe avec cette adresse, tu vas recevoir un lien pour réinitialiser
                ton mot de passe. Pense à regarder dans les spams.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-[#0A0E2A] mb-1">Mot de passe oublié&nbsp;?</h1>
                <p className="text-[#8892C8] text-sm">
                  Entre ton email, on t&apos;envoie un lien pour en choisir un nouveau.
                </p>
              </div>
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
                {state.error && (
                  <p className="text-error text-sm text-center bg-error/10 border border-error/30 rounded-lg px-4 py-2">
                    {state.error}
                  </p>
                )}
                <SubmitButton />
              </form>
            </>
          )}
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
