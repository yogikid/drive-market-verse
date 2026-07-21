import { MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  label?: string;
  animated?: boolean;
}

export function MapPlaceholder({ className, label = "Live tracking", animated = true }: Props) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, [animated]);

  const dx = (tick % 6) * 8;
  const dy = ((tick * 3) % 5) * 6;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-[linear-gradient(135deg,#e6ecf5_0%,#f5f7fa_100%)]",
        className,
      )}
    >
      {/* fake grid */}
      <svg className="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#c8d2e0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
        <path
          d="M20 200 Q 120 160 200 180 T 380 100"
          stroke="#3A3FF0"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 6"
          opacity="0.6"
        />
      </svg>

      <div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{ left: `${30 + dx}%`, top: `${55 - dy}%` }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-primary/40" />
          <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Navigation className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>

      <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs shadow-sm backdrop-blur">
        <MapPin className="h-3 w-3 text-primary" /> {label}
      </div>
    </div>
  );
}
