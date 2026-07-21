import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { bookingService, carService } from "@/services";
import { StatusPill } from "@/components/StatusPill";
import { PriceDisplay } from "@/components/PriceDisplay";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { bookingStatusLabel, durationLabel } from "@/lib/format";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_public/my-bookings")({
  component: MyBookings,
});

function MyBookings() {
  const user = useSession((s) => s.user);
  const customerId = user?.id ?? "u1";
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", customerId],
    queryFn: () => bookingService.list({ customerId }),
  });
  const { data: cars = [] } = useQuery({ queryKey: ["cars"], queryFn: () => carService.list() });

  const statusToPill = (s: string): "ready" | "active" | "maintenance" => {
    if (s === "completed" || s === "confirmed") return "ready";
    if (s === "ongoing" || s === "pending") return "active";
    return "maintenance";
  };

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold">Booking Saya</h1>
      {bookings.length === 0 && <p className="py-12 text-center text-muted-foreground">Belum ada booking.</p>}
      {bookings.map((b) => {
        const car = cars.find((c) => c.id === b.carId);
        return (
          <div key={b.id} className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex flex-col gap-4 p-5 sm:flex-row">
              {car && <img src={car.images[0]} alt={car.name} className="h-24 w-full rounded-lg object-cover sm:w-40" />}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold">{car?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(b.startTime).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                  <StatusPill status={statusToPill(b.status)} label={bookingStatusLabel[b.status]} />
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-muted px-2 py-0.5">{durationLabel(b.durationType)}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5">{b.withDriver ? "Dengan Supir" : "Lepas Kunci"}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <PriceDisplay amount={b.totalPrice} size="lg" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{b.paymentStatus}</span>
                </div>
              </div>
            </div>
            {b.status === "ongoing" && b.withDriver && (
              <div className="border-t p-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Live tracking supir</p>
                <MapPlaceholder className="h-56 w-full" label="Supir dalam perjalanan" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
