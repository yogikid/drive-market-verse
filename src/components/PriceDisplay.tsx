import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/format";

interface Props {
  amount: number;
  suffix?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
};

export function PriceDisplay({ amount, suffix, className, size = "md" }: Props) {
  return (
    <span className={cn("num font-semibold tracking-tight", sizes[size], className)}>
      {formatIDR(amount)}
      {suffix && <span className="ml-1 text-xs font-normal text-muted-foreground">{suffix}</span>}
    </span>
  );
}
