import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Fit4Force - Nigerian Military Recruitment Preparation",
    template: "%s | Fit4Force",
  },
  description: siteConfig.description,
  applicationName: "Fit4Force",
  icons: {
    icon: "/brand/fit4force-logo.png",
    apple: "/brand/fit4force-logo.png",
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    title: "Fit4Force - Nigerian Military Recruitment Preparation",
    description: siteConfig.description,
    siteName: "Fit4Force",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit4Force - Nigerian Military Recruitment Preparation",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.siteName,
            url: siteConfig.siteUrl,
            sameAs: [siteConfig.appUrl, siteConfig.downloadUrl],
            description: siteConfig.description,
          }}
        />
        {children}
      </body>
    </html>
  );
}
