import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HookahExperience from "@/components/menu/HookahExperience";
import { getPublicHookahMenu } from "@/lib/menu-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hookah Lounge",
  description: "Browse the live hookah flavours and premium bases at AL Cafe & Lounge.",
  alternates: { canonical: "/hookah-lounge" },
  openGraph: { images: ["/image/img8.jpg"] },
};

export default async function HookahLoungePage() {
  const items = await getPublicHookahMenu();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HookahExperience items={items} />
      <Footer />
    </main>
  );
}
