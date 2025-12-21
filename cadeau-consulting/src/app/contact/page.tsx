"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { SITE_INFO } from "@/constants";

export default function ContactPage() {
  return (
    <main>
      <section className="bg-brand-navy pt-32 pb-12 text-white">
        <Container>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Available for research consultancies, policy advisory, and collaborative projects in the Great Lakes Region[cite: 3].
          </p>
        </Container>
      </section>

      <Section className="bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-10">
              <div>
                <h3 className="font-heading text-2xl font-bold text-brand-navy mb-6">
                  Contact Details
                </h3>
                <div className="space-y-6">
                  {/* EMAIL -  */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-brand-blue">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Email</p>
                      <a href={`mailto:${SITE_INFO.email}`} className="text-lg font-medium text-brand-navy hover:text-brand-blue transition-colors">
                        {SITE_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* PHONE -  */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-brand-blue">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Phone</p>
                      <p className="text-lg font-medium text-brand-navy">
                        {SITE_INFO.phone}
                      </p>
                    </div>
                  </div>

                  {/* LOCATION - [cite: 3] */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-brand-blue">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Base of Operations</p>
                      <p className="text-lg font-medium text-brand-navy">
                        {SITE_INFO.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <p className="text-slate-600 mb-6">
                    I am currently serving as <strong>Policy & Research Advisor</strong> at Global Rights Defenders[cite: 32]. 
                    Please reach out via email for official inquiries regarding research partnerships or data analysis projects.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-500 italic">
                    &quot;Conducting research that reflects the lived experiences and priorities of displaced communities[cite: 7].&quot;
                </div>
            </div>

          </div>
        </Container>
      </Section>
    </main>
  );
}