import { signOut } from "@/app/(auth)/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="w-full text-left px-4 py-2 rounded-lg text-muted hover:text-error hover:bg-error/5 transition-colors"
      >
        Déconnexion
      </button>
    </form>
  );
}
