"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail, Clock } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Button from "@/components/common/Button";
import { SITE_INFO } from "@/constants";

// Services derived from CV [cite: 6, 26, 32]
const SERVICE_TYPES = [
  "Field Research (Data Collection)",
  "Policy Analysis & Advisory",
  "Community Engagement / Workshops",
  "Data Analysis (R/PowerBI)",
  "Research Design Strategy"
];

// Locations derived from CV [cite: 18, 19, 3]
const LOCATIONS = [
  "Nairobi (Urban)",
  "Kakuma Refugee Camp",
  "Great Lakes Region (Remote)",
  "Other"
];

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Generates a pre-filled email link based on selection
  const generateMailto = () => {
    const subject = `Consultation Request: ${selectedService || "General Inquiry"}`;
    const body = `Dear Cadeau,\n\nI would like to discuss a potential collaboration regarding ${selectedService} in ${selectedLocation}.\n\nProject Brief:\n[Please describe your project timeline and goals here]\n\nBest regards,`;
    return `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main>
      {/* Header */}
      <section className="bg-brand-navy pt-32 pb-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Schedule a Consultation
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Define your research needs. Whether it&apos;s rapid mobilization in Kakuma or a comprehensive policy review, let&apos;s align on scope and timeline.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left: The Booking "Form" (Interactive UI) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
                
                {/* Step 1: Service Type */}
                <div className="mb-10">
                  <h3 className="text-brand-navy font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">1</span>
                    What type of expertise do you require?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {SERVICE_TYPES.map((service) => (
                      <button
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedService === service
                            ? "border-brand-blue bg-blue-50 text-brand-blue ring-1 ring-brand-blue"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Location */}
                <div className="mb-10">
                  <h3 className="text-brand-navy font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">2</span>
                    Where is the project focus?
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          selectedLocation === loc
                            ? "border-brand-blue bg-blue-50 text-brand-blue"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Action */}
                <div className="pt-8 border-t border-slate-100">
                  <div className="bg-brand-bg rounded-xl p-6 mb-6">
                    <p className="text-sm text-slate-600 mb-2"><strong>Next Step:</strong> Since specific availability varies by fieldwork deployment, please send this initial brief via email to initiate the scheduling process.</p>
                  </div>
                  <Button 
                    href={generateMailto()} 
                    variant="primary" 
                    size="lg" 
                    className="w-full md:w-auto"
                    icon={<Mail size={18} />}
                  >
                    Request Availability
                  </Button>
                </div>

              </div>
            </div>

            {/* Right: Availability Context */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <Clock className="text-brand-blue" size={20} />
                  Current Availability
                </h4>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>Open for <strong>Remote Consultations</strong> (Policy & Data Analysis).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span>Taking bookings for <strong>Q2 2025 Fieldwork</strong> in Nairobi.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-dust shrink-0 mt-0.5" size={16} />
                    <span>Limited availability for <strong>Kakuma</strong> deployments (Requires 3-week notice).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-navy text-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold mb-2">Urgent Inquiry?</h4>
                <p className="text-slate-300 text-sm mb-4">
                  For time-sensitive research support or media comments regarding forced migration policy.
                </p>
                <div className="flex items-center gap-2 text-brand-blue font-bold">
                  <ArrowRight size={16} />
                  {SITE_INFO.phone}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </main>
  );
}