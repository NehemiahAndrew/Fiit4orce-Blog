import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "cyan" | "blue" | "green" | "orange" | "purple";

const variants: Record<BadgeVariant, string> = {
  cyan: "bg-brand-cyan/10 text-brand-cyan",
  blue: "bg-brand-blue/10 text-brand-blue",
  green: "bg-brand-green/10 text-brand-green",
  orange: "bg-brand-orange/10 text-brand-orange",
  purple: "bg-brand-purpleSoft text-brand-purple",
};

export function Badge({
  className,
  variant = "cyan",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
