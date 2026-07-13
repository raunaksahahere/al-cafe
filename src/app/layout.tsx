import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import siteConfig from "@/data/site-config.json";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.business.websiteUrl),
  icons: {
    icon: "/image/favicon.png",
  },
  title: {
    default: "AL Cafe & Lounge | Premium Shisha & Fine Dining",
    template: "%s | AL Cafe & Lounge",
  },
  description: siteConfig.business.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.business.name,
    locale: "en_IN",
    images: ["/image/img23.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-black text-white`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
