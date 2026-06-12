export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-surface px-8 py-4 flex items-center gap-6">
        <span className="font-display text-xl font-bold text-primary">
          StartKaba Admin
        </span>
        {[
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/users", label: "Utilisateurs" },
          { href: "/admin/stats", label: "Stats" },
        ].map((item) => (
          <a key={item.href} href={item.href} className="text-muted hover:text-primary transition-colors">
            {item.label}
          </a>
        ))}
      </nav>
      <main className="p-4 sm:p-8 animate-page">{children}</main>
    </div>
  );
}
