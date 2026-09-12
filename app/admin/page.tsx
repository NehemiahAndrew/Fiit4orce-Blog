import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Fit4Force Admin",
  description: "Admin dashboard for Fit4Force editorial operations.",
  icons: {
    icon: "/brand/fit4force-logo.png",
    apple: "/brand/fit4force-logo.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
