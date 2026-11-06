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
export const ORIGINAL_SPEECH =
  "You're watching two versions of the same video but I only recorded one.";

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

// First subtitle line of each Full Studio dub (from its subtitles.json).
const SPEECH: Record<string, string> = {
  fr: "Vous voyez deux versions de la même vidéo, mais je n'en ai enregistré qu'une.",
  es: "Estás viendo dos versiones del mismo video, pero solo grabé una.",
  de: "Du siehst zwei Versionen vom gleichen Video, aber ich habe nur eine aufgenommen.",
  pt: "Você está vendo duas versões do mesmo vídeo, mas eu gravei só uma.",
  ja: "同じ動画の2つのバージョンを見てますが、実は1本しか録画してません。",
  zh: "你看到的是同一个视频的两个版本，但我只录了一个。",
  id: "Kamu melihat dua versi video yang sama, tapi saya hanya merekam satu.",
  ar: "أنت تشاهد نسختين من نفس الفيديو، لكنني سجلت نسخة واحدة فقط.",
  ko: "같은 영상을 두 버전으로 보시는데, 저는 하나만 녹음했어요.",
  hi: "आप एक ही वीडियो के दो वर्ज़न देख रहे हैं, पर मैंने सिर्फ एक रिकॉर्ड किया।",
};

export const DEMO_LANGUAGES: DemoLanguage[] = LANGUAGE_META.map((meta) => ({
  ...meta,
  dir: meta.dir ?? "ltr",
  speech: SPEECH[meta.code],
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
