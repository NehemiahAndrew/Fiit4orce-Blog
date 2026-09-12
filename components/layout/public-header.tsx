"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/updates", label: "Updates" },
  { href: "/tools", label: "Tools" },
];

export function PublicHeader({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isLight = theme === "light";
  const panelClass = isLight
    ? "border-white/14 bg-white/10 backdrop-blur-md"
    : "border-brand-border bg-white";
  const textClass = isLight ? "text-white/78" : "text-brand-slate";
  const activeClass = isLight
    ? "bg-white text-brand-blue"
    : "bg-brand-cyan text-white";
  const hoverClass = isLight ? "hover:text-white" : "hover:text-brand-navy";
  const iconButtonClass = isLight
    ? "border-white/16 bg-white/10 text-white"
    : "border-brand-border bg-white text-brand-navy";
  const mobilePanelClass = isLight
    ? "border-white/14 bg-[#0f1f46]/88 text-white backdrop-blur-xl"
    : "border-brand-border bg-white text-brand-navy";

  return (
    <div className="relative z-20">
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-[24px] border px-4 py-3 sm:px-5",
          panelClass
        )}
      >
        <BrandLogo href="/" size="sm" theme={theme} />

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-semibold transition",
                  isActive ? activeClass : cn(textClass, hoverClass)
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={siteConfig.appUrl}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-pill px-5 text-sm font-semibold transition",
              isLight
                ? "bg-white text-brand-blue shadow-action hover:bg-brand-skySoft"
                : "bg-brand-cyan text-white shadow-action hover:bg-brand-cyanDark"
            )}
          >
            Launch App
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
            iconButtonClass
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div
          className={cn(
            "mt-3 rounded-[24px] border p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)] lg:hidden",
            mobilePanelClass
          )}
        >
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? activeClass
                      : isLight
                        ? "text-white/88 hover:bg-white/10"
                        : "text-brand-navy hover:bg-brand-ice"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href={siteConfig.appUrl}
            onClick={() => setOpen(false)}
            className={cn(
              "mt-3 inline-flex h-11 w-full items-center justify-center rounded-pill px-5 text-sm font-semibold transition",
              isLight
                ? "bg-white text-brand-blue shadow-action hover:bg-brand-skySoft"
                : "bg-brand-cyan text-white shadow-action hover:bg-brand-cyanDark"
            )}
          >
            Launch App
          </Link>
        </div>
      ) : null}
    </div>
  );
}
