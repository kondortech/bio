import type { Resume } from "../data/resume.ts";
import { escapeHtml, section, timeTag } from "./html.ts";

export function renderAwards(resume: Resume): string {
  const awards = resume.awards ?? [];
  if (awards.length === 0) {
    return "";
  }

  const articles = awards
    .map((award) => {
      const meta = [timeTag(award.date), award.awarder ? escapeHtml(award.awarder) : ""]
        .filter(Boolean)
        .join(" · ");
      const summary = award.summary ? `<p>${escapeHtml(award.summary)}</p>` : "";
      return `<article>
  <header>
    <h3>${escapeHtml(award.title)}</h3>
    ${meta ? `<p class="meta">${meta}</p>` : ""}
  </header>
  ${summary}
</article>`;
    })
    .join("\n");

  return section("Hackathons", articles);
}
