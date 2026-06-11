import Link from "next/link";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { MobileNav } from "@/components/layout/MobileNav";
import { NAV_ITEMS } from "@/lib/nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar desktop */}
      <aside className="w-64 border-r border-border bg-surface p-6 hidden md:flex flex-col">
        <span className="font-display text-xl font-bold text-primary mb-6">
          StartKaba
        </span>
        <nav className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item) => (
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center justify-between md:justify-end px-4 sm:px-6 gap-2">
          <MobileNav />
          <span className="font-display font-bold text-primary md:hidden">
            StartKaba
          </span>
          <NotificationBell />
        </header>
        <main className="flex-1 p-4 sm:p-8 animate-page">{children}</main>
      </div>
    </div>
  );
}
