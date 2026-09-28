export interface UseCase {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string; // lucide icon name
  stat: string;
  statLabel: string;
  description: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  painPoints: {
    title: string;
    description: string;
    icon: string;
  }[];
  solutions: {
    title: string;
    description: string;
  }[];
  workflow: {
    step: number;
    title: string;
    description: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
}

export const useCases: UseCase[] = [
  {
    slug: "creator-dashboard",
    title: "Creator Dashboard",
    shortTitle: "Creator Dashboard",
    icon: "Video",
    stat: "10x",
    statLabel: "Audience Reach",
    description: "Manage multi-language versions of your videos from one place. Track dubbed outputs, status, and performance across every language.",
    hero: {
      eyebrow: "For Creators",
      title: "Grow Your Audience 10x",
      subtitle: "Break language barriers and reach viewers worldwide. Upload your videos and dub them into 80+ languages while keeping your authentic voice.",
    },
    painPoints: [
      { title: "Limited Reach", description: "Your content only reaches audiences who speak your language, leaving billions of potential viewers untapped.", icon: "Globe" },
      { title: "Expensive Translation", description: "Traditional dubbing studios charge thousands per video and take weeks to deliver.", icon: "DollarSign" },
      { title: "Lost Authenticity", description: "Hiring voice actors means losing your unique voice and personality that your audience loves.", icon: "UserX" },
      { title: "Time-Consuming", description: "Managing translations, voice actors, and editing across multiple languages is a full-time job.", icon: "Clock" },
    ],
    solutions: [
      { title: "Voice-Preserved Dubbing", description: "Our AI clones your voice in 80+ languages, keeping your tone, emotion, and personality intact." },
      { title: "One-Click Multi-Language", description: "Upload once, dub into multiple languages simultaneously. Your video is ready in minutes, not weeks." },
      { title: "Studio Workflow", description: "Upload videos directly to the Dubio studio and manage all your dubbed versions from one dashboard." },
      { title: "Lip Sync Technology", description: "Viewers see your lips match the dubbed audio for a natural viewing experience." },
    ],
    workflow: [
      { step: 1, title: "Upload Your Video", description: "Upload your video file directly into the Dubio studio — MP4, MOV, and more." },
      { step: 2, title: "Choose Languages", description: "Select from 80+ target languages for your content." },
      { step: 3, title: "AI Dubs Your Video", description: "Our AI clones your voice, translates, and syncs everything in minutes." },
      { step: 4, title: "Download & Publish", description: "Download your dubbed videos and publish to reach new audiences worldwide." },
    ],
    stats: [
      { value: "10x", label: "Average audience growth" },
      { value: "80+", label: "Languages available" },
      { value: "< 5 min", label: "Average processing time" },
      { value: "95%", label: "Voice similarity score" },
    ],
    testimonial: {
      quote: "Dubio helped me reach viewers in Japan, Brazil, and Germany overnight. My subscriber count has tripled in just two months.",
      name: "Alex Rivera",
      role: "Content Creator, 500K subscribers",
    },
  },
  {
    slug: "subtitled-content",
    title: "Subtitled Content",
    shortTitle: "Subtitles",
    icon: "Subtitles",
    stat: "80+",
    statLabel: "Languages",
    description: "Generate accurate, synchronized subtitles in 80+ languages automatically. Switch languages on the fly for any video.",
    hero: {
      eyebrow: "Subtitled Content",
      title: "Every Word, Perfectly Timed",
      subtitle: "Generate professional subtitles in 80+ languages automatically. Accurate, synchronized, and ready to embed in your videos.",
    },
    painPoints: [
      { title: "Manual Subtitling", description: "Creating subtitles by hand takes hours per video and is error-prone.", icon: "Clock" },
      { title: "Translation Quality", description: "Auto-generated subtitles often miss nuance, slang, and context.", icon: "AlertTriangle" },
      { title: "Multi-Language Burden", description: "Each new language means hiring another translator and managing more files.", icon: "Languages" },
      { title: "Sync Issues", description: "Subtitles that don't match the audio timing create a poor viewing experience.", icon: "RefreshCw" },
    ],
    solutions: [
      { title: "AI-Powered Accuracy", description: "State-of-the-art speech recognition ensures subtitles match what's actually spoken." },
      { title: "80+ Language Support", description: "Generate subtitles in any language instantly. Switch between languages with one click." },
      { title: "Perfect Sync", description: "Subtitles are automatically timed to match audio, word by word." },
      { title: "Export Flexibility", description: "Download in SRT, VTT, or embed directly. Compatible with every platform." },
    ],
    workflow: [
      { step: 1, title: "Upload Video", description: "Upload your video file to Dubio." },
      { step: 2, title: "Select Languages", description: "Choose which languages you need subtitles in." },
      { step: 3, title: "Auto-Generate", description: "AI transcribes, translates, and syncs subtitles in minutes." },
      { step: 4, title: "Export & Embed", description: "Download subtitle files or get a video with burned-in subtitles." },
    ],
    stats: [
      { value: "80+", label: "Languages supported" },
      { value: "98%", label: "Transcription accuracy" },
      { value: "< 2 min", label: "Processing per video" },
      { value: "SRT/VTT", label: "Export formats" },
    ],
    testimonial: {
      quote: "We used to spend 3 hours per video on subtitles. Now it takes under 2 minutes and the quality is better than what we did manually.",
      name: "Dr. Sarah Chen",
      role: "Online Course Creator, 100K students",
    },
  },
  {
    slug: "multi-language-distribution",
    title: "Multi-Language Distribution",
    shortTitle: "Distribution",
    icon: "Globe",
    stat: "3x",
    statLabel: "Platform Reach",
    description: "Export dubbed versions of your content ready for YouTube, TikTok, and Instagram. One dub, every platform, every language.",
    hero: {
      eyebrow: "Distribution",
      title: "Publish Everywhere, In Every Language",
      subtitle: "Dub once, publish everywhere. Download dubbed versions optimized for YouTube, TikTok, Instagram, and more — in 80+ languages.",
    },
    painPoints: [
      { title: "Platform Fragmentation", description: "Each platform has different requirements. Managing multi-language content across all of them is overwhelming.", icon: "Layers" },
      { title: "Audience Silos", description: "Your Spanish audience is on YouTube, your Japanese audience is on TikTok — you need to be everywhere.", icon: "Globe" },
      { title: "Release Delays", description: "Localizing content for each platform and language delays your global release by weeks.", icon: "Clock" },
      { title: "Inconsistent Presence", description: "Without multi-language content on every platform, you miss entire markets.", icon: "BarChart" },
    ],
    solutions: [
      { title: "Dub Once, Export Everywhere", description: "Dub your video into multiple languages and download versions ready for every platform." },
      { title: "Platform-Ready Output", description: "Export dubbed videos in formats suited to each platform's requirements." },
      { title: "Simultaneous Launch", description: "Get all your language versions in one batch, so you can publish everywhere the same day." },
      { title: "One Workflow", description: "Manage all your dubbed language versions from a single dashboard." },
    ],
    workflow: [
      { step: 1, title: "Upload Content", description: "Upload your video file to Dubio." },
      { step: 2, title: "Select Languages", description: "Choose the target languages you want to publish in." },
      { step: 3, title: "AI Processes Everything", description: "Dubbing and formatting happen in parallel." },
      { step: 4, title: "Download & Publish", description: "Download dubbed versions and publish to every platform." },
    ],
    stats: [
      { value: "3x", label: "Average platform reach" },
      { value: "80+", label: "Languages for dubbing" },
      { value: "Same day", label: "Global launch capability" },
      { value: "1", label: "Dashboard for everything" },
    ],
    testimonial: {
      quote: "We went from publishing on YouTube only to 3 platforms in 8 languages. Our total reach tripled in the first month.",
      name: "Marcus Thompson",
      role: "Content Strategist, MediaScale",
    },
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    shortTitle: "Training",
    icon: "Users",
    stat: "90%",
    statLabel: "Cost Savings",
    description: "Roll out training videos to global teams in their native language. Track progress by region and language.",
    hero: {
      eyebrow: "For Businesses",
      title: "Train Your Global Team, Instantly",
      subtitle: "Localize training videos, onboarding content, and compliance materials for every region — in their native language, with your brand voice.",
    },
    painPoints: [
      { title: "Global Communication Gap", description: "Training videos only reach English-speaking employees, leaving global teams behind.", icon: "Globe" },
      { title: "Budget Constraints", description: "Enterprise dubbing projects cost $10,000-$50,000+ per language and take months.", icon: "DollarSign" },
      { title: "Slow Rollouts", description: "Every new training program takes weeks to localize, delaying compliance deadlines.", icon: "Clock" },
      { title: "Inconsistent Quality", description: "Different voice actors across languages create an inconsistent brand experience.", icon: "AlertTriangle" },
    ],
    solutions: [
      { title: "Consistent Brand Voice", description: "Maintain a unified brand voice across all languages with AI voice cloning." },
      { title: "90% Cost Reduction", description: "Enterprise-grade dubbing at a fraction of traditional studio costs." },
      { title: "Rapid Localization", description: "Go from one language to 80+ in hours, not months. Meet compliance deadlines easily." },
      { title: "Progress Tracking", description: "Monitor rollout progress by region, language, and team from one dashboard." },
    ],
    workflow: [
      { step: 1, title: "Upload Training Content", description: "Upload training videos, onboarding materials, or compliance content." },
      { step: 2, title: "Configure Languages", description: "Select target languages by region and team." },
      { step: 3, title: "Review & Approve", description: "Use team workflows to review and approve dubbed content." },
      { step: 4, title: "Deploy Globally", description: "Distribute to teams worldwide via your existing LMS or platforms." },
    ],
    stats: [
      { value: "90%", label: "Cost savings vs agencies" },
      { value: "80+", label: "Languages for localization" },
      { value: "24hr", label: "Average turnaround time" },
      { value: "99.9%", label: "Platform uptime SLA" },
    ],
    testimonial: {
      quote: "We localized our entire Q1 training program for 15,000 employees across 12 countries in under a week. The old way would have taken 3 months.",
      name: "Jennifer Park",
      role: "VP of L&D, Fortune 500 Company",
    },
  },
];
