import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "premium" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-cyan text-white shadow-action hover:bg-brand-cyanDark",
  secondary: "bg-brand-blue text-white shadow-soft hover:bg-brand-blueDeep",
  premium: "bg-brand-purple text-white shadow-soft hover:brightness-95",
  ghost: "bg-transparent text-brand-navy hover:bg-brand-skySoft",
  outline:
    "border border-brand-border bg-white text-brand-navy hover:border-brand-cyan",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base",
  icon: "h-11 w-11 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
