import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const downloadUrl =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force";

export function ToolShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>{children}</div>
      <Card className="h-fit">
        <h2 className="text-xl font-bold">Continue in Fit4Force</h2>
        <p className="mt-3 text-sm leading-6 text-brand-slate">
          Use this quick checker, then continue with study materials, fitness
          training, progress tracking, and community features in the app.
        </p>
        <Link
          href={downloadUrl}
          className="mt-5 inline-flex items-center gap-2 rounded-pill bg-brand-cyan px-5 py-3 text-sm font-bold text-white shadow-action"
        >
          Download App
          <ArrowRight size={16} />
        </Link>
        <div className="mt-6 rounded-tile bg-brand-skySoft p-4">
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-2 text-sm leading-6 text-brand-slate">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
}
