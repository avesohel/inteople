# Linting & Formatting

This repo ships as **static HTML/CSS/JS with no build step** — Netlify deploys it
as-is (`publish = "."`, no command). The tooling below is **development-only**: it
formats and lints the source, but never runs on deploy and adds nothing to the
shipped site. `node_modules/` is gitignored.

## Setup

```bash
npm install        # installs dev tools + registers the pre-commit hook (husky)
```

Python linting uses **ruff**, invoked via `python3 -m ruff` (install once with
`pipx install ruff` or `python3 -m pip install ruff`). No global Node install needed.

## Everyday commands

| Command           | What it does                                                       |
| ----------------- | ------------------------------------------------------------------ |
| `npm run lint`    | Check everything (format + CSS + JS + HTML + Markdown). Read-only. |
| `npm run fix`     | Auto-fix: Prettier format + ESLint `--fix` + Stylelint `--fix`.    |
| `npm run format`  | Prettier write across the repo.                                    |
| `npm run lint:py` | Ruff lint + format check on `scripts/`.                            |
| `npm run sitemap` | Regenerate `sitemap.xml` from the files on disk.                   |

Targeted: `npm run lint:css`, `lint:js`, `lint:html`, `lint:md`.

## The toolchain

| Language | Tool                                    | Config                              |
| -------- | --------------------------------------- | ----------------------------------- |
| All      | Prettier + EditorConfig                 | `.prettierrc.json`, `.editorconfig` |
| HTML     | html-validate                           | `.htmlvalidate.json`                |
| CSS      | Stylelint (`stylelint-config-standard`) | `.stylelintrc.json`                 |
| JS       | ESLint 9 (flat)                         | `eslint.config.mjs`                 |
| Markdown | markdownlint-cli2                       | `.markdownlint-cli2.jsonc`          |
| Python   | Ruff                                    | `ruff.toml`                         |

**JS note:** the site scripts are intentionally dependency-free, ES5-style vanilla
(IIFE, `var`, `"use strict"`). ESLint is tuned to catch real bugs (undeclared
globals, unused vars, loose equality) **without** forcing a module rewrite — `var`
and IIFEs are allowed on purpose. Node tooling scripts (`*.mjs`) are linted as ESM.

## What's ignored

`archive/` (frozen v1), `**/vendor/` (minified third-party like `qrcode.min.js`),
`node_modules/`, images, and generated files (`sitemap.xml`, `site.webmanifest`).

## Automation

- **Pre-commit** (`.husky/pre-commit`): `lint-staged` auto-formats & lints only the
  files you staged. To bypass in an emergency: `git commit --no-verify`.
- **CI** (`.github/workflows/lint.yml`): runs the full suite + `sitemap --check` on
  every push and PR.

## Skipping a rule (rare, justify it)

- ESLint: `// eslint-disable-next-line <rule> -- reason`
- Stylelint: `/* stylelint-disable-next-line <rule> */`
- html-validate: `<!-- [html-validate-disable-next <rule>] -->`
- Ruff: `# noqa: <code>`

## After adding or removing a page

Run `npm run sitemap` and commit the updated `sitemap.xml` (CI enforces it's current).
