import type { Resume } from "../data/resume.ts";
import { escapeHtml, section } from "./html.ts";

export function renderLanguages(resume: Resume): string {
  const languages = resume.languages ?? [];
  if (languages.length === 0) {
    return "";
  }

  const lines = languages
    .map((item) => {
      if (!item.fluency) {
        return `<p>${escapeHtml(item.language)}</p>`;
      }
      return `<p><strong>${escapeHtml(item.language)}:</strong> ${escapeHtml(item.fluency)}</p>`;
    })
    .join("\n");

  return section("Languages", lines);
}
