"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_INFO } from "@/constants";

type NavLink = {
  href: string;
  key: string;
  label: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-slate-200 py-4 shadow-md" // Scrolled: Compact but solid
          : "bg-white/0 border-transparent py-8" // Default: Tall and transparent
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* BRAND LOGO - Increased text size */}
        <Link 
          href="/" 
          className="font-heading font-extrabold text-2xl tracking-tight z-50 text-brand-navy flex items-center gap-1"
          onClick={() => setIsOpen(false)}
        >
          Cadeau Héritier<span className="text-brand-blue">Consulting</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link: NavLink) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`text-base font-bold transition-all duration-200 ${
                  isActive 
                    ? "text-brand-blue" 
                    : "text-brand-navy hover:text-brand-blue hover:-translate-y-0.5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* CTA BUTTON - Increased size and visibility */}
          <Link
            href="/booking"
            className="px-6 py-3 bg-brand-navy text-white text-base font-bold rounded-xl hover:bg-brand-blue transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
          >
            Book Consultation
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-brand-navy z-50 p-2 hover:bg-slate-100 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col pt-32 px-6 space-y-8 animate-in slide-in-from-top-5 duration-200 md:hidden">
            {NAV_LINKS.map((link: NavLink) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-3xl font-heading font-bold pb-6 border-b border-slate-100 ${
                  pathname === link.href ? "text-brand-blue" : "text-brand-navy"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-8">
              <Link
                href="/booking"
                className="block w-full text-center py-5 bg-brand-navy text-white text-lg font-bold rounded-2xl shadow-xl active:scale-95 transition-transform"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
            </div>
            
            <div className="mt-auto pb-10 text-center text-sm text-slate-500">
              <p>Based in {SITE_INFO.address}</p>
              <p className="mt-1 font-semibold text-brand-blue">{SITE_INFO.email}</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}