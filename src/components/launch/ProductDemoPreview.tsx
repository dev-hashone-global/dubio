"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { preload } from "react-dom";
import { motion, useInView } from "framer-motion";
import { Captions, Play, Volume2, VolumeX } from "lucide-react";
import {
  DEMO_LANGUAGES,
  ORIGINAL_POSTER,
  ORIGINAL_SPEECH,
  ORIGINAL_VIDEO_SRC,
  registerExclusiveVideo,
  type DemoLanguage,
} from "@/lib/demo-media";

/** Tracks paused/muted state of a <video> element via its media events. */
function useMediaState(ref: React.RefObject<HTMLVideoElement | null>) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  useEffect(() => setVideo(ref.current), [ref]);
  return useMediaElementState(video);
}

function useMediaElementState(video: HTMLVideoElement | null) {
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!video) return;
    const sync = () => {
      setPaused(video.paused);
      setMuted(video.muted);
    };
    const events = ["play", "pause", "ended", "volumechange", "emptied"];
    events.forEach((e) => video.addEventListener(e, sync));
    sync();
    return () => events.forEach((e) => video.removeEventListener(e, sync));
  }, [video]);

  return { paused, muted };
}

function PlayOverlay({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Play video"
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      <span className="w-11 h-11 rounded-full bg-white/40 flex items-center justify-center">
        <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
      </span>
    </button>
  );
}

const overlayButtonClass =
  "absolute top-2 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] sm:text-xs font-[family-name:var(--font-syne)] text-white backdrop-blur transition hover:bg-black/80";

function OriginalVideo({
  onReady,
  className,
}: {
  onReady: () => void;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { paused, muted } = useMediaState(videoRef);
  const autoplayed = useRef(false);
  // Autoplay once half of the player itself is on screen. (Observing the
  // whole demo block fails on phones: it is wider than the viewport, so it can
  // never be 50% visible.)
  const frameRef = useRef<HTMLDivElement>(null);
  const autoplay = useInView(frameRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const unregister = registerExclusiveVideo(video);
    // Let the dubbed side start buffering once English can play through.
    if (video.readyState >= 4) onReady();
    else video.addEventListener("canplaythrough", onReady, { once: true });
    return () => {
      unregister();
      video.removeEventListener("canplaythrough", onReady);
    };
  }, [onReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay || autoplayed.current) return;
    autoplayed.current = true;
    // Browsers only allow autoplay without a user gesture when muted.
    video.muted = true;
    video.play().catch(() => {
      /* autoplay blocked (e.g. Low Power Mode) — the play overlay remains */
    });
  }, [autoplay]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play();
  };

  const unmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    if (video.paused) void video.play();
  };

  return (
    <div ref={frameRef} className={className}>
      <video
        ref={videoRef}
        src={ORIGINAL_VIDEO_SRC}
        poster={ORIGINAL_POSTER}
        preload="auto"
        muted
        playsInline
        controls={!paused}
        className="absolute inset-0 w-full h-full object-cover bg-black"
        aria-label="Original English demo video"
      />
      {paused && <PlayOverlay onClick={play} />}
      {!paused && muted && (
        <button
          type="button"
          onClick={unmute}
          className={`${overlayButtonClass} left-2`}
        >
          <VolumeX className="w-3.5 h-3.5" />
          Tap to unmute
        </button>
      )}
    </div>
  );
}

/**
 * The dubbed side keeps one <video> per language the visitor has selected or
 * hovered, stacked in the same frame. Switching shows an element that has
 * already buffered, so playback starts instantly instead of re-fetching.
 */
function DubbedVideo({
  language,
  warmCodes,
  bufferFully,
  className,
}: {
  language: DemoLanguage;
  warmCodes: ReadonlySet<string>;
  bufferFully: boolean;
  className: string;
}) {
  const videos = useRef(new Map<string, HTMLVideoElement>());
  const cleanups = useRef(new Map<string, () => void>());
  const [active, setActive] = useState<HTMLVideoElement | null>(null);
  const { paused } = useMediaElementState(active);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const activeCode = useRef(language.code);

  const pooled = DEMO_LANGUAGES.filter(
    (l) => l.code === language.code || warmCodes.has(l.code),
  );

  // Stable ref callback per language, so React doesn't detach/re-attach
  // (and re-register) every element on each render.
  const refCallbacks = useRef(
    new Map<string, (video: HTMLVideoElement | null) => void>(),
  );
  const attach = (code: string) => {
    let callback = refCallbacks.current.get(code);
    if (!callback) {
      callback = (video) => onElement(code, video);
      refCallbacks.current.set(code, callback);
    }
    return callback;
  };
  const onElement = (code: string, video: HTMLVideoElement | null) => {
    if (video) {
      if (videos.current.get(code) === video) return;
      videos.current.set(code, video);
      cleanups.current.set(code, registerExclusiveVideo(video));
      if (code === activeCode.current) setActive(video);
    } else {
      cleanups.current.get(code)?.();
      cleanups.current.delete(code);
      videos.current.delete(code);
    }
  };

  // Swap the visible element; carry "playing" over to the new language.
  useEffect(() => {
    if (activeCode.current === language.code) return;
    const previous = videos.current.get(activeCode.current);
    const next = videos.current.get(language.code);
    const wasPlaying = !pausedRef.current;
    activeCode.current = language.code;
    if (previous) {
      previous.pause();
      previous.currentTime = 0;
    }
    if (next) {
      next.currentTime = 0;
      setActive(next);
      if (wasPlaying) {
        next.muted = false;
        void next.play();
      }
    }
  }, [language.code]);

  // CC toggle applies to every pooled language.
  useEffect(() => {
    const apply = () =>
      videos.current.forEach((video) =>
        Array.from(video.textTracks).forEach((track) => {
          track.mode = subtitlesOn ? "showing" : "hidden";
        }),
      );
    apply();
    const list = Array.from(videos.current.values());
    list.forEach((v) => v.textTracks.addEventListener("addtrack", apply));
    return () =>
      list.forEach((v) => v.textTracks.removeEventListener("addtrack", apply));
  }, [subtitlesOn, pooled.length]);

  const play = () => {
    if (!active) return;
    active.muted = false;
    void active.play();
  };

  return (
    <div className={className}>
      {pooled.map((l) => {
        const isActive = l.code === language.code;
        return (
          <video
            key={l.code}
            ref={attach(l.code)}
            src={l.videoSrc}
            poster={l.poster}
            preload={bufferFully ? "auto" : "metadata"}
            playsInline
            controls={isActive && !paused}
            aria-hidden={!isActive}
            tabIndex={isActive ? undefined : -1}
            className={`absolute inset-0 w-full h-full object-cover bg-black ${
              isActive ? "" : "invisible"
            }`}
            aria-label={`Demo video dubbed in ${l.name}`}
          >
            <track
              kind="subtitles"
              src={l.captionsSrc}
              srcLang={l.code}
              label={l.name}
              default
            />
          </video>
        );
      })}
      {paused && <PlayOverlay onClick={play} />}
      <button
        type="button"
        onClick={() => setSubtitlesOn((on) => !on)}
        aria-pressed={subtitlesOn}
        aria-label={subtitlesOn ? "Hide subtitles" : "Show subtitles"}
        className={`${overlayButtonClass} right-2 ${
          subtitlesOn ? "ring-1 ring-[#F59E0B]" : "opacity-70"
        }`}
      >
        <Captions className="w-3.5 h-3.5" />
        CC
      </button>
    </div>
  );
}

function EchoRings() {
  return (
    <>
      {[0, 1.8, 3.6].map((delay, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <motion.span
            animate={{ scale: [1, 2.5], opacity: [0.55, 0.4, 0.25, 0.15, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay }}
            style={{ transformOrigin: "center center" }}
            className="block size-16 rounded-full border border-[#F59E0B]/40"
          />
        </div>
      ))}
    </>
  );
}

function CenterConnector() {
  return (
    <div className="relative size-12">
      <EchoRings />
      <span className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F59E0B]/15 pointer-events-none" />
      <div className="relative z-10 size-12 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.35)]">
        <Play className="size-5 text-black fill-black" />
      </div>
    </div>
  );
}

const pillBase =
  "inline-flex items-center gap-1.5 px-2 md:px-4 py-2 rounded-full border text-[10px] md:text-lg font-[family-name:var(--font-syne)] uppercase tracking-wider";
const pillClass = `${pillBase} bg-white/5 border-white/10 text-white/50`;
const dubbedPillClass = `${pillBase} bg-[#7C3AED]/10 border-[#7C3AED]/20 text-[#7C3AED]/70`;

export default function ProductDemoPreview() {
  // Poster is the LCP candidate for the hero — fetch it immediately.
  preload(ORIGINAL_POSTER, { as: "image", fetchPriority: "high" });

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "100px" });
  const [selectedLanguage, setSelectedLanguage] = useState<DemoLanguage>(
    DEMO_LANGUAGES[0],
  );
  const [originalReady, setOriginalReady] = useState(false);
  const handleOriginalReady = useCallback(() => setOriginalReady(true), []);

  // Languages the visitor has hovered/touched/focused: their <video> is
  // mounted (hidden) so it buffers before being picked.
  const [warmCodes, setWarmCodes] = useState<ReadonlySet<string>>(new Set());
  const warmLanguage = (code: string) =>
    setWarmCodes((prev) => (prev.has(code) ? prev : new Set(prev).add(code)));

  const handleLanguageSelect = (language: DemoLanguage) => {
    if (language.code === selectedLanguage.code) return;
    // Keep the outgoing language buffered so switching back is instant too.
    warmLanguage(selectedLanguage.code);
    setSelectedLanguage(language);
  };

  const frameBase =
    "relative w-full max-w-[260px] sm:max-w-[340px] mx-auto md:max-w-none aspect-video bg-[#0c0928] rounded-[4px] overflow-hidden ring-4 sm:ring-8 md:[aspect-ratio:432/297]";
  const frameClass = `${frameBase} ring-[#7467B9]/10 shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)]`;
  const afterFrameClass = `${frameBase} ring-[#7467B9]/90 shadow-[0_0_60px_10px_rgba(124,58,237,0.35),0_0_120px_40px_rgba(124,58,237,0.15)]`;
  const captionClass =
    "flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 w-full max-w-[260px] sm:max-w-[340px] mx-auto md:max-w-none min-w-0";

  return (
    <div ref={containerRef} className="w-6xl max-w-6xl mx-auto mt-12 sm:mt-16">
      <div className="overflow-hidden p-0">
        <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-6 sm:pb-8">
          <div className="mb-6 sm:mb-8 rounded-2xl border border-[#7C3AED]/40 bg-[#7C3AED]/15 p-3 sm:p-4 shadow-[0_0_30px_-12px_rgba(124,58,237,0.75)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm sm:text-base font-[family-name:var(--font-syne)] text-white/85">
                Choose dubbed language
              </p>
              <p className="text-[10px] sm:text-xs font-[family-name:var(--font-syne)] text-white/45">
                Full Studio: voice, lip sync and subtitles
              </p>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {DEMO_LANGUAGES.map((language) => {
                const isActive = language.code === selectedLanguage.code;
                const warm = () => warmLanguage(language.code);
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleLanguageSelect(language)}
                    onPointerEnter={warm}
                    onTouchStart={warm}
                    onFocus={warm}
                    aria-pressed={isActive}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs sm:text-sm font-[family-name:var(--font-syne)] transition ${
                      isActive
                        ? "border-[#F59E0B] bg-[#F59E0B] text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                        : "border-white/12 bg-white/5 text-white/70 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/15 hover:text-white"
                    }`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold leading-none">
                      {language.shortCode}
                    </span>
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/*
            One grid for both breakpoints so each <video> exists exactly once
            (no duplicate downloads). Mobile: stacked via `order`; desktop:
            2 columns with explicit rows (captions / videos / labels).
          */}
          <div className="relative flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-40 md:items-center">
            {/* Original caption */}
            <div className={`${captionClass} order-1 md:order-none md:row-start-1 md:col-start-1`}>
              <Volume2 className="w-5 h-5 text-white/40 shrink-0" />
              <span className="text-[#856cce] text-[11px] sm:text-base truncate sm:whitespace-normal">
                {ORIGINAL_SPEECH}
              </span>
            </div>
            {/* Dubbed caption */}
            <div className={`${captionClass} order-5 md:order-none md:row-start-1 md:col-start-2`}>
              <Volume2 className="w-5 h-5 shrink-0" />
              <span
                dir={selectedLanguage.dir}
                lang={selectedLanguage.code}
                className="text-[11px] sm:text-base truncate sm:whitespace-normal"
              >
                {selectedLanguage.speech}
              </span>
            </div>

            {/* Dashed line behind the video row (desktop) */}
            {inView && (
              <motion.div
                animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="hidden md:block md:row-start-2 md:col-start-1 md:col-span-2 h-[2px] w-full self-center pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 8px, transparent 8px, transparent 16px)",
                  backgroundSize: "200% 100%",
                }}
              />
            )}

            <div className="relative z-[1] order-2 md:order-none md:row-start-2 md:col-start-1">
              <OriginalVideo
                onReady={handleOriginalReady}
                className={frameClass}
              />
            </div>
            <div className="relative z-[1] order-6 md:order-none md:row-start-2 md:col-start-2">
              <DubbedVideo
                language={selectedLanguage}
                warmCodes={warmCodes}
                bufferFully={originalReady}
                className={afterFrameClass}
              />
            </div>

            {/* Connector: between columns on mobile, centered over the row on desktop */}
            <div className="order-4 md:order-none flex justify-center py-4 md:py-0 md:row-start-2 md:col-start-1 md:col-span-2 md:self-center md:justify-self-center z-20 pointer-events-none">
              <CenterConnector />
            </div>

            {/* Labels */}
            <div className="order-3 md:order-none md:row-start-3 md:col-start-1 flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <span className={pillClass}>Before</span>
              <span className={pillClass}>
                <span className="text-xs md:text-base leading-none">🇺🇸</span>
                Original — English
              </span>
            </div>
            <div className="order-7 md:order-none md:row-start-3 md:col-start-2 flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <span className={pillClass}>After</span>
              <span className={dubbedPillClass}>
                <span className="text-xs md:text-sm leading-none">
                  {selectedLanguage.flag}
                </span>
                Dubbed — {selectedLanguage.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
