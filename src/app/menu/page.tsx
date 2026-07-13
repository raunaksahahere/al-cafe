import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MenuExperience from "@/components/menu/MenuExperience";
import { getPublicFoodMenu } from "@/lib/menu-data";
import siteConfig from "@/data/site-config.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Food Menu",
  description: `Explore the live food menu at ${siteConfig.business.name} in ${siteConfig.contact.address.display}.`,
  alternates: { canonical: "/menu" },
  openGraph: { images: ["/image/img9.jpg"] },
};

export default async function MenuPage() {
  const items = await getPublicFoodMenu();
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${siteConfig.business.name} Food Menu`,
    hasMenuSection: Object.entries(Object.groupBy(items, (item) => item.category)).map(([name, sectionItems]) => ({
      "@type": "MenuSection",
      name,
      hasMenuItem: sectionItems?.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: { "@type": "Offer", priceCurrency: "INR", price: item.price.replace(/[^0-9.]/g, "") },
      })),
    })),
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />
      <Navbar />
      <MenuExperience items={items} />
      <Footer />
    </main>
  );
}
