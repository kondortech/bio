import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import type { Resume } from "./src/data/resume.ts";
import { renderBody, renderHead } from "./src/render/page.ts";
import { renderPlaintext } from "./src/render/plaintext.ts";

const root = dirname(fileURLToPath(import.meta.url));
const resumePath = resolve(root, "src/data/resume.json");

function loadResume(): Resume {
  return JSON.parse(readFileSync(resumePath, "utf8")) as Resume;
}

function writeMachineExports(outDir: string, resume: Resume): void {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(resumePath, resolve(outDir, "resume.json"));
  writeFileSync(resolve(outDir, "resume.txt"), renderPlaintext(resume), "utf8");
}

function resumePlugin(): Plugin {
  return {
    name: "resume-ssg",
    transformIndexHtml(html) {
      const resume = loadResume();
      return html
        .replace("<!-- resume-head -->", renderHead(resume))
        .replace("<!-- resume-body -->", renderBody(resume));
    },
    configureServer(server) {
      server.watcher.add(resumePath);
      server.middlewares.use((req, res, next) => {
        if (req.url === "/resume.json") {
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(readFileSync(resumePath));
          return;
        }
        if (req.url === "/resume.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(renderPlaintext(loadResume()));
          return;
        }
        next();
      });
    },
    closeBundle() {
      writeMachineExports(resolve(root, "dist"), loadResume());
    },
  };
}

export default defineConfig({
  plugins: [resumePlugin()],
});
