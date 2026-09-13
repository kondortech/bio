import type { Resume } from "../data/resume.ts";
import { escapeHtml, section } from "./html.ts";

export function renderSkills(resume: Resume): string {
  const skills = resume.skills ?? [];
  if (skills.length === 0) {
    return "";
  }

  const groups = skills
    .map((skill) => {
      const keywords = skill.keywords ?? [];
      const items = keywords
        .map((keyword) => `<li>${escapeHtml(keyword)}</li>`)
        .join("");
      const level = skill.level
        ? `<p class="meta">${escapeHtml(skill.level)}</p>`
        : "";
      const list = items ? `<ul class="keywords">${items}</ul>` : "";
      if (skills.length === 1) {
        return `${level}${list}`;
      }
      return `<div class="skill-group">
  <h3>${escapeHtml(skill.name)}</h3>
  ${level}
  ${list}
</div>`;
    })
    .join("\n");

  const title = skills.length === 1 ? skills[0].name : "Skills";
  return section(title, groups);
}
