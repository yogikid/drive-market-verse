import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role, User } from "@/types";
import { users } from "@/data/mock";

interface SessionState {
  user: User | null;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const pickUser = (role: Role): User => {
  const u = users.find((x) => x.role === role);
  return u ?? users[0];
};

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      loginAs: (role) => set({ user: pickUser(role) }),
      logout: () => set({ user: null }),
    }),
    { name: "corporarent-session" },
  ),
);

export const roleHome: Record<Role, string> = {
  customer: "/",
  admin: "/admin/dashboard",
  vendor: "/vendor/dashboard",
  driver: "/driver/home",
};
