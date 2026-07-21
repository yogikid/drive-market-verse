import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { carService } from "@/services";
import { StatusPill } from "@/components/StatusPill";
import { PriceDisplay } from "@/components/PriceDisplay";

const searchSchema = z.object({
  q: z.string().optional(),
  brand: z.string().optional(),
  class: z.string().optional(),
});

export const Route = createFileRoute("/_public/cars")({
  validateSearch: searchSchema,
  component: CarsListPage,
});

function CarsListPage() {
  const search = Route.useSearch();
  const { data: cars = [] } = useQuery({
    queryKey: ["cars", search],
    queryFn: () => carService.list({ q: search.q, brand: search.brand, carClass: search.class }),
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Cari Mobil</h1>
        <p className="text-sm text-muted-foreground">
          {cars.length} mobil {search.brand && `· ${search.brand}`} {search.class && `· ${search.class}`} {search.q && `· "${search.q}"`}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((c) => (
          <Link key={c.id} to="/cars/$id" params={{ id: c.id }} className="group overflow-hidden rounded-2xl border bg-card transition hover:border-primary hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={c.images[0]} alt={c.name} className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">{c.brand} · {c.carClass}</p>
                  <h3 className="font-display font-semibold">{c.name}</h3>
                </div>
                <StatusPill status={c.status} />
              </div>
              <div className="flex items-end justify-between pt-2">
                <PriceDisplay amount={c.pricing[3].selfDrivePrice} suffix="/hari" size="lg" />
                <span className="text-xs text-muted-foreground">{c.city}</span>
              </div>
            </div>
          </Link>
        ))}
        {cars.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">Tidak ada mobil ditemukan.</p>}
      </div>
    </div>
  );
}
