"use client";

import { motion } from "framer-motion";
import { Check, Gift, Sparkles } from "lucide-react";
import PageHero from "@/components/launch/shared/PageHero";
import SectionHeader from "@/components/launch/shared/SectionHeader";
import ServicePricingCard from "@/components/launch/pricing/ServicePricingCard";
import FeatureComparisonTable from "@/components/launch/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/launch/pricing/PricingFAQ";
import FadeInView from "@/components/launch/shared/FadeInView";
import { services, freeCredit } from "@/data/pricing";

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pay Only for What You Use"
        subtitle="Affordable for individual creators, scalable for high-volume teams. Pricing starts at $0.99/min, and you can start with 1 free minute. No credit card required."
      />
      

      {/* Free credit banner */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="film-frame p-8 border-[#F59E0B]/20 relative overflow-hidden"
            style={{ boxShadow: "inset 0 1px 0 rgba(245, 158, 11, 0.08)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                  <Gift className="w-7 h-7 text-[#F59E0B]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-instrument-serif)] italic">
                      {freeCredit.minutes} Free Minute{freeCredit.minutes === 1 ? "" : "s"}
                    </h3>
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <p className="text-white/50 text-sm">{freeCredit.description}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-1">
                {freeCredit.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B] flex-shrink-0" />
                    <span className="text-white/60 text-xs">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={process.env.NEXT_PUBLIC_APP_URL || "https://app.dubio.ai"}
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold text-sm transition-colors font-[family-name:var(--font-syne)] shrink-0"
              >
                Start Free
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service pricing cards */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServicePricingCard key={service.name} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Compare" title="What's Included" />
          <FeatureComparisonTable />
        </div>
      </section>

      <PricingFAQ />

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-3xl font-[family-name:var(--font-instrument-serif)] italic launch-gradient-text mb-4">
              Ready to Go Global?
            </h2>
            <p className="text-white/60 mb-8">
              Start dubbing with your first minute free. No credit card required.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_APP_URL || "https://app.dubio.ai"}
              className="inline-flex items-center px-8 py-3 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold text-sm transition-colors font-[family-name:var(--font-syne)]"
            >
              Start Dubbing Free
            </a>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
