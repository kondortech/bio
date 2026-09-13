import type { Resume } from "../data/resume.ts";
import { escapeHtml, section } from "./html.ts";

export function renderSummary(resume: Resume): string {
  const summary = resume.basics.summary?.trim();
  if (!summary) {
    return "";
  }
  return section("Summary", `<p>${escapeHtml(summary)}</p>`);
}
