import type { Resume } from "../data/resume.ts";
import { escapeHtml, joinMeta } from "./html.ts";

function contactLink(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

export function renderHeader(resume: Resume): string {
  const { basics } = resume;
  const contacts: string[] = [];

  if (basics.email) {
    contacts.push(contactLink(`mailto:${basics.email}`, basics.email));
  }
  if (basics.phone) {
    contacts.push(contactLink(`tel:${basics.phone.replaceAll(" ", "")}`, basics.phone));
  }
  if (basics.url) {
    const host = basics.url.replace(/^https?:\/\//, "");
    contacts.push(contactLink(basics.url, host));
  }
  for (const profile of basics.profiles ?? []) {
    contacts.push(contactLink(profile.url, profile.network));
  }

  const location = joinMeta(
    [
      basics.location?.city,
      basics.location?.region,
      basics.location?.countryCode,
    ].filter((part): part is string => Boolean(part)),
  );

  return `<header class="masthead">
  <h1>${escapeHtml(basics.name)}</h1>
  ${basics.label ? `<p class="label">${escapeHtml(basics.label)}</p>` : ""}
  ${location ? `<p class="location">${escapeHtml(location)}</p>` : ""}
  ${
    contacts.length
      ? `<ul class="contacts">${contacts.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : ""
  }
</header>`;
}
