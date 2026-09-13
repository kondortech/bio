# Kirill Kondratiuk — CV

One-page CV at [bio.kondortech.dev](https://bio.kondortech.dev). All copy lives in [`src/data/resume.json`](src/data/resume.json) ([JSON Resume](https://jsonresume.org/schema) field names). The page is generated at build time so recruiters and ATS see real HTML, not a blank shell.

## Edit the CV

1. Change [`src/data/resume.json`](src/data/resume.json).
2. Move blocks with `meta.aside` (left rail) and `meta.main` (experience column). Hide a block by removing it from those lists or by leaving that array empty.
3. Run the site:

```bash
npm install
npm run dev
```

`npm run build` writes `dist/index.html`, `dist/resume.json`, and `dist/resume.txt`. Print the page (or use Print / PDF) for a paper copy.

Machine-readable copies:

- [/resume.txt](https://bio.kondortech.dev/resume.txt) — plain text with standard section headings
- [/resume.json](https://bio.kondortech.dev/resume.json) — the same source file

## GitHub Pages

This repo deploys `dist/` with [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Once, in the GitHub repo:

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**  
   Do **not** choose “Deploy from a branch”. That publishes the Vite source (`index.html` + `/src/main.ts`) and the page will have no CSS.
2. Open the **Actions** tab, open the **Deploy** workflow, and confirm the latest run is green. If Pages was just switched to Actions, use **Run workflow**.
3. Custom domain: `bio.kondortech.dev`
4. Enable **Enforce HTTPS** after DNS resolves (required for `.dev`)

`public/CNAME` already contains `bio.kondortech.dev`.

## DNS

At the registrar (or Cloudflare):

| Host | Type | Value |
| --- | --- | --- |
| `bio` | `CNAME` | `kondortech.github.io` |
| `@` (`kondortech.dev`) | URL forward | `https://bio.kondortech.dev` |

Do not point apex `A` records at GitHub while the CV lives on `bio`. GitHub Pages can serve this subdomain, but not the apex and `bio` on the same site. The apex redirect is a DNS/registrar rule and can be removed later when something else sits on `kondortech.dev`.
