"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  BarChart3, 
  Users, 
  ChevronRight, 
  CheckCircle2,
  Languages
} from "lucide-react";
import { motion } from "framer-motion";
import TrustBar from "@/components/common/TrustBar"; // Ensures Client's "Logos" requirement is met

// Dynamic import for Leaflet map with no SSR
const InteractiveMap = dynamic(
  () => import("@/components/visuals/LeafletMap"), 
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-3xl">
        <span className="text-slate-400">Loading Map...</span>
      </div>
    ),
  }
);

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const SERVICES: Service[] = [
  {
    id: "research-data",
    title: "Qualitative & Quantitative Research",
    description: "Rigorous mixed-methods data collection, survey design, and analysis using R & Python in complex environments like Kakuma.",
    icon: BarChart3,
    delay: 0.1,
  },
  {
    id: "community-engagement",
    title: "Community Engagement",
    description: "Ethical focus group facilitation (FGDs) and participant mobilization that respects agency and ensures safety.",
    icon: Users,
    delay: 0.2,
  },
  {
    id: "translation-policy",
    title: "Translation & Policy",
    description: "Native fluency in Kiswahili, Kinyamulenge, and French, bridging the gap between raw field data and high-level policy briefs.",
    icon: Languages, // Switched to Languages icon to highlight the Translation service
    delay: 0.3,
  },
];

const STATS = [
  { label: "Active Countries", value: "5+" },
  { label: "Research Projects", value: "20+" },
  { label: "Lives Impacted", value: "10k+" },
];

export default function Home() {
  const [mapView, setMapView] = useState<'regional' | 'kenya'>('regional');

  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-6 z-10">
            
            {/* Main Heading (H1) */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy leading-[1.1] tracking-tight"
            >
              Forced Migration Research, <br className="hidden md:block" />
              Policy & Community Engagement.
            </motion.h1>

            {/* Tagline / Subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl font-medium text-slate-500"
            >
              Bridging the gap between <span className="text-brand-blue font-bold">Policy</span> and <span className="text-brand-dust font-bold">Reality</span>.
            </motion.h2>
            
            {/* Descriptive Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Cadeau Héritier Consulting provides evidence-based research and strategic advisory for humanitarian organizations. We go where others can&apos;t.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                href="/services" 
                className="px-8 py-4 bg-brand-navy text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2 group"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-brand-navy border border-slate-200 font-semibold rounded-xl hover:bg-slate-50 transition-all hover:shadow-md"
              >
                Book Consultation
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 flex gap-12 border-t border-slate-200/60 mt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-brand-navy">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: LEAFLET MAP VISUAL */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative h-150 w-full"
          >
             {/* Map Controls Overlay */}
             <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-slate-200 flex flex-col gap-2">
                <button 
                  onClick={() => setMapView('regional')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-colors ${mapView === 'regional' ? 'bg-brand-blue text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                  Regional View
                </button>
                <button 
                  onClick={() => setMapView('kenya')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-colors ${mapView === 'kenya' ? 'bg-brand-blue text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                  Focus on Kenya
                </button>
             </div>
             
             {/* Legend Overlay */}
             <div className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 max-w-xs">
                <h4 className="font-bold text-brand-navy mb-2 text-sm">Operational Footprint</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                    <span className="text-slate-600">Major Operations (Kakuma, Dadaab)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full bg-orange-500 block"></span>
                    <span className="text-slate-600">Large Settlements</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full bg-blue-500 block"></span>
                    <span className="text-slate-600">Urban Transit Centers</span>
                  </div>
                </div>
             </div>

            <InteractiveMap view={mapView} />
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR (Logos Section) */}
      <TrustBar />

      
      {/* 3. ABOUT TEASER SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <div className="relative">
             {/* Decorative Blur Blob */}
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-dust/10 rounded-full blur-2xl"></div>
             
             {/* Image Container with Rotation & Shadow */}
             <div className="relative bg-white rounded-2xl p-2 rotate-2 shadow-2xl shadow-slate-200 border border-slate-100">
               <div className="aspect-4/5 relative rounded-xl overflow-hidden bg-slate-100">
                  <Image 
                    src="/images/profile.png" 
                    alt="Cadeau Héritier - Research Consultant"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
               </div>
             </div>
          </div>

          {/* Content Column */}
          <div>
            <span className="text-brand-blue font-bold tracking-wider text-sm uppercase">Who We Are</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mt-3 mb-6">
              More than consultants.<br/> We are <span className="text-brand-dust">partners in the field.</span>
            </h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Founded on the principle that effective humanitarian policy requires deep, contextual understanding, Cadeau Héritier Consulting bridges the gap between high-level strategy and ground-level reality.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Deep access to refugee communities across East Africa",
                "Native linguistic fluency in Swahili, French, and local dialects",
                "Ethical data collection standards compliant with international norms"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link 
              href="/about" 
              className="inline-flex items-center font-bold text-brand-navy border-b-2 border-brand-dust pb-1 hover:text-brand-blue hover:border-brand-blue transition-colors"
            >
              Read Our Story <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-brand-blue font-bold tracking-wider text-sm uppercase">Our Expertise</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mt-3">
                Specialized Expertise. <br />
                <span className="text-brand-blue">Deployed where it matters.</span>
              </h2>
            </div>
            <Link 
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 rounded-lg font-semibold text-brand-navy hover:bg-white transition-colors"
            >
              View All Services
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-brand-blue/30 transition-all hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-blue-50/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-8 text-sm">
                  {service.description}
                </p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center text-sm font-bold text-brand-blue group-hover:gap-2 transition-all"
                >
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 px-6 bg-brand-navy relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to initiate a project?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Whether you need a rapid assessment in Kakuma or a comprehensive policy review for the Great Lakes region, we are ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-brand-dust hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-colors shadow-lg shadow-yellow-900/20"
            >
              Get in Touch
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Why Choose Us?
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}