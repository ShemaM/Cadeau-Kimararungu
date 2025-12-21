"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";

// 1. Define the shape of a Link to satisfy TypeScript
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
          ? "bg-white/90 backdrop-blur-md border-slate-200 py-3 shadow-sm"
          : "bg-white/0 border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* BRAND LOGO */}
        <Link 
          href="/" 
          className="font-heading font-bold text-xl tracking-tight z-50 text-brand-navy"
          onClick={() => setIsOpen(false)}
        >
          Cadeau Héritier<span className="text-brand-blue">.</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          {/* Explicitly typed 'link' here to fix the type error */}
          {NAV_LINKS.map((link: NavLink) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-brand-blue font-semibold" 
                    : "text-slate-600 hover:text-brand-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-brand-navy text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-sm active:scale-95"
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
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col pt-32 px-6 space-y-6 animate-in slide-in-from-top-5 duration-200 md:hidden">
            {NAV_LINKS.map((link: NavLink) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-2xl font-heading font-bold pb-4 border-b border-slate-100 ${
                  pathname === link.href ? "text-brand-blue" : "text-brand-navy"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-8">
              <Link
                href="/contact"
                className="block w-full text-center py-4 bg-brand-blue text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
            </div>
            
            <div className="mt-auto pb-10 text-center text-sm text-slate-400">
              <p>Based in Nairobi & Remote</p>
              <p className="mt-1">Cadeauheritier01@gmail.com </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}