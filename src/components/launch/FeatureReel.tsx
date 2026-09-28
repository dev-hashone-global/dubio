"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, ScanFace, Globe, Subtitles, Languages, Download } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Cloning",
    description:
      "AI captures your unique vocal fingerprint and reproduces it in any language — preserving tone, emotion, and personality.",
    accent: "#7C3AED",
    accentRgb: "124, 58, 237",
    tag: "CORE",
    image: "/images/toolkitimage1.png",
    imageWidth: 355,
    imageHeight: 218,
    imageWrapClass: "-mt-16 -ml-14",
    imageClass: "h-auto object-contain rounded-xl",
    wave: [.3, .5, .8, .6, .9, .4, .7, .5, .3, .6, .8, .5, .4, .7, .9, .6, .3, .5, .7, .4],
  },
  {
    icon: ScanFace,
    title: "Lip Sync",
    description:
      "Natural-looking lip movements perfectly matched to the new audio. Your face, your expressions, your energy — now in any language.",
    accent: "#6366F1",
    accentRgb: "99, 102, 241",
    tag: "AI",
    image: "/images/toolkitimage2.png",
    imageWidth: 473,
    imageHeight: 233,
    imageWrapClass: "-mt-12 -ml-4",
    imageClass: "w-full h-auto object-contain rounded-xl",
    wave: [.4, .6, .5, .8, .7, .3, .5, .9, .6, .4, .7, .5, .8, .3, .6, .4, .7, .5, .3, .6],
  },
  {
    icon: Globe,
    title: "80+ Languages",
    description:
      "Dub your content into Spanish, Japanese, Hindi, Arabic, and 80+ more with native-quality  results. Reach every audience on the planet — no limits.",
    accent: "#10B981",
    accentRgb: "16, 185, 129",
    tag: "SCALE",
    image: "/images/toolkitimage3.png",
    imageWidth: 324,
    imageHeight: 175,
    imageWrapClass: "-mt-16 -ml-8",
    imageClass: "h-auto object-contain rounded-xl",
    wave: [.5, .7, .4, .6, .8, .5, .3, .7, .6, .9, .4, .5, .7, .8, .3, .6, .5, .4, .7, .5],
  },
  {
    icon: Subtitles,
    title: "Auto Subtitles",
    description:
      "Generate pixel-perfect, timed subtitles in both the original and target languages. Burn-in or export as SRT — ready for any platform.",
    accent: "#F59E0B",
    accentRgb: "245, 158, 11",
    tag: "AUTO",
    image: "/images/toolkitimage4.png",
    imageWidth: 318,
    imageHeight: 172,
    imageWrapClass: "-mt-12 -ml-4",
    imageClass: "h-auto object-contain rounded-xl",
    wave: [.6, .4, .7, .5, .3, .8, .6, .4, .7, .5, .9, .3, .6, .4, .8, .5, .7, .3, .5, .6],
  },
  {
    icon: Languages,
    title: "Multi-Language Dubbing",
    description:
      "Upload once, publish everywhere — generate dubbed versions of the same video in multiple languages from a single workflow.",
    accent: "#EF4444",
    accentRgb: "239, 68, 68",
    tag: "SCALE",
    image: "/images/toolkitimage5.png",
    imageWidth: 310,
    imageHeight: 171,
    imageWrapClass: "-mt-12 -ml-4",
    imageClass: "h-auto object-contain rounded-xl",
    wave: [.7, .5, .3, .6, .8, .4, .7, .5, .6, .3, .8, .7, .4, .5, .6, .9, .3, .7, .5, .4],
  },
  {
    icon: Download,
    title: "Downloadable Exports",
    description:
      "Download finished dubbed videos and subtitle files — MP4 and SRT — ready to publish anywhere on your own schedule.",
    accent: "#EC4899",
    accentRgb: "236, 72, 153",
    tag: "EXPORT",
    image: "/images/toolkitimage6.png",
    imageWidth: 340,
    imageHeight: 171,
    imageWrapClass: "-mt-12 -ml-4",
    imageClass: "h-auto object-contain rounded-xl",
    wave: [.3, .8, .5, .7, .4, .6, .9, .3, .5, .7, .4, .8, .6, .3, .7, .5, .4, .6, .8, .5],
  },
];

// ── Waveform visualization per card ──
function CardWaveform({ wave, accent, alive }: { wave: number[]; accent: string; alive: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {wave.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all"
          style={{
            height: alive ? `${h * 100}%` : `${h * 30}%`,
            background: alive ? accent : "rgba(255,255,255,0.06)",
            opacity: alive ? 0.6 + h * 0.4 : 0.3,
            transitionDuration: `${300 + i * 30}ms`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      ))}
    </div>
  );
}

// ── Single feature card with spotlight + wake-up ──
function FeatureCard({
  feature,
  isActive,
  size = "desktop",
}: {
  feature: (typeof features)[number];
  isActive?: boolean;
  size?: "desktop" | "mobile";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const alive = isHovered || !!isActive;

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const Icon = feature.icon;
  const isDesktop = size === "desktop";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl border overflow-hidden cursor-default transition-all duration-500 ${isDesktop ? "w-[420px] lg:w-[460px] h-[340px] lg:h-[360px] flex-shrink-0" : "w-full"
        } ${alive
          ? "border-white/10 bg-[#110e2e]"
          : "border-white/[0.04] bg-[#0c0928]"
        }`}
      style={{
        boxShadow: alive
          ? `0 0 60px rgba(124, 58, 237, 0.08), inset 0 1px 0 rgba(124, 58, 237, 0.1)`
          : "none",
      }}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.06), transparent 60%)`,
        }}
      />

      {/* Top border glow trace */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: alive ? 1 : 0,
          background: `linear-gradient(90deg, transparent, #7C3AED, transparent)`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-between ${isDesktop ? "p-8" : "p-6"}`}>
        {feature.image ? (
          <>
            {/* Tag top-right */}
            <div className="flex items-start justify-end mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded transition-all duration-500"
                  style={{
                    color: alive ? feature.accent : "rgba(255,255,255,0.15)",
                    background: alive ? `rgba(${feature.accentRgb}, 0.08)` : "transparent",
                    border: `1px solid ${alive ? `rgba(${feature.accentRgb}, 0.15)` : "rgba(255,255,255,0.04)"}`,
                  }}
                >
                  {feature.tag}
                </span>
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: alive ? feature.accent : "rgba(255,255,255,0.1)",
                    boxShadow: alive ? `0 0 8px ${feature.accent}` : "none",
                  }}
                />
              </div>
            </div>

            {/* Image on top-left */}
            <div
              className={`w-full overflow-visible ${isDesktop ? "flex-1 min-h-0" : ""} flex items-start justify-start ${feature.imageWrapClass}`}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={feature.imageWidth}
                height={feature.imageHeight}
                sizes={`(min-width: 1024px) ${feature.imageWidth}px, ${Math.min(feature.imageWidth, 340)}px`}
                loading="lazy"
                unoptimized
                className={feature.imageClass}
                style={
                  feature.imageClass.includes("w-full")
                    ? undefined
                    : { width: feature.imageWidth, height: "auto" }
                }
              />
            </div>

            {/* Bottom: title + description */}
            <div>
              <h3
                className="font-[family-name:var(--font-syne)] font-semibold text-xl mb-2 transition-colors duration-500"
                style={{ color: alive ? "#ffffff" : "rgba(255,255,255,0.4)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed transition-colors duration-500"
                style={{ color: alive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)" }}
              >
                {feature.description}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Top row */}
            <div className="flex items-start justify-between">
              {/* Icon with halo */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500"
                  style={{
                    background: feature.accent,
                    opacity: alive ? 0.2 : 0,
                  }}
                />
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                  style={{
                    background: alive ? `rgba(${feature.accentRgb}, 0.12)` : "rgba(255,255,255,0.03)",
                    transform: alive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <Icon
                    className="w-7 h-7 transition-colors duration-500"
                    style={{ color: alive ? feature.accent : "rgba(255,255,255,0.2)" }}
                  />
                </div>
              </div>

              {/* Tag + status */}
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded transition-all duration-500"
                  style={{
                    color: alive ? feature.accent : "rgba(255,255,255,0.15)",
                    background: alive ? `rgba(${feature.accentRgb}, 0.08)` : "transparent",
                    border: `1px solid ${alive ? `rgba(${feature.accentRgb}, 0.15)` : "rgba(255,255,255,0.04)"}`,
                  }}
                >
                  {feature.tag}
                </span>
                {/* Live dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: alive ? feature.accent : "rgba(255,255,255,0.1)",
                    boxShadow: alive ? `0 0 8px ${feature.accent}` : "none",
                  }}
                />
              </div>
            </div>

            {/* Middle: waveform */}
            <div className={`${isDesktop ? "my-6" : "my-4"}`}>
              <CardWaveform wave={feature.wave} accent={feature.accent} alive={alive} />
            </div>

            {/* Bottom: title + description */}
            <div>
              <h3
                className="font-[family-name:var(--font-syne)] font-semibold text-xl mb-2 transition-colors duration-500"
                style={{ color: alive ? "#ffffff" : "rgba(255,255,255,0.4)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed transition-colors duration-500"
                style={{ color: alive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)" }}
              >
                {feature.description}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Desktop: horizontal scrollable row with dot indicators ──
function DesktopReel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Mouse drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const calcPages = () => {
      const cardWidth = 460 + 24;
      const visibleCards = Math.floor(el.clientWidth / cardWidth) || 1;
      const pages = Math.max(4, Math.ceil(features.length / visibleCards));
      setTotalPages(pages);
    };
    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const progress = el.scrollLeft / maxScroll;
      setActiveIndex(Math.min(totalPages - 1, Math.round(progress * (totalPages - 1))));
    };
    calcPages();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calcPages);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calcPages);
    };
  }, [totalPages]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const targetScroll = (index / (totalPages - 1)) * maxScroll;
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <section id="features" className="relative hidden md:block py-16 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 mb-10 w-full">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#7C3AED] font-[family-name:var(--font-syne)] font-semibold text-sm uppercase tracking-[0.2em] mb-2">
              Features
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-4xl md:text-5xl italic">
              The Toolkit
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-white/20 text-sm font-[family-name:var(--font-syne)]">
            <span className="uppercase tracking-[0.2em]">Scroll to explore</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <p className="mt-3 text-white/40 text-sm sm:text-base max-w-2xl font-[family-name:var(--font-syne)]">
          Everything you need to dub videos professionally — with your voice, perfect lip-sync, and zero extra work.
        </p>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex gap-6 px-8 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", cursor: "grab" }}
      >
        <style>{`#features div::-webkit-scrollbar { display: none; }`}</style>
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} isActive />
        ))}
      </div>

      {/* Dot progress indicators */}
      {(() => {
        const dotColors = ["#7C3AED", "#EC4899", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];
        const dotColorsRgb = ["124,58,237", "236,72,153", "16,185,129", "245,158,11", "239,68,68", "99,102,241"];
        return (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === activeIndex ? "2rem" : "0.5rem",
                  background: i === activeIndex ? dotColors[i % dotColors.length] : "rgba(255,255,255,0.06)",
                  boxShadow: i === activeIndex ? `0 0 10px rgba(${dotColorsRgb[i % dotColorsRgb.length]}, 0.4)` : "none",
                }}
              />
            ))}
          </div>
        );
      })()}
    </section>
  );
}

// ── Mobile: vertical stack ──
function MobileStack() {
  return (
    <section id="features-mobile" className="py-24 relative md:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#7C3AED] font-[family-name:var(--font-syne)] font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Features
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-3xl sm:text-4xl italic">
            The Toolkit
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: "easeOut" as const }}
            >
              <FeatureCard feature={f} size="mobile" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FeatureReel() {
  return (
    <>
      <DesktopReel />
      <MobileStack />
    </>
  );
}
