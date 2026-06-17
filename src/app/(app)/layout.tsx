import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app text-ink">
      <Sidebar />
      <div className="md:ml-60 flex flex-col min-h-screen pb-20 md:pb-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-7 animate-page">{children}</main>
        <Footer />
      </div>
      <BottomNav />
    </div>
  );
}
