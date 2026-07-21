import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, User } from "lucide-react";
import { MapPlaceholder } from "@/components/MapPlaceholder";

export const Route = createFileRoute("/driver/trip/$id")({
  component: DriverTrip,
});

type Phase = "arriving" | "on_trip" | "done";

function DriverTrip() {
  const [phase, setPhase] = useState<Phase>("arriving");
  const navigate = useNavigate();

  const next = () => {
    if (phase === "arriving") setPhase("on_trip");
    else if (phase === "on_trip") setPhase("done");
    else navigate({ to: "/driver/home" });
  };

  return (
    <div className="space-y-4 py-4">
      <MapPlaceholder className="h-64 w-full" label={phase === "arriving" ? "Menuju penumpang" : "Dalam perjalanan"} />

      <div className="space-y-3 rounded-2xl bg-white p-5 text-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-display font-semibold">Andre Wijaya</p>
            <p className="text-xs text-muted-foreground">4.9 · 12 trip</p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-status-ready text-white">
            <Phone className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl bg-muted p-3 text-sm">
          <p className="text-[10px] uppercase text-muted-foreground">Tujuan</p>
          <p>Bandara Soekarno-Hatta, Terminal 3</p>
        </div>

        <button onClick={next} className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground">
          {phase === "arriving" ? "Jemput Penumpang" : phase === "on_trip" ? "Selesaikan Trip" : "Kembali ke Home"}
        </button>
      </div>
    </div>
  );
}
