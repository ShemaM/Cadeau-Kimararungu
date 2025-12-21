import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// 1. Configure Body Font (Inter) - Clean, legible sans-serif for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 2. Configure Heading Font (Plus Jakarta Sans) - Modern, geometric for headings
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// 3. Metadata updated to match Client PDF [cite: 186-188]
export const metadata: Metadata = {
  title: {
    template: "%s | Cadeau Héritier Consulting",
    default: "Cadeau Héritier Consulting | Forced Migration & Policy",
  },
  description: "Specialized research, policy advisory, and community engagement for the Great Lakes Region and East Africa.",
  icons: {
    icon: "/images/profile.png", // Ensure you have a favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        
        {/* Fixed Navigation */}
        <Navbar />

        {/* Content Wrapper:
           Changed from <main> to <div> because our page.tsx files already contain 
           their own <main> tags. This prevents invalid HTML nesting.
           'pt-20' adds padding so content isn't hidden behind the fixed Navbar.
        */}
        <div className="grow pt-20">
          {children}
        </div>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}