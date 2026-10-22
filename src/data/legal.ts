export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export const privacyPolicy: { lastUpdated: string; sections: LegalSection[] } = {
  lastUpdated: "2026-03-01",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: "Dubio (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI video dubbing platform and website (collectively, the \"Service\"). Please read this policy carefully. By using the Service, you consent to the data practices described in this policy.",
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content: "We collect information you provide directly, including: account information (name, email, password), payment information (processed securely through Stripe), video content you upload for dubbing, and communications with our support team. We also collect automatic information including: device and browser information, IP address, usage patterns and feature interactions, cookies and similar tracking technologies, and log data (access times, pages viewed, referring URLs).",
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      content: "We use your information to: provide and maintain the Service, process your video dubbing requests, process payments and manage subscriptions, communicate with you about updates and support, improve our Service and develop new features, ensure security and prevent fraud, and comply with legal obligations. We do NOT use your uploaded content to train our AI models unless you explicitly opt in to our data improvement program.",
    },
    {
      id: "data-storage-security",
      title: "Data Storage and Security",
      content: "Your data is stored on secure AWS infrastructure with SOC 2 compliance. We implement industry-standard security measures including: AES-256 encryption for data at rest, TLS 1.3 encryption for data in transit, isolated processing environments for video content, regular security audits and penetration testing, and access controls with principle of least privilege. Video content retention: Free plan — 7 days after processing, Pro plan — 30 days, Enterprise — custom retention. You may delete your content at any time through your account settings.",
    },
    {
      id: "data-sharing",
      title: "Data Sharing and Third Parties",
      content: "We do not sell your personal information. We share data only with: service providers necessary for platform operation (cloud hosting, payment processing, email delivery), when required by law or legal process, to protect our rights, privacy, safety, or property, and in connection with a merger, acquisition, or sale of assets (with prior notice). Our third-party service providers include AWS (hosting), Stripe (payments), EmailJS (communications), and Replicate (AI processing). Each provider is bound by data processing agreements.",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content: "Depending on your location, you may have rights including: access to your personal data, correction of inaccurate data, deletion of your data, data portability, objection to processing, and withdrawal of consent. To exercise these rights, contact us at privacy@dubio.ai. We respond to all requests within 30 days.",
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      content: "We use essential cookies for platform functionality and optional analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings. We use no third-party advertising trackers.",
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      content: "Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards through Standard Contractual Clauses and adequacy decisions where applicable.",
    },
    {
      id: "children",
      title: "Children's Privacy",
      content: "The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.",
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of material changes by email or through a notice on our website. Your continued use of the Service after changes constitutes acceptance of the updated policy.",
    },
    {
      id: "contact",
      title: "Contact Us",
      content: "If you have questions about this Privacy Policy, contact us at: privacy@dubio.ai or through our contact page at /launch/contact. Dubio Inc., San Francisco, CA, United States.",
    },
  ],
};

export const termsOfService: { lastUpdated: string; sections: LegalSection[] } = {
  lastUpdated: "2026-03-01",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: "By accessing or using Dubio's AI video dubbing platform and website (the \"Service\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, do not use the Service. These Terms constitute a legally binding agreement between you and Dubio Inc. (\"Dubio,\" \"we,\" \"our,\" or \"us\").",
    },
    {
      id: "description",
      title: "Description of Service",
      content: "Dubio provides an AI-powered video dubbing platform that enables users to translate and dub video content into multiple languages using voice cloning technology. The Service includes video uploading and processing, AI-powered transcription and translation, voice cloning and speech synthesis, lip synchronization, and related tools and features.",
    },
    {
      id: "accounts",
      title: "User Accounts",
      content: "To use certain features of the Service, you must create an account. You agree to: provide accurate and complete information, maintain the security of your account credentials, notify us immediately of unauthorized access, accept responsibility for all activity under your account. You must be at least 18 years old to create an account. We reserve the right to suspend or terminate accounts that violate these Terms.",
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      content: "You agree not to use the Service to: create deepfakes or deceptive content intended to mislead, dub content you don't have rights to, generate content that is illegal, harmful, threatening, abusive, or harassing, impersonate any person or entity, violate any intellectual property rights, distribute malware or engage in unauthorized access, overwhelm our infrastructure with automated requests, or resell access without authorization. We reserve the right to remove content and suspend accounts that violate this policy.",
    },
    {
      id: "content-ownership",
      title: "Content Ownership and Licensing",
      content: "You retain all ownership rights to your original content and the dubbed versions produced by our Service. By uploading content, you grant Dubio a limited, non-exclusive license to process, store, and deliver your content solely for the purpose of providing the Service. This license terminates when you delete your content or close your account. Dubio does not claim ownership of any user content. We do not use your content for AI model training unless you explicitly opt in.",
    },
    {
      id: "payment",
      title: "Payments and Subscriptions",
      content: "Paid plans are billed monthly or annually as selected. Prices are in USD and may change with 30 days' notice. Free trials convert to paid subscriptions unless cancelled. Refunds are available within 30 days of purchase for paid plans. You may cancel your subscription at any time; access continues through the current billing period. We use Stripe for payment processing. By providing payment information, you authorize us to charge the applicable fees.",
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: "The Service, including its design, features, code, and documentation, is owned by Dubio and protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the Service without our written consent. The Dubio name, logo, and brand elements are trademarks of Dubio Inc.",
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      content: "The Service is provided \"as is\" and \"as available\" without warranties of any kind. We do not guarantee that: the Service will be uninterrupted or error-free, dubbing quality will meet specific standards, voice cloning will achieve exact replication, or translations will be perfectly accurate. AI-generated content may contain errors. You are responsible for reviewing dubbed content before distribution.",
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      content: "To the maximum extent permitted by law, Dubio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues. Our total liability for any claim arising from the Service shall not exceed the amount you paid us in the 12 months preceding the claim.",
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: "You agree to indemnify and hold Dubio harmless from any claims, damages, losses, or expenses (including legal fees) arising from: your use of the Service, content you upload or distribute, your violation of these Terms, or your violation of any third-party rights.",
    },
    {
      id: "termination",
      title: "Termination",
      content: "Either party may terminate this agreement at any time. You may terminate by closing your account. We may terminate or suspend your access for violation of these Terms or for any reason with reasonable notice. Upon termination: your right to use the Service ceases, we may delete your data after a reasonable period, and provisions that should survive termination (liability, indemnification, disputes) remain in effect.",
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      content: "These Terms are governed by the laws of the State of California, USA, without regard to conflict of law provisions. Any disputes shall be resolved through binding arbitration in San Francisco, CA, under the rules of the American Arbitration Association. You waive any right to participate in class action lawsuits. For EU users, this does not affect your statutory rights under applicable consumer protection laws.",
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: "We may modify these Terms at any time. Material changes will be communicated via email or prominent notice on the Service at least 30 days before taking effect. Continued use after changes constitutes acceptance. If you disagree with changes, you should stop using the Service and close your account.",
    },
    {
      id: "contact",
      title: "Contact Information",
      content: "For questions about these Terms, contact us at: legal@dubio.ai or through our contact page at /launch/contact. Dubio Inc., San Francisco, CA, United States.",
    },
  ],
};

export const accountDeletion: { lastUpdated: string; sections: LegalSection[] } = {
  lastUpdated: "2026-10-23",
  sections: [
    {
      id: "how-to-delete",
      title: "How to Delete Your Account",
      content: "You can delete your Dubio account in any of these ways:\n\n• In the Dubio app: go to Settings → Delete account.\n• On the web: sign in at https://app.dubio.ai and go to Settings → Delete account.\n• If you can't sign in: email support@dubio.ai from the email address on your account and ask us to delete it.",
    },
    {
      id: "what-is-deleted",
      title: "What Is Deleted",
      content: "When your account is deleted, we delete your account profile, uploaded videos, dubbed outputs, subtitles, voice data and connected accounts.",
    },
    {
      id: "what-is-kept",
      title: "What Is Kept",
      content: "Payment and top-up records are kept, as required by tax and accounting law. They are no longer linked to your name or email.",
    },
    {
      id: "dubio-balance",
      title: "Dubio Balance",
      content: "Any remaining Dubio Balance is forfeited when your account is deleted and can't be refunded after deletion.",
    },
    {
      id: "timing",
      title: "When Deletion Happens",
      content: "Deletion is immediate and can't be undone.",
    },
  ],
};
