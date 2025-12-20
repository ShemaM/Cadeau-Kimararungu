"use client";

import Link from "next/link";
import { ArrowRight, Globe2, BarChart3, Users, ChevronRight, MapPin, Shield, Users2 } from "lucide-react";
import { motion } from "framer-motion";

// --- Custom Component Imports ---
import TrustBar from "@/components/common/TrustBar";
// import CoverageMap from "@/components/visuals/CoverageMap"; // TODO: Uncomment when Map is built

// --- Types & Data ---

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const SERVICES: Service[] = [
  {
    id: "field-research",
    title: "Field Research Logistics",
    description: "Rapid deployment of enumerators and mixed-methods data collection in hard-to-reach conflict zones like Eastern DRC and Kakuma.",
    icon: Globe2,
    delay: 0.1,
  },
  {
    id: "policy-advisory",
    title: "Policy Translation",
    description: "Turning raw field data into high-level policy briefs for donors, NGOs (UNHCR), and government bodies.",
    icon: BarChart3,
    delay: 0.2,
  },
  {
    id: "community-engagement",
    title: "Community Dialogue",
    description: "Ethical focus group facilitation (FGDs) that respects agency, ensures safety, and leverages native linguistic fluency.",
    icon: Users,
    delay: 0.3,
  },
];

const STATS = [
  { label: "Active Countries", value: "5+" },
  { label: "Research Projects", value: "20+" },
  { label: "Lives Impacted", value: "10k+" },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 px-6 bg-hero-gradient">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 z-10">
            
            {/* --- SCOPE BADGES (Scope of Practice) --- */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-brand-navy text-xs font-bold uppercase tracking-wide shadow-sm">
                <Shield className="w-3 h-3 text-brand-blue" />
                Forced Migration Research
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-brand-navy text-xs font-bold uppercase tracking-wide shadow-sm">
                <Users2 className="w-3 h-3 text-brand-dust" />
                Policy & Community Engagement
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-brand-navy text-xs font-bold uppercase tracking-wide shadow-sm">
                <MapPin className="w-3 h-3 text-brand-blue" />
                Great Lakes Region, East Africa & Remote
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.1] tracking-tight"
            >
              Bridging the gap between <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-blue to-blue-400">Policy</span> and <span className="text-brand-dust">Reality</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Cadeau Héritier Consulting provides evidence-based research and strategic advisory for humanitarian organizations. We go where others can&apos;t.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link 
                href="/solutions" 
                className="px-8 py-4 bg-brand-navy text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2 group"
              >
                Explore Solutions
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
              className="pt-8 flex gap-12 border-t border-slate-200/60"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-brand-navy">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: The Map Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative h-150 w-full"
          >
             {/* TODO: UNCOMMENT THIS BLOCK ONCE src/components/visuals/CoverageMap.tsx IS CREATED
                <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-2">
                   <div className="w-full h-full bg-slate-50 rounded-2xl overflow-hidden relative">
                      <CoverageMap activeCountries={['Kenya', 'Uganda', 'Rwanda', 'Burundi', 'DRC']} />
                   </div>
                </div>
             */}
             
             {/* Temporary Visual until Map is ready */}
             <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px]">
                <div className="w-64 h-64 bg-blue-100/50 rounded-full flex items-center justify-center animate-pulse">
                   <Globe2 className="w-24 h-24 text-brand-blue opacity-50" />
                </div>
                <p className="mt-8 text-slate-500 font-medium font-heading">Interactive Coverage Map Loading...</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR (Logos Section) */}
      <TrustBar />

      {/* 3. SOLUTIONS GRID */}
      <section className="py-24 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-6">
              Specialized Expertise. <br />
              <span className="text-brand-blue">Deployed where it matters.</span>
            </h2>
            <p className="text-slate-600 text-lg">
              We don&apos;t just write reports. We design methodology, manage field logistics, and translate complex data into actionable policy frameworks.
            </p>
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
                  href="/solutions" 
                  className="inline-flex items-center text-sm font-bold text-brand-blue group-hover:gap-2 transition-all"
                >
                  View Methodologies <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}