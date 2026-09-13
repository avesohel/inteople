#!/usr/bin/env node
/**
 * Generate sitemap.xml from the actual files on disk.
 *
 * The site is hand-authored static HTML with no build step, so the sitemap used
 * to be maintained by hand — and rotted (26 pages were missing). This walks the
 * tree, maps each page to its canonical public URL, and writes sitemap.xml.
 *
 *   node scripts/generate-sitemap.mjs        # write sitemap.xml
 *   node scripts/generate-sitemap.mjs --check # exit 1 if out of date (for CI)
 *
 * URL conventions (mirror netlify.toml redirects):
 *   foo/index.html            -> https://inteople.com/foo/
 *   index.html (root)         -> https://inteople.com/
 *   vc/<slug>.html            -> https://inteople.com/vc/<slug>.html  (pretty via redirect)
 *   sites/edu/index.html      -> https://inteople.com/edu/           (published path)
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://inteople.com";
const OUT = join(ROOT, "sitemap.xml");

// Directories never crawled/indexed (mirror robots.txt + per-page noindex).
const EXCLUDE_DIRS = new Set([
  ".git",
  "node_modules",
  "archive", // legacy v1
  "preview", // robots Disallow + noindex
  "assets",
  "docs",
  "scripts",
]);

// Pages handled explicitly (special public path, or intentionally omitted).
const SPECIAL = {
  "sites/edu/index.html": "/edu/", // published at /edu/ via redirect
};
const OMIT = new Set([
  "sites/brdb/index.html", // noindex subdomain, not yet public
]);

/** Recursively collect .html files, skipping excluded dirs. */
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relative(ROOT, abs);
    if (statSync(abs).isDirectory()) {
      if (EXCLUDE_DIRS.has(name)) continue;
      walk(abs, acc);
    } else if (name.endsWith(".html")) {
      acc.push(rel);
    }
  }
  return acc;
}

/** Map a repo-relative HTML path to its canonical public URL, or null to skip. */
function toUrl(rel) {
  const posix = rel.split(/[\\/]/).join("/");
  if (OMIT.has(posix)) return null;
  if (SPECIAL[posix]) return SPECIAL[posix];

  // sites/* other than the special-cased ones are internal — skip.
  if (posix.startsWith("sites/")) return null;

  if (posix === "index.html") return "/";
  if (posix.endsWith("/index.html"))
    return "/" + posix.slice(0, -"index.html".length);
  // Leaf pages like vc/alisohel.html keep their .html (pretty URL is a redirect alias).
  return "/" + posix;
}

/** Priority + change frequency heuristic by section/depth. */
function meta(path) {
  if (path === "/") return { changefreq: "weekly", priority: "1.0" };
  const depth = path.split("/").filter(Boolean).length;
  if (path.startsWith("/vc/"))
    return { changefreq: "monthly", priority: "0.5" };
  if (depth === 1) return { changefreq: "weekly", priority: "0.9" };
  return { changefreq: "monthly", priority: "0.7" };
}

const urls = [...new Set(walk(ROOT).map(toUrl).filter(Boolean))].sort(
  (a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  }
);

const body = urls
  .map((path) => {
    const { changefreq, priority } = meta(path);
    return `  <url><loc>${ORIGIN}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

if (process.argv.includes("--check")) {
  const current = readFileSync(OUT, "utf8");
  if (current !== xml) {
    console.error("sitemap.xml is out of date. Run: npm run sitemap");
    process.exit(1);
  }
  console.log(`sitemap.xml is up to date (${urls.length} URLs).`);
} else {
  writeFileSync(OUT, xml);
  console.log(`Wrote sitemap.xml with ${urls.length} URLs.`);
}
