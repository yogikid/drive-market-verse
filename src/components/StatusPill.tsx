import { cn } from "@/lib/utils";
import type { CarStatus } from "@/types";

const map: Record<CarStatus | string, { label: string; dot: string; text: string; bg: string }> = {
  ready: { label: "Tersedia", dot: "bg-status-ready", text: "text-status-ready", bg: "bg-status-ready/10" },
  active: { label: "Disewa", dot: "bg-status-active", text: "text-status-active", bg: "bg-status-active/10" },
  maintenance: { label: "Maintenance", dot: "bg-status-maintenance", text: "text-status-maintenance", bg: "bg-status-maintenance/10" },
};

interface Props {
  status: CarStatus | string;
  label?: string;
  className?: string;
}

/**
 * Signature component — same look across all 4 roles.
 * Also usable for booking statuses via custom `label` prop.
 */
export function StatusPill({ status, label, className }: Props) {
  const m = map[status] ?? map.ready;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        m.bg,
        m.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
      {label ?? m.label}
    </span>
  );
}
