import { Mic, FileText, Layers, ScanFace, Clapperboard, type LucideIcon } from "lucide-react";

export interface PaygService {
  name: string;
  description: string;
  pricePerMinute: string;
  icon: LucideIcon;
  includes: string[];
  popular?: boolean;
  premium?: boolean;
}

export interface FreeCredit {
  minutes: number;
  description: string;
  features: string[];
}

export const freeCredit: FreeCredit = {
  minutes: 1,
  description: "Try Dubio with 1 free minute. No credit card required.",
  features: [
    "Available on Dubbing + Subtitles",
    "80+ languages available",
    "Voice cloning included",
    "HD quality output",
    "Watermarked output",
    "No credit card required",
  ],
};

export const services: PaygService[] = [
  {
    name: "Subtitle Only",
    description: "Accurate transcription with translated subtitles for any video or audio.",
    pricePerMinute: "$0.99",
    icon: FileText,
    includes: [
      "Accurate transcription",
      "Translated subtitles",
      "SRT/VTT export",
      "80+ languages",
      "Timestamps",
    ],
  },
  {
    name: "Dubbing Only",
    description: "Translate and dub your video into any language with AI voice cloning.",
    pricePerMinute: "$1.99",
    icon: Mic,
    includes: [
      "AI voice-cloned dubbing",
      "Speech recognition",
      "AI translation",
      "80+ languages",
      "HD output",
    ],
  },
  {
    name: "Dubbing + Subtitles",
    description: "Everything in Dubbing plus synced subtitle files in one step.",
    pricePerMinute: "$2.50",
    icon: Layers,
    includes: [
      "Everything in Dubbing Only",
      "Synced subtitle files",
      "SRT/VTT export",
      "80+ languages",
      "Best value",
    ],
    popular: true,
  },
  {
    name: "Dubbing + Lip Sync",
    description:
      "Dubbing with realistic lip synchronization. Premium tier — requires Dubio Balance (not free-trial eligible).",
    pricePerMinute: "$5.99",
    icon: ScanFace,
    includes: [
      "Everything in Dubbing Only",
      "Realistic lip synchronization",
      "80+ languages",
      "HD output",
      "Requires Dubio Balance",
    ],
    premium: true,
  },
  {
    name: "Full Studio",
    description:
      "Dubbing + lip sync + subtitles — the complete package. Premium tier — requires Dubio Balance (not free-trial eligible).",
    pricePerMinute: "$6.50",
    icon: Clapperboard,
    includes: [
      "Everything in Dubbing + Lip Sync",
      "Synced subtitle files",
      "SRT/VTT export",
      "The complete package",
      "Requires Dubio Balance",
    ],
    premium: true,
  },
];

export interface ServiceComparisonFeature {
  name: string;
  values: [boolean, boolean, boolean, boolean, boolean];
}

export const serviceComparisonFeatures: ServiceComparisonFeature[] = [
  { name: "Speech recognition", values: [true, true, true, true, true] },
  { name: "AI translation", values: [true, true, true, true, true] },
  { name: "Voice cloning", values: [false, true, true, true, true] },
  { name: "Lip sync", values: [false, false, false, true, true] },
  { name: "Subtitle generation", values: [true, false, true, false, true] },
  { name: "SRT/VTT export", values: [true, false, true, false, true] },
  { name: "Timestamps", values: [true, false, true, false, true] },
  { name: "80+ languages", values: [true, true, true, true, true] },
  { name: "HD output", values: [false, true, true, true, true] },
  { name: "Free trial eligible", values: [false, false, true, false, false] },
];

export const pricingFAQs = [
  {
    question: "How does pay-as-you-go pricing work?",
    answer:
      "You only pay for what you use. Each service is billed per minute of video processed, starting at $0.99/min. There are no monthly fees, no commitments, and no minimum usage requirements — affordable for individual creators and scalable for high-volume teams.",
  },
  {
    question: "Do I get a free minute to start?",
    answer:
      "Yes! Every new account gets 1 free minute to try Dubbing + Subtitles. Trial output includes a Dubio watermark, which is removed on all paid processing once you top up your Dubio Balance. No credit card required.",
  },
  {
    question: "What counts as a minute?",
    answer:
      "Billing is based on the duration of your input video, rounded up to the nearest minute. A 90-second video counts as 2 minutes. Processing the same video into multiple languages counts separately for each language.",
  },
  {
    question: "What are the premium tiers?",
    answer:
      "Dubbing + Lip Sync and Full Studio are premium tiers that include realistic lip synchronization. They require topping up your Dubio Balance and are not free-trial eligible.",
  },
  {
    question: "Are there volume discounts?",
    answer:
      "Yes, we offer volume discounts for high-usage accounts. If you process more than 100 minutes per month, contact our sales team for custom pricing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For enterprise accounts, we also support wire transfers and invoicing.",
  },
  {
    question: "Can I set a spending limit?",
    answer:
      "Yes, you can set a monthly spending cap in your account settings. Once the limit is reached, processing pauses until you increase it or the next billing cycle begins.",
  },
  {
    question: "Do you offer enterprise pricing?",
    answer:
      "Yes, we offer custom enterprise plans with volume discounts, dedicated support, SLA guarantees, SSO, and custom API integrations. Contact our sales team to learn more.",
  },
  {
    question: "Does my unused free minute expire?",
    answer:
      "No, your free minute never expires. Use it whenever you're ready. Once used, additional minutes are billed at the per-minute rate for each service.",
  },
];
