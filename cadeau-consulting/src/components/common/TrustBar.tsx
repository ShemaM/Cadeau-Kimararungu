"use client";

import Image from "next/image";

const PARTNERS = [
  {
    name: "UNHCR",
    logo: "/images/partners/unhcr.png",
    width: 120, // Adjust based on aspect ratio
    height: 60,
  },
  {
    name: "University of Oxford",
    logo: "/images/partners/oxford.png",
    width: 140,
    height: 60,
  },
  {
    name: "Samuel Hall",
    logo: "/images/partners/samuel-hall.png",
    width: 130,
    height: 50,
  },
  {
    name: "Refugee Led Research Hub",
    logo: "/images/partners/rlrh.jpeg",
    width: 100,
    height: 80,
  },
  {
    name: "Global Rights Defenders",
    logo: "/images/partners/grd.jpeg",
    width: 110,
    height: 60,
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">
          Trusted Research Partner For
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20">
          {PARTNERS.map((partner) => (
            <div 
              key={partner.name} 
              className="group relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
            >
              {/* Fallback Text (Hidden if image loads, but useful for SEO) */}
              <span className="sr-only">{partner.name}</span>
              
              <Image
                src={partner.logo}
                alt={`${partner.name} Logo`}
                width={partner.width}
                height={partner.height}
                className="object-contain h-12 w-auto max-w-37.5 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}