"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";

function MiniWaveform({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const barCount = Math.floor(rect.width / 12);
    const barWidth = 2;
    const gap = (rect.width - barCount * barWidth) / (barCount - 1);
    const time = Date.now() / 1000;

    for (let i = 0; i < barCount; i++) {
      const x = i * (barWidth + gap);
      const centerY = rect.height / 2;
      const wave = Math.sin(time * 1.2 + i * 0.2) * 0.3 + Math.sin(time * 0.7 + i * 0.1) * 0.2;
      const amplitude = 0.1 + (wave + 0.5) * 0.3;
      const barHeight = amplitude * rect.height * 0.4;

      ctx.fillStyle = `rgba(124, 58, 237, ${0.04 + amplitude * 0.08})`;
      ctx.beginPath();
      ctx.roundRect(x, centerY - barHeight, barWidth, barHeight * 2, 1);
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "200px" });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      await apiClient.post("/launch/waitlist", { email });
      setMessage("You're in! We'll notify you when Dubio launches.");
      setEmail("");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setMessage("This email is already registered.");
        } else if (error.response?.status === 400) {
          setMessage("Please enter a valid email address.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="final-cta" className="relative py-24 sm:py-32 overflow-hidden">
      <MiniWaveform active={inView} />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-4xl sm:text-5xl md:text-6xl italic mb-4 leading-tight">
            Ready to Go Global?
          </h2>
          <p className="text-white/40 text-base sm:text-lg mb-10 max-w-lg mx-auto">
            Join thousands of creators who are breaking language barriers and reaching new audiences — while keeping their authentic voice, tone, and emotion.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1 h-13 px-5 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 text-sm outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/20 transition-all disabled:opacity-50 font-[family-name:var(--font-syne)]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="group inline-flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold text-sm transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] disabled:opacity-50 font-[family-name:var(--font-syne)]"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {isLoading ? "Sending..." : "Get Early Access"}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm ${
                message.includes("You're in") || message.includes("already registered")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </motion.p>
          )}

          {/* Social links */}
          <div className="flex items-center justify-center gap-5 mt-14">
            {[
              { label: "Instagram", href: "https://www.instagram.com/dubio.ai", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              { label: "Twitter", href: "https://twitter.com/dubioai", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
              { label: "GitHub", href: "https://github.com/dubio-ai", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-white/20 hover:text-white/60 transition-colors duration-300 p-2"
                aria-label={s.label}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
