import type { Resume } from "../data/resume.ts";
import { dateRange, escapeHtml, joinMeta, section } from "./html.ts";

export function renderEducation(resume: Resume): string {
  const items = resume.education ?? [];
  if (items.length === 0) {
    return "";
  }

  const articles = items
    .map((item) => {
      const study = joinMeta(
        [item.studyType, item.area].filter((part): part is string => Boolean(part)),
      );
      const school = item.url
        ? `<a href="${escapeHtml(item.url)}">${escapeHtml(item.institution)}</a>`
        : escapeHtml(item.institution);
      const meta = dateRange(item.startDate, item.endDate);

      return `<article>
  <header>
    <h3>${school}</h3>
    ${study ? `<p class="org">${escapeHtml(study)}</p>` : ""}
    ${meta ? `<p class="meta">${meta}</p>` : ""}
  </header>
</article>`;
    })
    .join("\n");

  return section("Education", articles);
}
