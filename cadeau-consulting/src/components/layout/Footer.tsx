import Link from "next/link";
import { FOOTER_LINKS, SITE_INFO } from "@/constants";

// 1. Define Types to satisfy TypeScript Strict Mode
type FooterColumn = {
  title: string;
  links: string[];
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1: Brand Identity */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="font-heading font-bold text-2xl text-white tracking-tight">
              {SITE_INFO.name}
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              {SITE_INFO.tagline}
            </p>
            <div className="text-sm text-slate-500 pt-4 space-y-1">
              <p>Nairobi, Kenya • Oxford, UK</p>
              <p className="text-brand-blue">{SITE_INFO.email}</p>
            </div>
          </div>

          {/* Column 2: Dynamic Links (Mapped from Constants) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {FOOTER_LINKS.map((column: FooterColumn) => (
              <div key={column.title}>
                <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-xs">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link: string) => (
                    <li key={link}>
                      <span className="text-sm hover:text-brand-blue transition-colors cursor-pointer block w-fit">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} {SITE_INFO.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}