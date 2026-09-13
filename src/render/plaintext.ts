import { DEFAULT_SECTIONS, type Resume, type SectionId } from "../data/resume.ts";
import { formatRange } from "./html.ts";

function lines(...values: Array<string | undefined | false>): string {
  return values.filter((value): value is string => Boolean(value)).join("\n");
}

function block(title: string, body: string): string {
  if (!body.trim()) {
    return "";
  }
  return `${title.toUpperCase()}\n${body.trim()}`;
}

function summary(resume: Resume): string {
  return block("Summary", resume.basics.summary ?? "");
}

function experience(resume: Resume): string {
  const jobs = (resume.work ?? []).map((job) => {
    const header = [job.position, job.name].filter(Boolean).join(" · ");
    const meta = [formatRange(job.startDate, job.endDate), job.location]
      .filter(Boolean)
      .join(" · ");
    const highlights = (job.highlights ?? []).map((item) => `* ${item}`).join("\n");
    return lines(header, meta, job.summary, highlights);
  });
  return block("Experience", jobs.join("\n\n"));
}

function education(resume: Resume): string {
  const items = (resume.education ?? []).map((item) => {
    const study = [item.studyType, item.area].filter(Boolean).join(", ");
    return lines(
      item.institution,
      study,
      formatRange(item.startDate, item.endDate),
    );
  });
  return block("Education", items.join("\n\n"));
}

function skills(resume: Resume): string {
  const items = (resume.skills ?? []).map((skill) => {
    const detail = [skill.level, skill.keywords?.join(", ")].filter(Boolean).join(" — ");
    return detail ? `${skill.name}: ${detail}` : skill.name;
  });
  return block("Skills", items.join("\n"));
}

function projects(resume: Resume): string {
  const items = (resume.projects ?? []).map((project) => {
    const highlights = (project.highlights ?? []).map((item) => `* ${item}`).join("\n");
    return lines(
      project.name,
      formatRange(project.startDate, project.endDate),
      project.description,
      highlights,
      project.url,
      project.keywords?.join(", "),
    );
  });
  return block("Projects", items.join("\n\n"));
}

function awards(resume: Resume): string {
  const items = (resume.awards ?? []).map((award) =>
    lines(
      award.title,
      [award.date, award.awarder].filter(Boolean).join(" · "),
      award.summary,
    ),
  );
  return block("Hackathons", items.join("\n\n"));
}

function languages(resume: Resume): string {
  const items = (resume.languages ?? []).map((item) =>
    item.fluency ? `${item.language}: ${item.fluency}` : item.language,
  );
  return block("Languages", items.join("\n"));
}

const renderers: Record<SectionId, (resume: Resume) => string> = {
  summary,
  experience,
  education,
  skills,
  projects,
  awards,
  languages,
};

export function renderPlaintext(resume: Resume): string {
  const { basics } = resume;
  const contacts = [
    basics.email,
    basics.phone,
    basics.url,
    ...(basics.profiles ?? []).map((profile) => `${profile.network}: ${profile.url}`),
  ].filter(Boolean);

  const header = lines(basics.name, basics.label, ...contacts);
  const order = resume.meta?.sections ?? DEFAULT_SECTIONS;
  const body = order
    .map((id) => renderers[id](resume))
    .filter(Boolean)
    .join("\n\n");

  return `${header}\n\n${body}\n`;
}
