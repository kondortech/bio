export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(value?: string): string {
  if (!value) {
    return "";
  }
  const yearOnly = /^(\d{4})$/.exec(value);
  if (yearOnly) {
    return yearOnly[1];
  }
  const yearMonth = /^(\d{4})-(\d{2})$/.exec(value);
  if (yearMonth) {
    const month = Number(yearMonth[2]);
    if (month >= 1 && month <= 12) {
      return `${MONTHS[month - 1]} ${yearMonth[1]}`;
    }
  }
  return value;
}

export function formatRange(startDate?: string, endDate?: string): string {
  const start = formatDate(startDate);
  if (!start) {
    return "";
  }
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} – ${end}`;
}

export function timeTag(value?: string, fallback = ""): string {
  if (!value) {
    return fallback ? escapeHtml(fallback) : "";
  }
  return `<time datetime="${escapeHtml(value)}">${escapeHtml(formatDate(value))}</time>`;
}

export function dateRange(startDate?: string, endDate?: string): string {
  const start = timeTag(startDate);
  if (!start) {
    return "";
  }
  const end = endDate ? timeTag(endDate) : "Present";
  return `${start} – ${end}`;
}

export function section(title: string, inner: string): string {
  if (!inner.trim()) {
    return "";
  }
  const id = slug(title);
  return `<section id="${id}" aria-labelledby="${id}-heading">
  <h2 id="${id}-heading">${escapeHtml(title)}</h2>
  ${inner}
</section>`;
}

export function list(items: string[]): string {
  if (items.length === 0) {
    return "";
  }
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

export function joinMeta(parts: string[]): string {
  return parts.filter(Boolean).join(" · ");
}
