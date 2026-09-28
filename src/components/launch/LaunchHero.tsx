import dynamic from "next/dynamic";
import ScrambleHeadline from "./ScrambleHeadline";

const ProductDemoPreview = dynamic(() => import("./ProductDemoPreview"), {
  loading: () => (
    <div
      className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 aspect-[16/10] rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse"
      aria-hidden
    />
  ),
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.dubio.ai";

export default function LaunchHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute inset-0 launch-grain pointer-events-none" />

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/5 text-[#a78bfa] text-xs font-semibold uppercase tracking-[0.25em] font-[family-name:var(--font-syne)]">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
            AI Dubbing Platform For Global Content
          </span>
        </div>

        <ScrambleHeadline />

        <p className="text-white/45 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Dub your video into 80+ languages in seconds - with perfect lip-sync
          and exact voice, tone & emotion fully preserved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={APP_URL}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F59E0B] text-black font-bold text-base overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] font-[family-name:var(--font-syne)]"
          >
            <span className="relative z-10">Start Dubbing Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 font-semibold text-base transition-all font-[family-name:var(--font-syne)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Demo
          </a>
        </div>

        <p className="text-white/45 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed mt-1">
          First minute free · No credit card required
        </p>

        <div className="mt-3 mb-8 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-6 py-4 sm:px-8">
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-syne)]">
                4,000+
              </span>
              <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                Videos Dubbed
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-syne)]">
                200+
              </span>
              <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                Creators
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-syne)]">
                80+
              </span>
              <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                Languages
              </span>
            </div>
          </div>
        </div>

        <ProductDemoPreview />
      </div>
    </section>
  );
}
