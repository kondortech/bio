import { SITE_URL } from "../config.ts";
import {
  DEFAULT_ASIDE,
  DEFAULT_MAIN,
  type Resume,
  type SectionId,
} from "../data/resume.ts";
import { escapeHtml } from "./html.ts";
import { renderAwards } from "./awards.ts";
import { renderEducation } from "./education.ts";
import { renderExperience } from "./experience.ts";
import { renderHeader } from "./header.ts";
import { renderJsonLd } from "./jsonld.ts";
import { renderLanguages } from "./languages.ts";
import { renderProjects } from "./projects.ts";
import { renderSkills } from "./skills.ts";
import { renderSummary } from "./summary.ts";

const renderers: Record<SectionId, (resume: Resume) => string> = {
  summary: renderSummary,
  experience: renderExperience,
  education: renderEducation,
  skills: renderSkills,
  projects: renderProjects,
  awards: renderAwards,
  languages: renderLanguages,
};

export function renderHead(resume: Resume): string {
  const title = resume.basics.label
    ? `${resume.basics.name} · ${resume.basics.label}`
    : resume.basics.name;
  const description = resume.basics.summary ?? title;

  return `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${SITE_URL}/" />
<meta property="og:type" content="profile" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${SITE_URL}/" />
${renderJsonLd(resume)}`;
}

function renderSectionList(resume: Resume, order: SectionId[]): string {
  return order.map((id) => renderers[id](resume)).filter(Boolean).join("\n");
}

export function renderBody(resume: Resume): string {
  const aside = renderSectionList(resume, resume.meta?.aside ?? DEFAULT_ASIDE);
  const primary = renderSectionList(resume, resume.meta?.main ?? DEFAULT_MAIN);

  return `<div class="page">
  <aside class="rail">
    ${renderHeader(resume)}
    <nav class="formats no-print" aria-label="Machine-readable formats">
      <a href="/resume.txt">Plain text</a>
      <span aria-hidden="true"> · </span>
      <a href="/resume.json">JSON Resume</a>
      <span aria-hidden="true"> · </span>
      <button type="button" class="print">Print / PDF</button>
    </nav>
    ${aside}
  </aside>
  <main class="primary">
    ${primary}
  </main>
</div>`;
}
