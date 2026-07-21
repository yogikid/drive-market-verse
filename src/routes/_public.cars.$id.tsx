import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Fuel, Users } from "lucide-react";
import { carService, vendorService } from "@/services";
import { StatusPill } from "@/components/StatusPill";
import { PriceDisplay } from "@/components/PriceDisplay";
import { durationLabel } from "@/lib/format";

export const Route = createFileRoute("/_public/cars/$id")({
  component: CarDetail,
});

function CarDetail() {
  const { id } = Route.useParams();
  const { data: car } = useQuery({ queryKey: ["car", id], queryFn: () => carService.get(id) });
  const { data: vendor } = useQuery({
    queryKey: ["vendor", car?.vendorId],
    queryFn: () => vendorService.get(car!.vendorId),
    enabled: !!car,
  });

  if (!car) return <p className="py-12 text-center text-muted-foreground">Memuat...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl border bg-muted">
          <img src={car.images[0]} alt={car.name} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{car.brand} · {car.carClass}</p>
              <h1 className="font-display text-2xl font-bold">{car.name}</h1>
              {vendor && <p className="mt-1 text-xs text-muted-foreground">oleh {vendor.businessName} · {vendor.city}</p>}
            </div>
            <StatusPill status={car.status} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{car.description}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1"><Users className="h-3.5 w-3.5" /> {car.capacity} penumpang</span>
            <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1"><Fuel className="h-3.5 w-3.5" /> {car.fuelType}</span>
            <span className="num rounded-full bg-muted px-3 py-1 text-xs font-semibold">{car.plateNumber}</span>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-display font-semibold">Harga sewa</h2>
          <p className="text-xs text-muted-foreground">Pilih durasi dan mode berkendara</p>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-2">Durasi</th>
                <th className="pb-2 text-right">Lepas kunci</th>
                <th className="pb-2 text-right">Dgn supir</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {car.pricing.map((p) => (
                <tr key={p.durationType}>
                  <td className="py-2">{durationLabel(p.durationType)}</td>
                  <td className="py-2 text-right"><PriceDisplay amount={p.selfDrivePrice} size="sm" /></td>
                  <td className="py-2 text-right"><PriceDisplay amount={p.withDriverPrice} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to="/booking/$carId"
            params={{ carId: car.id }}
            className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Booking sekarang
          </Link>
        </div>
      </aside>
    </div>
  );
}
