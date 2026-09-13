import type { Resume } from "../data/resume.ts";
import { dateRange, escapeHtml, list, section } from "./html.ts";

export function renderProjects(resume: Resume): string {
  const projects = resume.projects ?? [];
  if (projects.length === 0) {
    return "";
  }

  const articles = projects
    .map((project) => {
      const title = project.url
        ? `<a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a>`
        : escapeHtml(project.name);
      const meta = dateRange(project.startDate, project.endDate);
      const keywords = project.keywords?.length
        ? `<p class="meta">${escapeHtml(project.keywords.join(", "))}</p>`
        : "";
      const description = project.description
        ? `<p>${escapeHtml(project.description)}</p>`
        : "";
      const highlights = list((project.highlights ?? []).map((item) => escapeHtml(item)));

      return `<article>
  <header>
    <h3>${title}</h3>
    ${meta ? `<p class="meta">${meta}</p>` : ""}
  </header>
  ${description}
  ${highlights}
  ${keywords}
</article>`;
    })
    .join("\n");

  return section("Projects", articles);
}
