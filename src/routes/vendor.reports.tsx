import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { bookingService, carService } from "@/services";
import { PriceDisplay } from "@/components/PriceDisplay";

const VENDOR_ID = "v1";

export const Route = createFileRoute("/vendor/reports")({
  component: VendorReports,
});

const trend = [
  { m: "Feb", r: 8200000 }, { m: "Mar", r: 10500000 },
  { m: "Apr", r: 9800000 }, { m: "Mei", r: 12400000 },
  { m: "Jun", r: 15100000 }, { m: "Jul", r: 17800000 },
];

function VendorReports() {
  const { data: bookings = [] } = useQuery({ queryKey: ["v-bookings", VENDOR_ID], queryFn: () => bookingService.list({ vendorId: VENDOR_ID }) });
  const { data: cars = [] } = useQuery({ queryKey: ["cars"], queryFn: () => carService.list() });

  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-card p-5">
        <h2 className="mb-4 font-display font-semibold">Tren Revenue 6 Bulan</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="m" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(v) => `${v / 1000000}jt`} />
              <Tooltip formatter={(v: number) => "Rp " + v.toLocaleString("id-ID")} />
              <Line type="monotone" dataKey="r" stroke="oklch(0.5 0.24 275)" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b p-4"><h3 className="font-display font-semibold">Transaksi</h3></div>
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-4">Tanggal</th><th className="p-4">Mobil</th>
              <th className="p-4">Mode</th><th className="p-4">Status</th>
              <th className="p-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((b) => {
              const car = cars.find((c) => c.id === b.carId);
              return (
                <tr key={b.id}>
                  <td className="p-4 num text-xs">{new Date(b.startTime).toLocaleDateString("id-ID")}</td>
                  <td className="p-4">{car?.name}</td>
                  <td className="p-4">{b.withDriver ? "Dgn Supir" : "Lepas Kunci"}</td>
                  <td className="p-4 capitalize">{b.status}</td>
                  <td className="p-4 text-right"><PriceDisplay amount={b.totalPrice} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
