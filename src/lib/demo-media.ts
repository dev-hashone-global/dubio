/**
 * Licensed homepage demo media (original English + Full Studio dubs).
 *
 * Videos are served by CloudFront (distribution E1G92NENUM67GT, origin
 * s3://dubio-general/public/homepage-demo) under DEMO_ASSET_BASE:
 *   original-en.mp4, dubbed-<code>.mp4
 * Subtitles are tiny and served same-origin from /public/demo/subs-<code>.vtt
 * so the <video> needs no crossOrigin/CORS setup.
 * All MP4s are 720p H.264 with +faststart so playback can begin before the
 * download completes.
 */
export const DEMO_ASSET_BASE = (
  process.env.NEXT_PUBLIC_DEMO_ASSET_BASE ||
  "https://d27rupz24pd839.cloudfront.net"
).replace(/\/+$/, "");

export const ORIGINAL_VIDEO_SRC = `${DEMO_ASSET_BASE}/original-en.mp4`;
export const ORIGINAL_POSTER = "/images/demo-poster-en.webp";
export const ORIGINAL_SPEECH = "TODO: first line of the English demo";

export type DemoLanguage = {
  code: string;
  name: string;
  flag: string;
  shortCode: string;
  speech: string;
  poster: string;
  videoSrc: string;
  captionsSrc: string;
  dir: "ltr" | "rtl";
};

const LANGUAGE_META: Array<
  Pick<DemoLanguage, "code" | "name" | "flag" | "shortCode"> & {
    dir?: "rtl";
  }
> = [
  { code: "fr", name: "French", flag: "🇫🇷", shortCode: "FR" },
  { code: "es", name: "Spanish", flag: "🇪🇸", shortCode: "ES" },
  { code: "de", name: "German", flag: "🇩🇪", shortCode: "DE" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷", shortCode: "PT" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", shortCode: "JP" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", shortCode: "CN" },
  { code: "id", name: "Indonesian", flag: "🇮🇩", shortCode: "ID" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", shortCode: "AR", dir: "rtl" },
  { code: "ko", name: "Korean", flag: "🇰🇷", shortCode: "KR" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", shortCode: "HI" },
];

// TODO: replace with the first subtitle line of each real dub.
const SPEECH: Record<string, string> = {};

export const DEMO_LANGUAGES: DemoLanguage[] = LANGUAGE_META.map((meta) => ({
  ...meta,
  dir: meta.dir ?? "ltr",
  speech: SPEECH[meta.code] ?? `TODO: ${meta.name} subtitle line`,
  poster: ORIGINAL_POSTER,
  videoSrc: `${DEMO_ASSET_BASE}/dubbed-${meta.code}.mp4`,
  captionsSrc: `/demo/subs-${meta.code}.vtt`,
}));

/* ------------------------------------------------------------------ */
/* Exclusive playback: only one demo <video> on the page plays at once. */
/* ------------------------------------------------------------------ */

const registered = new Set<HTMLVideoElement>();

function handlePlay(event: Event) {
  const playing = event.currentTarget as HTMLVideoElement;
  registered.forEach((video) => {
    if (video !== playing && !video.paused) video.pause();
  });
}

/** Register a video; returns an unregister function (use in useEffect). */
export function registerExclusiveVideo(video: HTMLVideoElement) {
  registered.add(video);
  video.addEventListener("play", handlePlay);
  return () => {
    registered.delete(video);
    video.removeEventListener("play", handlePlay);
  };
}

/* ------------------------------------------------------------------ */
/* Prefetch: warm the HTTP cache for a dub before the visitor picks it. */
/* ------------------------------------------------------------------ */

const prefetched = new Set<string>();

export function prefetchVideo(src: string) {
  if (typeof document === "undefined" || prefetched.has(src)) return;
  prefetched.add(src);
  // A detached <video preload="auto"> is honoured by Chrome, Firefox and
  // Safari alike (unlike <link rel="preload" as="video">).
  const video = document.createElement("video");
  video.muted = true;
  video.preload = "auto";
  video.src = src;
  video.load();
}
