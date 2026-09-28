import dynamic from "next/dynamic";
import LaunchHero from "@/components/launch/LaunchHero";

const HowItWorks = dynamic(() => import("@/components/launch/HowItWorks"));
const FeatureReel = dynamic(() => import("@/components/launch/FeatureReel"));
const LiveTranslation = dynamic(() => import("@/components/launch/LiveTranslation"));
const DemoSection = dynamic(() => import("@/components/launch/DemoSection"));
const UseCases = dynamic(() => import("@/components/launch/UseCases"));
const PricingTeaser = dynamic(() => import("@/components/launch/PricingTeaser"));
const FinalCTA = dynamic(() => import("@/components/launch/FinalCTA"));

export const metadata = {
  title: "Dubio — AI Video Dubbing Platform",
  description:
    "Clone your voice and dub your videos into 80+ languages in seconds. Powered by AI that preserves your tone, emotion, and identity.",
};

export default function LaunchPage() {
  return (
    <>
      <LaunchHero />
      <HowItWorks />
      <FeatureReel />
      <LiveTranslation />
      <DemoSection />
      <UseCases />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
