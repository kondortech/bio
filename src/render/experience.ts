import type { Resume } from "../data/resume.ts";
import { dateRange, escapeHtml, joinMeta, list, section } from "./html.ts";

export function renderExperience(resume: Resume): string {
  const jobs = resume.work ?? [];
  if (jobs.length === 0) {
    return "";
  }

  const articles = jobs
    .map((job) => {
      const title = job.url
        ? `<a href="${escapeHtml(job.url)}">${escapeHtml(job.name)}</a>`
        : escapeHtml(job.name);
      const meta = joinMeta([
        dateRange(job.startDate, job.endDate),
        job.location ? escapeHtml(job.location) : "",
      ]);
      const summary = job.summary ? `<p>${escapeHtml(job.summary)}</p>` : "";
      const highlights = list((job.highlights ?? []).map((item) => escapeHtml(item)));

      return `<article>
  <header>
    <h3>${escapeHtml(job.position)}</h3>
    <p class="org">${title}</p>
    ${meta ? `<p class="meta">${meta}</p>` : ""}
  </header>
  ${summary}
  ${highlights}
</article>`;
    })
    .join("\n");

  return section("Experience", articles);
}
