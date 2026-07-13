import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SignatureExperience from "@/components/sections/SignatureExperience";
import Menu from "@/components/sections/Menu";
import FeaturedMenu from "@/components/sections/FeaturedMenu";
import AmbienceGallery from "@/components/sections/AmbienceGallery";
import Team from "@/components/sections/Team";
import BookingForm from "@/components/sections/BookingForm";

import LocationContact from "@/components/sections/LocationContact";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/ui/FloatingActions";
import type { Metadata } from "next";
import siteConfig from "@/data/site-config.json";

export const metadata: Metadata = {
  title: "Premium Shisha & Fine Dining",
  description: siteConfig.business.description,
  alternates: { canonical: "/" },
  openGraph: { images: ["/image/img1.jpg"] },
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: siteConfig.business.name,
    description: siteConfig.business.description,
    url: siteConfig.business.websiteUrl,
    image: new URL("/image/img1.jpg", siteConfig.business.websiteUrl).toString(),
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.emails.primary,
    priceRange: siteConfig.business.priceRange,
    servesCuisine: siteConfig.business.cuisines,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    openingHoursSpecification: siteConfig.hours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: Object.values(siteConfig.socials),
  };

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Navbar />
      
      <Hero />
      <About />
      <SignatureExperience />
      <Menu />
      <FeaturedMenu />
      <AmbienceGallery />
      <Team />
      <BookingForm />

      <LocationContact />
      
      <Footer />
      <FloatingActions />
    </main>
  );
}
