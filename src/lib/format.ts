export const formatIDR = (n: number) =>
  "Rp " + Math.round(n).toLocaleString("id-ID");

export const durationLabel = (d: string) => {
  switch (d) {
    case "per_jam": return "Per Jam";
    case "per_4_jam": return "Per 4 Jam";
    case "per_6_jam": return "Per 6 Jam";
    case "per_hari": return "Per Hari";
    default: return d;
  }
};

export const bookingStatusLabel: Record<string, string> = {
  pending: "Menunggu Konfirmasi",
  confirmed: "Dikonfirmasi",
  ongoing: "Berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};
