import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Car, Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";

const tabs = [
  { to: "/driver/home", icon: Car, label: "Orderan" },
  { to: "/driver/history", icon: History, label: "Riwayat" },
];

export function DriverLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useSession((s) => s.user);
  const logout = useSession((s) => s.logout);
  return (
    <div className="min-h-screen bg-ops-sidebar pb-20 text-text-inverse">
      <header className="flex items-center justify-between px-4 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/50">Driver</p>
          <p className="font-display text-base font-semibold">{user?.name}</p>
        </div>
        <button onClick={logout} className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/70">Keluar</button>
      </header>
      <main className="mx-auto max-w-md px-4">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md border-t border-white/10 bg-[oklch(0.2_0.015_265)]">
        {tabs.map((t) => {
          const active = pathname === t.to || pathname.startsWith(t.to + "/");
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className={cn("flex flex-1 flex-col items-center gap-1 py-3 text-xs", active ? "text-primary-foreground" : "text-white/60")}>
              <Icon className="h-5 w-5" />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export { Clock };
