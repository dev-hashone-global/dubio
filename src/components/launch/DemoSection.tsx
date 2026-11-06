"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RefreshCcw } from "lucide-react";
import Image from "next/image";
import {
  ORIGINAL_POSTER,
  ORIGINAL_VIDEO_SRC,
  registerExclusiveVideo,
} from "@/lib/demo-media";

export default function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [volume, setVolume] = useState(60);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:49");

  // console.log(isMuted,volume)

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      const bar = progressRef.current;
      if (!video || !bar) return;
      const rect = bar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    },
    [],
  );

  // const handleVolumeChange = useCallback(
  //   (e: React.MouseEvent<HTMLDivElement>) => {
  //     const video = videoRef.current;
  //     const bar = e.currentTarget;
  //     const rect = bar.getBoundingClientRect();
  //     const pos = Math.max(
  //       0,
  //       Math.min(1, (e.clientX - rect.left) / rect.width),
  //     );
  //     setVolume(pos * 100);
  //     if (video) {
  //       video.volume = pos;
  //       setIsMuted(pos === 0);
  //     }
  //   },
  //   [],
  // );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    return registerExclusiveVideo(video);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100 || 0);
      setCurrentTime(formatTime(video.currentTime));
    };
    const onLoaded = () => {
      setDuration(formatTime(video.duration));
    };
    const onEnded = () => setIsPlaying(false);
    // Keep the custom play/pause icon in sync when another demo video pauses
    // this one (exclusive playback).
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          initial={{ clipPath: "inset(0 50% 0 50%)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-12"
        >
          <p className="text-[#7C3AED] font-[family-name:var(--font-syne)] font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Product Demo
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-3xl sm:text-4xl md:text-5xl italic">
            See Dubio in Action
          </h2>
          <p className="mt-4 text-white/40 text-sm sm:text-base max-w-2xl mx-auto font-[family-name:var(--font-syne)]">
            Watch your video transform instantly. Perfect lip-sync, voice
            cloning, and multi-language dubbing — all in one place.
          </p>
        </motion.div>
        {/* Left overlay image */}
        <div className="absolute left-[17%] top-1/2 z-10">
          <Image
            src="/images/demoplayerlefttext.png"
            alt="Lips Synced & Voice Cloning"
            width={199}
            height={109}
            sizes="(min-width: 640px) 192px, 160px"
            loading="lazy"
            className="w-40 sm:w-48 h-auto"
            unoptimized
          />
        </div>
        <div className="absolute right-[21%] top-[37%] z-10">
          <div className="relative flex items-center justify-center">
            {[0,1.2, 2.8, 4.6].map((delay, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 4.5], opacity: [0.55, 0.40, 0.25, 0.15, 0.05] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay }}
                className="absolute w-20 h-20 rounded-full border-2 border-[#7C3AED]/40"
              />
            ))}
            <span className="absolute w-28 h-28 rounded-full bg-[#7C3AED]/15" />
            <Image
              src="/images/Link_Dubio2.png"
              alt="Dubio"
              width={100}
              height={100}
              className="relative z-10 w-18 h-18 object-contain rounded-xl"
              unoptimized
            />
          </div>
        </div>

        {/* Right overlay image */}
        <div className="absolute right-[15%] top-[60%] z-10">
          <Image
            src="/images/demoplayerrighttext.png"
            alt="Subtitles & Captions"
            width={230}
            height={284}
            sizes="(min-width: 640px) 208px, 160px"
            loading="lazy"
            className="w-40 sm:w-52 h-auto"
            unoptimized
          />
        </div>

        <div className="absolute right-[42%] bottom-[1%] z-10">
          <Image
            src="/images/demplayerbottonimage.png"
            alt="Subtitles & Captions"
            width={397}
            height={195}
            sizes="(min-width: 640px) 384px, 240px"
            loading="lazy"
            className="w-60 sm:w-96 h-auto"
            unoptimized
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="rounded-2xl overflow-hidden border-b border-white/[0.06] shadow-2xl shadow-purple-900/20">
            {/* Video container */}
            <div className="max-w-5xl mx-auto relative bg-transparent rounded-4xl pt-4">
              <video
                ref={videoRef}
                className="w-full h-auto cursor-pointer block rounded-4xl mb-8"
                preload="metadata"
                poster={ORIGINAL_POSTER}
                playsInline
                onClick={togglePlay}
                style={{ colorScheme: "dark" }}
              >
                <source src={ORIGINAL_VIDEO_SRC} type="video/mp4" />
              </video>

              {/* Control bar — floating pill */}
              <div className="absolute bottom-10 left-4 right-4 z-10">
                <div className="bg-black/50 rounded-2xl px-4 max-w-3xl mx-auto py-4 flex items-center gap-3">
                  {/* Play/Pause */}
                  <button onClick={togglePlay} className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      {isPlaying ? (
                        <Pause className="w-9 h-9 text-white" />
                      ) : (
                        <Play className="w-10 h-10  text-white ml-0.5" />
                      )}
                    </div>
                  </button>

                  {/* Rewind */}
                  <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <RefreshCcw className="w-6 h-6 text-white" />
                  </button>

                  {/* Progress bar */}
                  <div
                    ref={progressRef}
                    className="flex-1 h-[3px] bg-white/20 rounded-full cursor-pointer relative"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-white/60 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Time */}
                  <span className="flex-shrink-0 text-white/50 text-[11px] font-mono">
                    {currentTime} / {duration}
                  </span>

                  {/* C button */}
                  <button className="flex-shrink-0 w-10 h-10 rounded-full border border-[#9C92FF] bg-transparent flex items-center justify-center text-white/70 hover:bg-white/15 transition-colors">
                    <span className="text-2xl font-bold font-[family-name:var(--font-syne)]">
                      C
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
