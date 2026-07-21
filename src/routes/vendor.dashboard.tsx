import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { bookingService, carService, driverService } from "@/services";
import { StatusPill } from "@/components/StatusPill";
import { PriceDisplay } from "@/components/PriceDisplay";

const VENDOR_ID = "v1"; // mock: current logged-in vendor

export const Route = createFileRoute("/vendor/dashboard")({
  component: VendorDashboard,
});

function VendorDashboard() {
  const { data: cars = [] } = useQuery({ queryKey: ["v-cars", VENDOR_ID], queryFn: () => carService.list({ vendorId: VENDOR_ID }) });
  const { data: bookings = [] } = useQuery({ queryKey: ["v-bookings", VENDOR_ID], queryFn: () => bookingService.list({ vendorId: VENDOR_ID }) });
  const { data: drivers = [] } = useQuery({ queryKey: ["v-drivers", VENDOR_ID], queryFn: () => driverService.list(VENDOR_ID) });

  const revenue = bookings.filter((b) => b.paymentStatus === "paid").reduce((s, b) => s + b.totalPrice, 0);
  const byStatus = { ready: 0, active: 0, maintenance: 0 };
  cars.forEach((c) => { byStatus[c.status]++; });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Revenue</p>
          <PriceDisplay amount={revenue} size="lg" className="mt-2 block" />
        </div>
        {(["ready", "active", "maintenance"] as const).map((k) => (
          <div key={k} className="rounded-xl border bg-card p-4">
            <StatusPill status={k} />
            <p className="num mt-2 text-2xl font-semibold">{byStatus[k]}</p>
            <p className="text-xs text-muted-foreground">unit mobil</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card">
          <div className="border-b p-4"><h3 className="font-display font-semibold">Supir Aktif</h3></div>
          <div className="divide-y">
            {drivers.map((d) => {
              const car = cars.find((c) => c.id === d.currentCarId);
              return (
                <div key={d.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {car ? `${car.brand} ${car.name} · ${car.carClass}` : "Belum bertugas"}
                    </p>
                  </div>
                  <StatusPill
                    status={d.status === "on_trip" ? "active" : d.status === "available" ? "ready" : "maintenance"}
                    label={d.status === "on_trip" ? "On Trip" : d.status === "available" ? "Available" : "Offline"}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="border-b p-4"><h3 className="font-display font-semibold">Booking Terbaru</h3></div>
          <div className="divide-y">
            {bookings.slice(0, 5).map((b) => {
              const car = cars.find((c) => c.id === b.carId);
              return (
                <div key={b.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{car?.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(b.startTime).toLocaleDateString("id-ID")}</p>
                  </div>
                  <PriceDisplay amount={b.totalPrice} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
