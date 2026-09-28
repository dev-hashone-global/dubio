"use client";

import { motion } from "framer-motion";
import { Check, Gift, Sparkles, ArrowRight } from "lucide-react";
import { services, freeCredit } from "@/data/pricing";

const freeFeatures = [
  "1 free minute",
  "Dubbing + Subtitles",
  "No credit card required",
  "80+ languages",
  "Voice cloning",
];

export default function PricingTeaser() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[11px] uppercase tracking-[0.2em] text-white/70 font-[family-name:var(--font-syne)]">
            <Sparkles className="w-3 h-3 text-[#7C3AED]" />
            Pricing
          </span>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-3xl sm:text-4xl md:text-5xl italic">
            Simple Per-Minute Pricing
          </h2>
          <p className="mt-3 text-white/40 text-sm sm:text-base max-w-2xl font-[family-name:var(--font-syne)]">
            Start free. Scale affordably. No hidden fees. No long-term contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free to Start card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="film-frame p-8 flex flex-col relative group"
            style={{
              boxShadow: "inset 0 1px 0 rgba(245, 158, 11, 0.08)",
            }}
          >
            <div
              className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: "0 0 40px rgba(245, 158, 11, 0.06), inset 0 0 40px rgba(245, 158, 11, 0.02)",
              }}
            />

            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-[family-name:var(--font-syne)] text-white/60 font-medium text-sm uppercase tracking-wider">
                Free to Start
              </h3>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="font-[family-name:var(--font-syne)] text-white text-4xl font-bold">
                {freeCredit.minutes}
              </span>
              <span className="text-white/30 text-sm">
                free minute{freeCredit.minutes === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-white/50 text-sm">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F59E0B]" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={process.env.NEXT_PUBLIC_APP_URL || "https://app.dubio.ai"}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 font-[family-name:var(--font-syne)] bg-[#F59E0B] hover:bg-[#D97706] text-black shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
            >
              Start Free
            </a>
          </motion.div>

          {/* Pay As You Go card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="film-frame p-8 flex flex-col relative group"
            style={{
              boxShadow: "inset 0 1px 0 rgba(124, 58, 237, 0.08)",
            }}
          >
            <div
              className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: "0 0 40px rgba(124, 58, 237, 0.06), inset 0 0 40px rgba(124, 58, 237, 0.02)",
              }}
            />

            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-[#7C3AED]" />
              <h3 className="font-[family-name:var(--font-syne)] text-white/60 font-medium text-sm uppercase tracking-wider">
                Pay As You Go
              </h3>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="font-[family-name:var(--font-syne)] text-white text-4xl font-bold">
                From $0.99
              </span>
              <span className="text-white/30 text-sm">/min</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {services.map((s) => (
                <li
                  key={s.name}
                  className={`flex items-center justify-between text-sm rounded-lg -mx-2 px-2 py-1.5 ${
                    s.popular ? "bg-[#7C3AED]/10 ring-1 ring-[#7C3AED]/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 text-white/50">
                    <s.icon className="w-4 h-4 flex-shrink-0 text-[#7C3AED]" />
                    {s.name}
                    {s.popular && (
                      <span className="text-[10px] uppercase tracking-wider text-[#F59E0B] font-[family-name:var(--font-syne)]">
                        Best value
                      </span>
                    )}
                    {s.premium && (
                      <span className="text-[10px] uppercase tracking-wider text-white/30 font-[family-name:var(--font-syne)]">
                        Premium
                      </span>
                    )}
                  </div>
                  <span className="text-white/70 font-[family-name:var(--font-syne)] font-medium">
                    {s.pricePerMinute}<span className="text-white/30">/min</span>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="/launch/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 font-[family-name:var(--font-syne)] border border-[#7C3AED]/40 text-white hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/60"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/40 text-xs font-[family-name:var(--font-syne)]"
        >
          {["No subscription", "Cancel anytime", "Pay only for what you use"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
