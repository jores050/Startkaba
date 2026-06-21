"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Award, LockOpen, CheckCircle2, MessageCircle, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

const TYPE_ICONS: Record<string, LucideIcon> = {
  BADGE_EARNED: Award,
  LEVEL_UNLOCKED: LockOpen,
  TASK_COMPLETED: CheckCircle2,
  MESSAGE_RECEIVED: MessageCircle,
  SYSTEM: Megaphone,
};

export function NotificationBell() {
  const { notifications, unreadCount, mutate } = useNotifications();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Marquage automatique comme lues à l'ouverture du panel
  useEffect(() => {
    if (open && unreadCount > 0) {
      fetch("/api/notifications/read-all", { method: "PUT" }).then(() => mutate());
    }
  }, [open, unreadCount, mutate]);

  // Fermeture au clic extérieur
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 transition-colors"
      >
        <Bell size={20} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-error text-white text-xs font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border font-display font-bold text-foreground">
            Notifications
          </div>
          <div className="max-h-96 overflow-y-auto">
            {(notifications ?? []).length === 0 ? (
              <p className="text-muted text-sm text-center py-8">
                Aucune notification.
              </p>
            ) : (
              (notifications ?? []).map((n) => {
                const NotifIcon = TYPE_ICONS[n.type] ?? Megaphone;
                return (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-border/50 last:border-0 ${
                      n.read ? "" : "bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <NotifIcon size={16} strokeWidth={2} className="shrink-0 mt-0.5 text-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {n.title}
                        </p>
                        <p className="text-xs text-muted mt-0.5">{n.body}</p>
                        <p className="text-xs text-muted/60 mt-1">
                          {new Date(n.createdAt).toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-cta shrink-0 mt-1.5" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
