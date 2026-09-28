"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Upload, Languages, Play } from "lucide-react";
import React, { useRef } from "react";
import { UploadMockup, LanguageMockup, OutputMockup } from "./StepMockups";

const steps: {
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  mockup: React.ReactNode;
}[] = [
    {
      icon: Upload,
      title: "Upload Your Video",
      description: "Drop a video file into the studio to get started.",
      detail: "Supports MP4, MOV, and other common formats.",
      mockup: <UploadMockup />,
    },
    {
      icon: Languages,
      title: "Pick Language & Voice",
      description: "Choose from 80+ languages with perfect lip-sync.",
      detail: "Clone your own voice or pick a new one - your unique tone and emotion fully preserved.",
      mockup: <LanguageMockup />,
    },
    {
      icon: Play,
      title: "Download & Share",
      description: "Get your dubbed video with synced lips and natural speech.",
      detail: "Ready in minutes — download and share anywhere.",
      mockup: <OutputMockup />,
    },
  ];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[#7C3AED] font-[family-name:var(--font-syne)] font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            How It Works
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-3xl sm:text-4xl md:text-5xl italic">
            Three Steps. That&apos;s It.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#7C3AED] to-[#F59E0B] rounded-full"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative flex items-start gap-6 mb-32 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              <div className={`absolute z-10 flex-shrink-0 -top-5 ${i % 2 === 0 ? "right-[36%]":"right-[-15px]"}`}>
                <div className="w-16 h-16 rounded-full bg-[#F34300] border-2 border-[#F34300]/40 flex items-center justify-center">
                  <span className="text-white font-bold font-[family-name:var(--font-syne)] text-lg">
                    {i + 1}
                  </span>
                </div>
              </div>

              <div className={`film-frame overflow-hidden p-0 flex-1 md:max-w-[60%] relative ${i === 0 ? "shadow-[0px_30px_100px_-20px_rgba(124,58,237,0.15)]" : ""} ${i % 2 === 0 ? "" : "md:text-left"}`}>
                {i === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/20 via-[#7C3AED]/8 via-80% to-[#0a0724] pointer-events-none z-[1]" />
                )}
                {step.mockup}
                <div className={`relative z-[2] p-6 sm:p-8`}>
                  <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-syne)] text-white font-semibold text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <p className="text-[#7C3AED]/50 text-xs font-[family-name:var(--font-syne)] uppercase tracking-wider">
                    {step.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p className="mt-8 text-center text-white/40 text-xs sm:text-sm font-[family-name:var(--font-syne)] tracking-wide">
          AI that preserves your unique vocal identity • No quality loss • Works with any accent
        </motion.p>
      </div>
    </section>
  );
}
