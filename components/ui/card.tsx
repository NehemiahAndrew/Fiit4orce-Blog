import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-brand-border bg-white p-6 shadow-card",
        className
      )}
      {...props}
    />
  );
}
