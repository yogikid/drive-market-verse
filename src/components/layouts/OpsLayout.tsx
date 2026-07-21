import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Car, LayoutDashboard, LogOut, MessageCircle, Store, TrendingUp, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";

interface NavItem { to: string; icon: typeof Car; label: string }

interface Props { title: string; nav: NavItem[]; }

function Shell({ title, nav, children }: Props & { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useSession((s) => s.user);
  const logout = useSession((s) => s.logout);
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col bg-ops-sidebar text-text-inverse md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Car className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-sm font-bold">CorporaRent</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50">{title}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = pathname === n.to || pathname.startsWith(n.to + "/");
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  active ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <div className="mb-2 rounded-lg bg-white/5 p-3">
            <p className="text-xs text-white/50">Login sebagai</p>
            <p className="truncate text-sm font-medium">{user?.name}</p>
          </div>
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/5">
            <LogOut className="h-3.5 w-3.5" /> Keluar
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-ops-content">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h1 className="font-display text-lg font-semibold">{title}</h1>
          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export const adminNav: NavItem[] = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/vendors", icon: Store, label: "Vendor" },
];

export const vendorNav: NavItem[] = [
  { to: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/vendor/cars", icon: Car, label: "Manajemen Mobil" },
  { to: "/vendor/reports", icon: TrendingUp, label: "Laporan" },
  { to: "/vendor/chat", icon: MessageCircle, label: "Chat" },
];

export function OpsLayout({ title, nav }: Props) {
  return (
    <Shell title={title} nav={nav}>
      <Outlet />
    </Shell>
  );
}

export { Users };
