import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, X } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";

export const Route = createFileRoute("/driver/home")({
  component: DriverHome,
});

const mockOrder = {
  id: "b1",
  customerName: "Andre Wijaya",
  pickup: "Jl. Sudirman No. 21, Jakarta",
  dropoff: "Bandara Soekarno-Hatta",
  distance: "38 km",
  earn: 180000,
  car: "Toyota Avanza · B 1234 XYZ",
};

function DriverHome() {
  const [online, setOnline] = useState(true);
  const [order, setOrder] = useState<typeof mockOrder | null>(mockOrder);
  const navigate = useNavigate();

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
        <div>
          <p className="text-xs text-white/50">Status</p>
          <p className="font-display text-lg font-semibold">{online ? "Available" : "Offline"}</p>
        </div>
        <button
          onClick={() => setOnline((v) => !v)}
          className={`relative h-8 w-14 rounded-full transition ${online ? "bg-status-ready" : "bg-white/20"}`}
        >
          <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${online ? "left-7" : "left-1"}`} />
        </button>
      </div>

      {online && order ? (
        <div className="space-y-4 rounded-2xl bg-white p-5 text-foreground">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Orderan Masuk</p>
            <h2 className="mt-1 font-display text-xl font-bold">{order.customerName}</h2>
            <p className="text-xs text-muted-foreground">{order.car}</p>
          </div>

          <div className="space-y-3 rounded-xl bg-muted p-3">
            <div className="flex gap-3">
              <div className="mt-1 flex flex-col items-center">
                <span className="h-2 w-2 rounded-full bg-status-ready" />
                <span className="h-8 w-px bg-border" />
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="flex-1 space-y-3 text-sm">
                <div><p className="text-[10px] uppercase text-muted-foreground">Jemput</p><p>{order.pickup}</p></div>
                <div><p className="text-[10px] uppercase text-muted-foreground">Antar</p><p>{order.dropoff}</p></div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t pt-3 text-xs">
              <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {order.distance}</span>
              <PriceDisplay amount={order.earn} className="text-status-ready" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setOrder(null)} className="flex items-center justify-center gap-1 rounded-xl border border-status-maintenance/30 py-3 text-status-maintenance">
              <X className="h-4 w-4" /> Tolak
            </button>
            <button onClick={() => navigate({ to: "/driver/trip/$id", params: { id: order.id } })} className="flex items-center justify-center gap-1 rounded-xl bg-status-ready py-3 font-medium text-white">
              <Check className="h-4 w-4" /> Terima
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white/5 p-8 text-center">
          <p className="text-sm text-white/60">{online ? "Menunggu orderan masuk..." : "Anda sedang offline"}</p>
        </div>
      )}
    </div>
  );
}
