import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  href?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
};

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function BrandLogo({
  href = "/",
  priority = false,
  size = "md",
  theme = "dark",
  className,
  showWordmark = true,
}: BrandLogoProps) {
  const textColor = theme === "light" ? "text-white" : "text-brand-navy";
  const subColor = theme === "light" ? "text-white/70" : "text-brand-slate";

  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-2xl bg-white/10",
          sizeClasses[size]
        )}
      >
        <Image
          src="/brand/fit4force-logo.png"
          alt="Fit4Force logo"
          fill
          priority={priority}
          className="object-contain"
          sizes="64px"
        />
      </span>
      {showWordmark ? (
        <span className="min-w-0">
          <span className={cn("block text-base font-bold leading-none", textColor)}>
            Fit4Force
          </span>
          <span className={cn("mt-1 block text-xs font-semibold", subColor)}>
            Recruitment Prep
          </span>
        </span>
      ) : null}
    </span>
  );

  return href ? (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  ) : (
    content
  );
}
