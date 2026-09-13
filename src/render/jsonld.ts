import type { Resume } from "../data/resume.ts";
import { SITE_URL } from "../config.ts";

export function renderJsonLd(resume: Resume): string {
  const { basics } = resume;
  const sameAs = (basics.profiles ?? []).map((profile) => profile.url);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: basics.name,
    jobTitle: basics.label,
    email: basics.email,
    telephone: basics.phone,
    url: basics.url ?? SITE_URL,
    description: basics.summary,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
