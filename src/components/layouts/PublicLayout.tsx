import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Car, Home, MessageCircle, Search, User } from "lucide-react";
import { AIChatWidget } from "@/components/AIChatWidget";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/cars", icon: Search, label: "Cari" },
  { to: "/my-bookings", icon: Car, label: "Booking" },
  { to: "/chat", icon: MessageCircle, label: "Chat" },
  { to: "/profile", icon: User, label: "Profil" },
];

export function PublicLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useSession((s) => s.user);

  return (
    <div className="min-h-screen bg-background pb-16 sm:pb-0">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Car className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">CorporaRent</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/cars" className="hover:text-primary">Cari Mobil</Link>
            <Link to="/my-bookings" className="hover:text-primary">Booking Saya</Link>
            <Link to="/chat" className="hover:text-primary">Chat</Link>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/profile" className="text-sm font-medium hover:text-primary">
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link to="/login" className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Masuk
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      {/* mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t bg-background sm:hidden">
        {tabs.map((t) => {
          const active = pathname === t.to || (t.to !== "/" && pathname.startsWith(t.to));
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px]",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {t.label}
            </Link>
          );
        })}
      </nav>

      <AIChatWidget />
    </div>
  );
}
