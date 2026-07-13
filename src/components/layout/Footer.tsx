import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import siteConfig from "@/data/site-config.json";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="relative inline-block p-1 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,122,0,0.2)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] hover:border-[#FF7A00]/60 transition-all duration-500 overflow-hidden w-max group cursor-pointer">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-black">
                <img 
                  src="/image/img23.webp" 
                  alt="Al Cafe Logo" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
            </div>
            <p className="text-white/60 font-light leading-relaxed">
              Experience luxury beyond taste. The ultimate destination for premium coffee, fine dining, and exquisite shisha.
            </p>
            <div className="flex gap-4">
              <Link href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-colors text-white/70" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
              <Link href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-colors text-white/70" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Menu", "Gallery", "Bookings", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-[#FF7A00] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="text-[#FF7A00] w-5 h-5 shrink-0 mt-1" />
                <span>{siteConfig.contact.address.display}</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="text-[#FF7A00] w-5 h-5 shrink-0" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="text-[#FF7A00] w-5 h-5 shrink-0" />
                <span>{siteConfig.contact.emails.primary}</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Opening Hours</h4>
            <ul className="space-y-4">
              {siteConfig.hours.map((hours) => (
                <li key={hours.label} className="flex justify-between text-white/60 gap-4">
                  <span>{hours.label}</span>
                  <span className="text-right">{hours.display}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {siteConfig.business.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> for luxury
          </p>
        </div>
      </div>
    </footer>
  );
}
