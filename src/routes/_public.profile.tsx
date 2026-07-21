import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_public/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const user = useSession((s) => s.user);
  const logout = useSession((s) => s.logout);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Anda belum login.</p>
        <button onClick={() => navigate({ to: "/login" })} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
          Masuk
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="font-display text-2xl font-bold">Profil</h1>
      <div className="rounded-2xl border bg-card p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Nama</p>
        <p className="font-medium">{user.name}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Email</p>
        <p>{user.email}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Telepon</p>
        <p className="num">{user.phone}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Role</p>
        <p className="capitalize">{user.role}</p>
      </div>
      <button
        onClick={() => { logout(); navigate({ to: "/login" }); }}
        className="w-full rounded-lg border border-destructive/30 py-2.5 text-sm text-destructive hover:bg-destructive/5"
      >
        Keluar
      </button>
    </div>
  );
}
