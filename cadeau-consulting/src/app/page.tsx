"use client";

import Link from "next/link";
import { ArrowRight, Globe2, BarChart3, Users, ChevronRight, MapPin, Shield, Users2, ZoomIn, ZoomOut, Maximize2, Target, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import TrustBar from "@/components/common/TrustBar";
import { useState, useRef, useEffect } from "react";

// Types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

interface RefugeeCamp {
  id: string;
  name: string;
  country: string;
  coordinates: { x: number; y: number }; // SVG coordinates
  description: string;
  population?: string;
  type: 'major' | 'large' | 'urban';
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

// SVG coordinates for countries (simplified shapes)
const COUNTRY_PATHS = [
  { 
    id: "kenya", 
    name: "Kenya", 
    color: "#3B82F6", 
    path: "M 450,150 L 550,120 L 650,180 L 620,280 L 520,320 L 430,250 L 450,150 Z",
    opacity: 0.1
  },
  { 
    id: "uganda", 
    name: "Uganda", 
    color: "#10B981", 
    path: "M 520,320 L 580,300 L 620,350 L 590,420 L 530,380 L 520,320 Z",
    opacity: 0.05
  },
  { 
    id: "rwanda", 
    name: "Rwanda", 
    color: "#8B5CF6", 
    path: "M 590,420 L 620,410 L 640,440 L 610,470 L 580,450 L 590,420 Z",
    opacity: 0.05
  },
  { 
    id: "burundi", 
    name: "Burundi", 
    color: "#F59E0B", 
    path: "M 590,470 L 620,460 L 630,490 L 600,520 L 570,500 L 590,470 Z",
    opacity: 0.05
  },
  { 
    id: "tanzania", 
    name: "Tanzania", 
    color: "#EF4444", 
    path: "M 620,350 L 700,320 L 750,380 L 730,480 L 650,460 L 620,350 Z",
    opacity: 0.05
  },
  { 
    id: "drc", 
    name: "DR Congo", 
    color: "#EC4899", 
    path: "M 400,300 L 520,280 L 570,350 L 560,450 L 480,480 L 400,420 L 400,300 Z",
    opacity: 0.05
  }
];

// Refugee camp data with SVG coordinates
const REFUGEE_CAMPS: RefugeeCamp[] = [
  {
    id: "kakuma",
    name: "Kakuma Refugee Camp",
    country: "Kenya",
    coordinates: { x: 500, y: 200 },
    description: "One of the largest refugee camps in Africa, hosting refugees from South Sudan, Somalia, Ethiopia, and DRC.",
    population: "200,000+",
    type: 'major'
  },
  {
    id: "dadab",
    name: "Dadaab Refugee Complex",
    country: "Kenya",
    coordinates: { x: 550, y: 250 },
    description: "World's largest refugee camp complex, primarily hosting Somali refugees since 1991.",
    population: "300,000+",
    type: 'major'
  },
  {
    id: "kalobeyei",
    name: "Kalobeyei Settlement",
    country: "Kenya",
    coordinates: { x: 495, y: 205 },
    description: "Integrated settlement promoting self-reliance and economic integration with host community.",
    population: "40,000+",
    type: 'large'
  },
  {
    id: "nakivale",
    name: "Nakivale Settlement",
    country: "Uganda",
    coordinates: { x: 560, y: 340 },
    description: "Oldest refugee settlement in Africa, hosting multiple nationalities with integrated approach.",
    population: "150,000+",
    type: 'major'
  },
  {
    id: "nyarugusu",
    name: "Nyarugusu Camp",
    country: "Tanzania",
    coordinates: { x: 630, y: 380 },
    description: "One of the largest refugee camps in Tanzania, primarily hosting Congolese refugees.",
    population: "150,000+",
    type: 'major'
  },
  {
    id: "mahama",
    name: "Mahama Camp",
    country: "Rwanda",
    coordinates: { x: 610, y: 430 },
    description: "Rwanda's largest refugee camp, hosting Burundian refugees since 2015.",
    population: "60,000+",
    type: 'large'
  },
  {
    id: "goma",
    name: "Goma Transit Center",
    country: "DRC",
    coordinates: { x: 530, y: 380 },
    description: "Critical transit point for internally displaced persons in conflict-affected Eastern DRC.",
    population: "Varies",
    type: 'urban'
  },
  {
    id: "bujumbura",
    name: "Bujumbura Urban",
    country: "Burundi",
    coordinates: { x: 600, y: 485 },
    description: "Urban refugee population with unique protection and livelihood challenges.",
    population: "15,000+",
    type: 'urban'
  }
];

// Great Lakes representation
const GREAT_LAKES = [
  { id: "victoria", name: "Lake Victoria", cx: 540, cy: 320, r: 30 },
  { id: "tanganyika", name: "Lake Tanganyika", cx: 570, cy: 430, r: 25 },
  { id: "kivu", name: "Lake Kivu", cx: 550, cy: 400, r: 20 }
];

export default function Home() {
  const [selectedCamp, setSelectedCamp] = useState<RefugeeCamp | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapView, setMapView] = useState<'regional' | 'kenya'>('regional');
  const mapRef = useRef<SVGSVGElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setMapView('regional');
  };

  const focusOnKenya = () => {
    setMapView('kenya');
    setZoomLevel(1.5);
    setPosition({ x: -50, y: -30 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, []);

  // Get camp color based on type
  const getCampColor = (type: RefugeeCamp['type']) => {
    switch(type) {
      case 'major': return '#EF4444';
      case 'large': return '#F59E0B';
      case 'urban': return '#60A5FA';
      default: return '#60A5FA';
    }
  };

  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 z-10">
            
            {/* Scope Badges */}
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
                Great Lakes Region
              </span>
            </motion.div>

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

          {/* Right: INTERACTIVE MAP VISUAL */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative h-150 w-full"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-linear-to-br from-blue-50 to-white">
              
              {/* Map Controls */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                    <button 
                      onClick={handleZoomIn}
                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleZoomOut}
                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleReset}
                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                      title="Reset View"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                    <button 
                      onClick={() => setMapView('regional')}
                      className={`px-3 py-1 text-sm rounded transition-colors ${mapView === 'regional' ? 'bg-brand-blue text-white' : 'hover:bg-slate-100'}`}
                    >
                      Regional View
                    </button>
                    <button 
                      onClick={focusOnKenya}
                      className={`px-3 py-1 text-sm rounded transition-colors ${mapView === 'kenya' ? 'bg-brand-blue text-white' : 'hover:bg-slate-100'}`}
                    >
                      Focus on Kenya
                    </button>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs">
                  <h4 className="font-bold text-sm mb-2 text-slate-800">Refugee Camp Types</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Major Camp (100k+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Large Settlement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Urban/Transit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Map */}
              <div className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <svg 
                  ref={mapRef}
                  viewBox="0 0 800 600" 
                  className="w-full h-full"
                  style={{ 
                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  {/* Define patterns and gradients */}
                  <defs>
                    <pattern id="kenyaPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                      <rect width="40" height="40" fill="#3B82F6" fillOpacity="0.05" />
                      <circle cx="20" cy="20" r="8" fill="#3B82F6" fillOpacity="0.1" />
                      <path d="M20,0 L20,40 M0,20 L40,20" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
                    </pattern>
                    
                    <linearGradient id="lakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
                    </linearGradient>

                    {/* Glow filter for selected camps */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Great Lakes */}
                  {GREAT_LAKES.map((lake) => (
                    <g key={lake.id}>
                      <circle
                        cx={lake.cx}
                        cy={lake.cy}
                        r={lake.r}
                        fill="url(#lakeGradient)"
                        stroke="#3B82F6"
                        strokeWidth="1"
                      />
                      <text
                        x={lake.cx}
                        y={lake.cy}
                        textAnchor="middle"
                        className="text-[10px] fill-slate-700 font-medium"
                        dy=".3em"
                      >
                        {lake.name}
                      </text>
                    </g>
                  ))}

                  {/* Country borders */}
                  {COUNTRY_PATHS.map((country) => {
                    const isKenya = country.id === "kenya";
                    const isKenyaFocused = mapView === 'kenya' && isKenya;
                    
                    return (
                      <g key={country.id}>
                        <path
                          d={country.path}
                          fill={isKenyaFocused ? "url(#kenyaPattern)" : `${country.color}${Math.round(country.opacity * 255).toString(16).padStart(2, '0')}`}
                          stroke={isKenyaFocused ? "#1D4ED8" : country.color}
                          strokeWidth={isKenyaFocused ? "3" : "1.5"}
                          strokeDasharray={isKenyaFocused ? "0" : "2,2"}
                          opacity="0.8"
                        />
                        {/* Country labels */}
                        <text
                          x={getCountryLabelX(country.id)}
                          y={getCountryLabelY(country.id)}
                          className={`text-sm font-bold ${isKenyaFocused ? 'fill-brand-navy' : 'fill-slate-600'}`}
                          textAnchor="middle"
                        >
                          {country.name.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Refugee camp markers */}
                  {REFUGEE_CAMPS.map((camp) => {
                    const isKenyanCamp = camp.country === "Kenya";
                    const isSelected = selectedCamp?.id === camp.id;
                    const campColor = getCampColor(camp.type);
                    const showLabel = isSelected || (isKenyanCamp && mapView === 'kenya');
                    
                    return (
                      <g key={camp.id}>
                        {/* Pulsing effect for selected camp */}
                        {isSelected && (
                          <circle
                            cx={camp.coordinates.x}
                            cy={camp.coordinates.y}
                            r="15"
                            fill={campColor}
                            opacity="0.2"
                            className="animate-ping"
                          />
                        )}
                        
                        {/* Connection line to Kenya for non-Kenyan camps */}
                        {!isKenyanCamp && isSelected && (
                          <line
                            x1={camp.coordinates.x}
                            y1={camp.coordinates.y}
                            x2={500}
                            y2={200}
                            stroke={campColor}
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            opacity="0.4"
                          />
                        )}
                        
                        {/* Main camp marker */}
                        <circle
                          cx={camp.coordinates.x}
                          cy={camp.coordinates.y}
                          r={isSelected ? "8" : "6"}
                          fill={campColor}
                          stroke="white"
                          strokeWidth="2"
                          filter={isSelected ? "url(#glow)" : ""}
                          className="cursor-pointer transition-all duration-300"
                          onMouseEnter={() => setSelectedCamp(camp)}
                          onMouseLeave={() => {
                            setTimeout(() => {
                              if (selectedCamp?.id === camp.id) {
                                setSelectedCamp(null);
                              }
                            }, 100);
                          }}
                        >
                          <title>{camp.name} - {camp.description}</title>
                        </circle>
                        
                        {/* Camp label */}
                        {showLabel && (
                          <g transform={`translate(${camp.coordinates.x},${camp.coordinates.y})`}>
                            <rect 
                              x="10" y="-25" 
                              width="120" height="20" 
                              rx="4" 
                              fill="white" 
                              fillOpacity="0.95"
                              stroke={campColor}
                              strokeWidth="1"
                              className="shadow-sm"
                            />
                            <text 
                              x="70"
                              y="-11"
                              className="text-[10px] font-bold fill-slate-800 pointer-events-none"
                              textAnchor="middle"
                            >
                              {camp.name.split(" ")[0]}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Kenya-specific highlights */}
                  {mapView === 'kenya' && (
                    <g>
                      {/* Highlight Kenyan camps with special indicators */}
                      {REFUGEE_CAMPS.filter(camp => camp.country === "Kenya").map((camp) => (
                        <g key={`kenya-${camp.id}`}>
                          {/* Radial lines from Kenya center to camps */}
                          <line
                            x1={470}
                            y1={230}
                            x2={camp.coordinates.x}
                            y2={camp.coordinates.y}
                            stroke="#3B82F6"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            opacity="0.3"
                          />
                          
                          {/* Population indicators */}
                          <circle
                            cx={camp.coordinates.x}
                            cy={camp.coordinates.y}
                            r="12"
                            fill="transparent"
                            stroke="#3B82F6"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                          />
                        </g>
                      ))}
                      
                      {/* Kenya statistics */}
                      <text
                        x={470}
                        y={100}
                        className="text-xs font-bold fill-brand-navy"
                        textAnchor="middle"
                      >
                        Kenya: 3 Major Refugee Operations
                      </text>
                    </g>
                  )}
                </svg>

                {/* Camp Details Panel */}
                {selectedCamp && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-sm border border-slate-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full animate-pulse" 
                           style={{ backgroundColor: getCampColor(selectedCamp.type) }} 
                      />
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{selectedCamp.name}</h3>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="text-sm text-slate-600">{selectedCamp.country}</span>
                          {selectedCamp.type === 'major' && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                              Major Camp
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{selectedCamp.description}</p>
                    {selectedCamp.population && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Population:</span>
                        <span className="font-bold text-brand-navy">{selectedCamp.population}</span>
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Target className="w-3 h-3" />
                        <span>Active research site for Cadeau Héritier Consulting</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Map Title */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-blue" />
                  <span className="text-sm font-bold text-slate-800">
                    {mapView === 'kenya' ? 'Kenya Refugee Operations' : 'Great Lakes Region - Refugee Camps'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {REFUGEE_CAMPS.filter(camp => camp.country === "Kenya").length} major operations in Kenya
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR (Logos Section) */}
      <TrustBar />

      {/* 3. SOLUTIONS GRID */}
      <section className="py-24 px-6 bg-white/50">
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

          {/* Refugee Camp Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-24 bg-linear-to-r from-brand-blue/10 to-brand-navy/10 p-8 rounded-2xl border border-brand-blue/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Navigation className="w-6 h-6 text-brand-blue" />
              <h3 className="font-heading text-2xl font-bold text-brand-navy">
                Kenya Field Operations Focus
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {REFUGEE_CAMPS.filter(camp => camp.country === "Kenya").map((camp) => (
                <div key={camp.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getCampColor(camp.type) }}
                      />
                      <h4 className="font-bold text-slate-800">{camp.name}</h4>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                      {camp.type === 'major' ? 'Major' : 'Large'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{camp.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-500">Population:</div>
                    <div className="font-bold text-brand-navy">{camp.population}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span>Northwestern Kenya</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-white/50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-slate-700">
                  <span className="font-bold">Total Coverage:</span> Serving over 500,000 refugees across 3 major Kenyan camps
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Helper functions for label positioning
function getCountryLabelX(countryId: string): number {
  const positions: Record<string, number> = {
    kenya: 520,
    uganda: 560,
    rwanda: 610,
    burundi: 600,
    tanzania: 680,
    drc: 480
  };
  return positions[countryId] || 0;
}

function getCountryLabelY(countryId: string): number {
  const positions: Record<string, number> = {
    kenya: 220,
    uganda: 350,
    rwanda: 435,
    burundi: 500,
    tanzania: 420,
    drc: 380
  };
  return positions[countryId] || 0;
}