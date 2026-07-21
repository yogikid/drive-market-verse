import { createFileRoute } from "@tanstack/react-router";
import { PriceDisplay } from "@/components/PriceDisplay";

export const Route = createFileRoute("/driver/history")({
  component: DriverHistory,
});

const history = [
  { id: "t1", date: "20 Jul 2026", car: "Toyota Avanza", earn: 180000, route: "Jakarta → Bandara" },
  { id: "t2", date: "18 Jul 2026", car: "Toyota Avanza", earn: 250000, route: "Jakarta → Bogor" },
  { id: "t3", date: "15 Jul 2026", car: "Daihatsu Xenia", earn: 150000, route: "Antar-jemput dalam kota" },
  { id: "t4", date: "12 Jul 2026", car: "Toyota Innova", earn: 380000, route: "Jakarta → Bandung" },
];

function DriverHistory() {
  const total = history.reduce((s, h) => s + h.earn, 0);
  return (
    <div className="space-y-4 py-4">
      <div className="rounded-2xl bg-white/5 p-5">
        <p className="text-xs uppercase tracking-wider text-white/50">Total pendapatan</p>
        <PriceDisplay amount={total} size="xl" className="mt-1 text-white" />
      </div>
      <div className="space-y-2">
        {history.map((h) => (
          <div key={h.id} className="rounded-xl bg-white p-4 text-foreground">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{h.route}</p>
                <p className="text-xs text-muted-foreground">{h.car}</p>
                <p className="num mt-1 text-[10px] text-muted-foreground">{h.date}</p>
              </div>
              <PriceDisplay amount={h.earn} className="text-status-ready" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
