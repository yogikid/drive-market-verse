import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Car } from "lucide-react";
import { useSession, roleHome } from "@/lib/session";
import type { Role } from "@/types";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const loginAs = useSession((s) => s.loginAs);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role: Role) => {
    loginAs(role);
    navigate({ to: roleHome[role] });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Car className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold">CorporaRent</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Login</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); handleLogin("customer"); }}
          className="space-y-3"
        >
          <div>
            <label className="mb-1 block text-xs font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="andre@mail.com" className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="••••••••" className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Masuk sebagai Customer
          </button>
        </form>

        <div className="mt-6 border-t pt-4">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Dev: login sebagai</p>
          <div className="grid grid-cols-2 gap-2">
            {(["customer", "admin", "vendor", "driver"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => handleLogin(r)}
                className="rounded-lg border py-2 text-xs capitalize hover:border-primary hover:text-primary"
              >
                {r === "vendor" ? "Pemilik Rental" : r === "driver" ? "Supir" : r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
