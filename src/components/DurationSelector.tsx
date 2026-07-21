import { cn } from "@/lib/utils";
import type { DurationType } from "@/types";
import { durationLabel } from "@/lib/format";

const options: DurationType[] = ["per_jam", "per_4_jam", "per_6_jam", "per_hari"];

interface Props {
  value: DurationType;
  onChange: (v: DurationType) => void;
  className?: string;
}

export function DurationSelector({ value, onChange, className }: Props) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-4", className)}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-lg border px-3 py-2 text-sm transition",
            value === o
              ? "border-primary bg-primary/10 text-primary font-medium"
              : "border-border bg-card hover:border-primary/40",
          )}
        >
          {durationLabel(o)}
        </button>
      ))}
    </div>
  );
}
