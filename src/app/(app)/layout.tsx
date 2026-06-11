import Link from "next/link";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { NotificationBell } from "@/components/layout/NotificationBell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-border bg-surface p-6 hidden md:flex flex-col">
        <span className="font-display text-xl font-bold text-primary mb-6">
          StartKaba
        </span>
        <nav className="flex flex-col gap-2 flex-1">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/parcours", label: "Mon Parcours" },
            { href: "/coach", label: "Kaba (Coach IA)" },
            { href: "/ressources", label: "Ressources" },
            { href: "/communaute", label: "Communauté" },
            { href: "/profil", label: "Mon Profil" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg text-muted hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SignOutButton />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center justify-end px-6 gap-2">
          <NotificationBell />
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
