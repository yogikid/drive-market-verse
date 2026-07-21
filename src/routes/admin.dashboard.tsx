import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { bookingService, vendorService } from "@/services";
import { PriceDisplay } from "@/components/PriceDisplay";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

const trendData = [
  { day: "Sen", revenue: 3200000 }, { day: "Sel", revenue: 4100000 },
  { day: "Rab", revenue: 3800000 }, { day: "Kam", revenue: 5200000 },
  { day: "Jum", revenue: 6100000 }, { day: "Sab", revenue: 7400000 }, { day: "Min", revenue: 5900000 },
];

function AdminDashboard() {
  const { data: bookings = [] } = useQuery({ queryKey: ["all-bookings"], queryFn: () => bookingService.list() });
  const { data: vendors = [] } = useQuery({ queryKey: ["vendors"], queryFn: () => vendorService.list() });

  const totalRevenue = bookings.filter((b) => b.paymentStatus === "paid").reduce((s, b) => s + b.totalPrice, 0);
  const activeVendors = vendors.filter((v) => v.status === "active").length;

  const stats = [
    { label: "Total Transaksi", value: bookings.length, prefix: "" },
    { label: "Total Revenue", value: totalRevenue, isPrice: true },
    { label: "Vendor Aktif", value: activeVendors, suffix: ` dari ${vendors.length}` },
    { label: "Booking Berlangsung", value: bookings.filter((b) => b.status === "ongoing").length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2">
              {s.isPrice ? (
                <PriceDisplay amount={s.value as number} size="lg" />
              ) : (
                <span className="num text-2xl font-semibold">{s.value}{s.suffix ?? ""}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="mb-4 font-display font-semibold">Tren Revenue Mingguan</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(v) => `${v / 1000000}jt`} />
              <Tooltip formatter={(v: number) => "Rp " + v.toLocaleString("id-ID")} />
              <Bar dataKey="revenue" fill="oklch(0.5 0.24 275)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
