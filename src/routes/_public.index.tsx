import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { carService } from "@/services";
import { StatusPill } from "@/components/StatusPill";
import { PriceDisplay } from "@/components/PriceDisplay";

export const Route = createFileRoute("/_public/")({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string>("");
  const [carClass, setCarClass] = useState<string>("");

  const { data: cars = [] } = useQuery({ queryKey: ["cars"], queryFn: () => carService.list() });
  const { data: brands = [] } = useQuery({ queryKey: ["brands"], queryFn: () => carService.brands() });
  const { data: classes = [] } = useQuery({ queryKey: ["classes"], queryFn: () => carService.classes() });

  const featured = cars.filter((c) => c.status === "ready").slice(0, 6);

  const applyFilter = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (carClass) params.set("class", carClass);
    if (q) params.set("q", q);
    navigate({ to: "/cars", search: { brand: brand || undefined, class: carClass || undefined, q: q || undefined } });
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.18_275)] p-8 text-primary-foreground sm:p-12">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3 w-3" /> Marketplace rental multi-vendor
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Sewa mobil fleksibel,<br />harian sampai per jam.
          </h1>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            Lepas kunci atau dengan supir. Dari city car sampai luxury, tersedia di kota-kota besar Indonesia.
          </p>

          <div className="mt-6 rounded-2xl bg-white p-3 text-foreground shadow-xl">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-lg border px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Cari nama mobil..."
                  className="flex-1 bg-transparent py-2 text-sm outline-none"
                />
              </div>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm">
                <option value="">Semua Merk</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={carClass} onChange={(e) => setCarClass(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm">
                <option value="">Semua Kelas</option>
                {classes.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={applyFilter} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Cari
              </button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Featured */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Mobil pilihan</h2>
          <Link to="/cars" className="flex items-center gap-1 text-sm text-primary">Lihat semua <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
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
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Mulai dari</p>
                    <PriceDisplay amount={c.pricing[0].selfDrivePrice} suffix="/jam" size="lg" />
                  </div>
                  <span className="text-xs text-muted-foreground">{c.city}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
