import { accountDeletion } from "@/data/legal";
import PageHero from "@/components/launch/shared/PageHero";
import FadeInView from "@/components/launch/shared/FadeInView";

export const metadata = {
  title: "Delete your Dubio account — Dubio",
  description: "How to delete your Dubio account, and what is deleted and kept.",
};

export default function DeleteAccountPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Delete your Dubio account" />

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-white/5 text-white/40 font-[family-name:var(--font-syne)]">
                Last updated: {new Date(accountDeletion.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>

            {/* Table of contents */}
            <nav className="film-frame p-6 mb-12">
              <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider font-[family-name:var(--font-syne)]">
                Table of Contents
              </h3>
              <ol className="space-y-2">
                {accountDeletion.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-white/40 hover:text-[#7C3AED] text-sm transition-colors"
                    >
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Content */}
            <div className="space-y-10">
              {accountDeletion.sections.map((section, i) => (
                <section key={section.id} id={section.id}>
                  <h2 className="text-xl font-semibold text-white mb-4 font-[family-name:var(--font-syne)]">
                    {i + 1}. {section.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
