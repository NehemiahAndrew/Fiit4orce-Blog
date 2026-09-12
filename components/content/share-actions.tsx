"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Copy, Facebook, Linkedin, Twitter } from "lucide-react";

export function ShareActions({
  shareUrl,
  title,
}: {
  shareUrl: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="mt-4 grid gap-2">
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`}
        label="Facebook"
        icon={<Facebook size={17} />}
      />
      <ShareLink
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(shareUrl)}`}
        label="Twitter"
        icon={<Twitter size={17} />}
      />
      <ShareLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`}
        label="LinkedIn"
        icon={<Linkedin size={17} />}
      />
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-pill bg-brand-ice px-4 py-2 text-sm font-bold text-brand-navy"
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function ShareLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-pill bg-brand-ice px-4 py-2 text-sm font-bold text-brand-navy"
    >
      {icon}
      {label}
    </Link>
  );
}
