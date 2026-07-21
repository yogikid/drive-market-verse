import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { bookingService, carService } from "@/services";
import { DurationSelector } from "@/components/DurationSelector";
import { PriceDisplay } from "@/components/PriceDisplay";
import { StatusPill } from "@/components/StatusPill";
import { useSession } from "@/lib/session";
import type { DurationType } from "@/types";

export const Route = createFileRoute("/_public/booking/$carId")({
  component: BookingPage,
});

const durationHours: Record<DurationType, number> = {
  per_jam: 1, per_4_jam: 4, per_6_jam: 6, per_hari: 24,
};

function BookingPage() {
  const { carId } = Route.useParams();
  const navigate = useNavigate();
  const user = useSession((s) => s.user);
  const { data: car } = useQuery({ queryKey: ["car", carId], queryFn: () => carService.get(carId) });

  const [durationType, setDurationType] = useState<DurationType>("per_hari");
  const [withDriver, setWithDriver] = useState(false);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("08:00");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const price = useMemo(() => {
    if (!car) return 0;
    const tier = car.pricing.find((p) => p.durationType === durationType);
    return withDriver ? tier?.withDriverPrice ?? 0 : tier?.selfDrivePrice ?? 0;
  }, [car, durationType, withDriver]);

  if (!car) return <p className="py-12 text-center text-muted-foreground">Memuat...</p>;

  const handlePay = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1500));
    const start = new Date(`${startDate}T${startTime}:00`);
    const end = new Date(start.getTime() + durationHours[durationType] * 3600000);
    await bookingService.create({
      id: "b" + Date.now(),
      carId: car.id,
      customerId: user?.id ?? "u1",
      durationType,
      withDriver,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      totalPrice: price,
      status: "confirmed",
      paymentStatus: "paid",
    });
    setPaying(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-status-ready" />
        <h1 className="mt-4 font-display text-2xl font-bold">Pembayaran Berhasil</h1>
        <p className="mt-2 text-sm text-muted-foreground">Booking Anda dikonfirmasi. Vendor akan segera menghubungi.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => navigate({ to: "/my-bookings" })} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Lihat Booking Saya
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-3">
            <img src={car.images[0]} alt={car.name} className="h-16 w-24 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{car.brand} · {car.carClass}</p>
              <h2 className="font-display font-semibold">{car.name}</h2>
            </div>
            <StatusPill status={car.status} />
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold">Detail Booking</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Tanggal & Jam Mulai</label>
              <div className="flex gap-2">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm" />
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Durasi</label>
              <DurationSelector value={durationType} onChange={setDurationType} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: false, label: "Lepas Kunci", desc: "Anda yang menyetir" },
                  { v: true, label: "Dengan Supir", desc: "Supir profesional" },
                ].map((o) => (
                  <button
                    key={String(o.v)}
                    onClick={() => setWithDriver(o.v)}
                    className={`rounded-lg border p-3 text-left transition ${withDriver === o.v ? "border-primary bg-primary/5" : "hover:border-primary/40"}`}
                  >
                    <p className="text-sm font-medium">{o.label}</p>
                    <p className="text-xs text-muted-foreground">{o.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold">Ringkasan</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Mode</dt><dd>{withDriver ? "Dengan Supir" : "Lepas Kunci"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Durasi</dt><dd>{durationType.replace("_", " ")}</dd></div>
            <div className="mt-3 flex items-end justify-between border-t pt-3">
              <dt className="text-sm font-medium">Total</dt>
              <PriceDisplay amount={price} size="xl" className="text-primary" />
            </div>
          </dl>
          <button
            disabled={paying}
            onClick={handlePay}
            className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {paying ? "Memproses pembayaran..." : "Lanjut ke Pembayaran"}
          </button>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">Pembayaran mock — simulasi Midtrans</p>
        </div>
      </aside>
    </div>
  );
}
